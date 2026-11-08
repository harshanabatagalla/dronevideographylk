import { test } from 'node:test';
import assert from 'node:assert/strict';
import { loadTs } from './helpers/load-ts.mjs';

const blog = loadTs('src/lib/blog.ts');
const { posts, postTexts, plain, wordCount, getPhoto, getPost } = blog;

// Writing rules for this site: plain English, no dashes or hyphens of any kind, no stock AI words.
const DASHES = /[-‐-―−]/;
const BANNED = [
  'seamless', 'effortless', 'simply', 'instantly', 'hassle', 'elevate', 'unleash', 'dive into', 'delve',
  'stunning', 'epic', 'cinematic', 'craft', 'relive', 'dream', 'perfect', 'immersive', 'crisp', 'vivid',
  'sweeping', 'showcase', 'comprehensive', 'robust', 'leverage', 'utilize', 'facilitate', 'furthermore',
  'moreover', 'additionally', 'in conclusion', "in today's", 'it is worth noting', 'whether you',
];

test('there are posts, with unique slugs', () => {
  assert.ok(posts.length >= 6);
  assert.equal(new Set(posts.map((p) => p.slug)).size, posts.length);
});

test('no visible text contains a dash or a hyphen', () => {
  for (const post of posts) {
    const texts = [...postTexts(post), post.seoTitle, post.description];
    for (const t of texts) assert.ok(!DASHES.test(t), `${post.slug}: dash in "${t.slice(0, 80)}"`);
  }
});

test('no stock AI words or phrases', () => {
  for (const post of posts) {
    const all = [...postTexts(post), post.seoTitle, post.description].join(' ').toLowerCase();
    for (const word of BANNED) assert.ok(!all.includes(word), `${post.slug}: uses "${word}"`);
  }
});

test('titles and descriptions fit what Google shows', () => {
  for (const post of posts) {
    assert.ok(post.seoTitle.length <= 50, `${post.slug}: seoTitle is ${post.seoTitle.length} characters`);
    assert.ok(post.description.length >= 100 && post.description.length <= 158, `${post.slug}: description is ${post.description.length} characters`);
    assert.ok(post.excerpt.length > 40);
  }
});

test('every post has the pieces a reader and a search engine need', () => {
  for (const post of posts) {
    assert.ok(wordCount(post) >= 700, `${post.slug}: only ${wordCount(post)} words`);
    assert.ok(post.faqs.length >= 3, `${post.slug}: needs at least 3 questions`);
    assert.ok(post.keywords.length >= 3);
    assert.ok(post.related.length >= 2);
    assert.match(post.published, /^\d{4}-\d{2}-\d{2}$/);
    assert.ok(post.updated >= post.published);
    assert.ok(post.blocks.filter((b) => b.type === 'h2').length >= 3, `${post.slug}: needs at least 3 sections`);
  }
});

test('section ids are unique and the reserved questions id is not reused', () => {
  for (const post of posts) {
    const ids = post.blocks.filter((b) => b.type === 'h2').map((b) => b.id);
    assert.equal(new Set(ids).size, ids.length, `${post.slug}: repeated section id`);
    assert.ok(!ids.includes('questions'), `${post.slug}: "questions" is reserved for the FAQ`);
    for (const id of ids) assert.match(id, /^[a-z]+(?:-[a-z]+)*$/);
  }
});

test('every photo is one of our own portfolio photos', () => {
  for (const post of posts) {
    assert.ok(getPhoto(post.cover), `${post.slug}: unknown cover ${post.cover}`);
    for (const b of post.blocks) if (b.type === 'photo') {
      assert.ok(getPhoto(b.id), `${post.slug}: unknown photo ${b.id}`);
      assert.ok(b.caption.length > 5);
    }
  }
});

test('internal links point at real pages and related posts exist', () => {
  const fixed = new Set([
    '/', '/services', '/fleet', '/portfolio', '/locations', '/contact', '/shop', '/blog',
    '/sri-lanka-drone-rules', '/sri-lanka-drone-rules/how-to-get-a-drone-permit',
    '/services/travel-drone-videography', '/services/wedding-drone-videography',
    '/services/hotel-resort-drone-videography', '/services/property-drone-photography',
    '/services/drone-photography', '/services/commercial-drone-filming',
  ]);
  for (const post of posts) {
    for (const s of post.related) assert.ok(getPost(s), `${post.slug}: related post ${s} does not exist`);
    assert.ok(!post.related.includes(post.slug), `${post.slug}: lists itself as related`);
    const raw = [post.intro, post.blocks.flatMap((b) => (b.type === 'p' ? [b.text] : b.type === 'ul' || b.type === 'ol' ? b.items : b.type === 'note' ? [b.text] : [])), post.faqs.map((f) => f.a)].flat();
    for (const text of raw) {
      for (const m of text.matchAll(/\]\(([^)]+)\)/g)) {
        const href = m[1];
        if (href.startsWith('https://')) continue;
        if (href.startsWith('/blog/')) assert.ok(getPost(href.slice(6)), `${post.slug}: broken blog link ${href}`);
        else assert.ok(fixed.has(href), `${post.slug}: unknown link ${href}`);
      }
      assert.ok(!/\]\((?!\/|https:\/\/)/.test(text), `${post.slug}: link that is neither internal nor https`);
    }
  }
});

test('markup helper removes links and bold', () => {
  assert.equal(plain('Read [our guide](/blog/x) for **all** the rules'), 'Read our guide for all the rules');
});
