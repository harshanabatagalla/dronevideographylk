import { test } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import { loadTs } from './helpers/load-ts.mjs';

const c = loadTs('src/lib/compare.ts');
const { drones, SPECS, AREAS, POPULAR } = c;

// Same writing rules as the blog: plain English, no dashes or hyphens of any kind, no stock AI words.
const DASHES = /[-‐-―−]/;
const BANNED = [
  'seamless', 'effortless', 'simply', 'instantly', 'hassle', 'elevate', 'unleash', 'dive into', 'delve',
  'stunning', 'epic', 'cinematic', 'craft', 'relive', 'dream', 'perfect', 'immersive', 'crisp', 'vivid',
  'sweeping', 'showcase', 'comprehensive', 'robust', 'leverage', 'utilize', 'facilitate', 'furthermore',
  'moreover', 'additionally', 'in conclusion', "in today's", 'it is worth noting', 'whether you',
];

test('every drone has a unique slug and the fields the pages need', () => {
  assert.ok(drones.length >= 20);
  assert.equal(new Set(drones.map((d) => d.slug)).size, drones.length);
  for (const d of drones) {
    assert.match(d.slug, /^dji(?:-[a-z0-9]+)+$/, d.slug);
    assert.ok(!d.slug.includes('-vs-'), `${d.slug} would break pair links`);
    assert.ok(d.name.startsWith('DJI '), d.name);
    assert.ok(d.headline.length > 20 && d.headline.endsWith('.'), `${d.slug}: headline`);
    assert.ok(d.released >= 2018 && d.released <= 2026, `${d.slug}: released ${d.released}`);
    if (d.image) assert.ok(fs.existsSync(`public${d.image}`), `${d.slug}: missing ${d.image}`);
  }
});

test('spec numbers are in a believable range', () => {
  for (const d of drones) {
    assert.ok(d.weightG >= 200 && d.weightG <= 1200, `${d.slug}: weight ${d.weightG}`);
    assert.ok(d.flightMin >= 15 && d.flightMin <= 60, `${d.slug}: flight ${d.flightMin}`);
    if (d.flightMinPlus) assert.ok(d.flightMinPlus > d.flightMin, `${d.slug}: Plus battery should fly longer`);
    assert.ok(d.windMs >= 8 && d.windMs <= 15, `${d.slug}: wind ${d.windMs}`);
    assert.ok(d.speedMs >= 10 && d.speedMs <= 30, `${d.slug}: speed ${d.speedMs}`);
    assert.ok(d.rangeKm >= d.rangeCeKm, `${d.slug}: range`);
    assert.ok(d.fps4k === 0 || d.fps4k >= 24, `${d.slug}: 4K frame rate`);
    assert.ok(d.slowFps >= 60, `${d.slug}: slow motion`);
    assert.ok(d.aperture >= 1.4 && d.aperture <= 4, `${d.slug}: aperture`);
    assert.ok(d.size.every((n) => n > 40 && n < 400), `${d.slug}: size`);
    assert.equal(d.zoomMm === null, d.zoomLabel === undefined, `${d.slug}: zoom label must match zoom`);
    if (d.weightG >= 250) assert.ok(!d.plusOver250, `${d.slug}: plusOver250 only applies under 250 g`);
  }
});

test('scores are whole numbers from 0 to 100 and the ranking is ordered', () => {
  const ranked = c.ranking();
  assert.equal(ranked.length, drones.length);
  for (const d of drones) {
    const s = c.score(d);
    assert.ok(Number.isInteger(s) && s >= 0 && s <= 100, `${d.slug}: score ${s}`);
    for (const a of AREAS) {
      const v = c.areaScores(d)[a.id];
      assert.ok(Number.isInteger(v) && v >= 0 && v <= 100, `${d.slug}: ${a.id} ${v}`);
    }
  }
  for (let i = 1; i < ranked.length; i++) assert.ok(c.score(ranked[i - 1]) >= c.score(ranked[i]));
  // Sanity: the flagship beats the oldest entry level drone.
  assert.ok(c.score(c.getCompareDrone('dji-mavic-4-pro')) > c.score(c.getCompareDrone('dji-mini-se')));
});

test('every scored spec belongs to an area and has the words a comparison needs', () => {
  const areas = new Set(AREAS.map((a) => a.id));
  for (const s of SPECS) {
    assert.ok(s.help.length > 30, `${s.id}: help text`);
    if (s.better) {
      assert.ok(areas.has(s.group), `${s.id}: scored spec outside an area`);
      assert.ok(s.weight > 0 && s.reason && s.want, `${s.id}: needs weight, reason and want`);
      if (!s.yesNo) assert.ok(s.margin, `${s.id}: numeric spec needs a margin`);
    }
  }
  for (const a of AREAS) assert.ok(SPECS.some((s) => s.group === a.id && s.better), `${a.id} has no scored spec`);
});

test('pair links parse both ways and popular pairs are valid and unique', () => {
  for (const [a, b] of POPULAR) {
    assert.ok(c.getCompareDrone(a) && c.getCompareDrone(b), `${a} vs ${b}: unknown drone`);
    assert.notEqual(a, b);
    const [x, y] = c.parsePair(`${a}-vs-${b}`);
    assert.equal(x.slug, a);
    assert.equal(y.slug, b);
    assert.equal(c.comparePath(b, a), `/compare/${a}-vs-${b}`, 'reversed popular pair should link to the listed order');
  }
  const keys = POPULAR.map(([a, b]) => [a, b].sort().join('|'));
  assert.equal(new Set(keys).size, keys.length, 'a popular pair is listed twice');
  assert.equal(c.parsePair('dji-air-3s-vs-dji-air-3s'), null);
  assert.equal(c.parsePair('dji-air-3s-vs-dji-nothing'), null);
  assert.equal(c.parsePair('dji-air-3s'), null);
});

test('rows mark the right winner', () => {
  const [a, b] = c.parsePair('dji-mini-5-pro-vs-dji-air-3s');
  const rows = c.rows(a, b);
  const get = (id) => rows.find((r) => r.spec.id === id);
  assert.equal(get('flight').winner, 'b');
  assert.equal(get('weight').winner, 'a');
  assert.equal(get('under250').winner, 'a');
  assert.equal(get('sensor').winner, null, 'both have a 1 inch sensor');
  assert.equal(get('released').winner, null, 'facts that are not scored have no winner');
  assert.equal(get('flight').margin, '9 min more');
});

test('no visible text contains a dash, a hyphen or a stock AI word', () => {
  const texts = c.compareTexts();
  assert.ok(texts.length > 1000);
  for (const t of new Set(texts)) assert.ok(!DASHES.test(t), `dash in "${t}"`);
  const all = texts.join(' ').toLowerCase();
  for (const word of BANNED) assert.ok(!all.includes(word), `uses "${word}"`);
});
