import { test } from 'node:test';
import assert from 'node:assert/strict';
import { loadTs } from './helpers/load-ts.mjs';

const { PHOTO_CREDITS, getPhotoCredit } = loadTs('src/lib/photo-credits.ts');
const { drones: fleet } = loadTs('src/lib/content.ts');
const { products } = loadTs('src/lib/shop.ts');
const { drones: compared } = loadTs('src/lib/compare.ts');

// Creative Commons attribution licences need the author and licence next to each photo, so a
// drone photo without a credit must not ship. Drones with no free photo use the drawn outline.
const pictured = [
  ...fleet.filter((d) => d.image).map((d) => ({ where: 'fleet', slug: d.slug })),
  ...products.filter((p) => p.image).map((p) => ({ where: 'shop', slug: p.slug })),
  ...compared.filter((d) => d.image).map((d) => ({ where: 'compare', slug: d.slug })),
];

test('every drone photo on the fleet, shop and compare pages has a credit', () => {
  assert.ok(pictured.length > 0);
  for (const { where, slug } of pictured) {
    assert.ok(getPhotoCredit(slug), `${where}/${slug} shows a photo with no entry in PHOTO_CREDITS`);
  }
});

test('every credit names an author, a licence and links to the original photo', () => {
  for (const [slug, c] of Object.entries(PHOTO_CREDITS)) {
    assert.ok(c.author.trim(), `${slug}: author`);
    assert.match(c.license, /^(CC BY(?:-SA)? \d\.\d(?: [A-Z]{2})?|CC0 \(public domain\))$/, `${slug}: licence ${c.license}`);
    assert.match(c.licenseUrl, /^https:\/\/creativecommons\.org\/(licenses|publicdomain)\//, `${slug}: licence link`);
    assert.match(c.source, /^https:\/\/commons\.wikimedia\.org\/wiki\/File:/, `${slug}: source`);
  }
});
