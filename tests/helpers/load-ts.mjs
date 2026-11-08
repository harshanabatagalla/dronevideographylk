// Loads a TypeScript file from src/ for a test: transpiles it, resolves the "@/" alias and
// relative imports to other src files, and lets a test replace any module with a mock.
import fs from 'node:fs';
import path from 'node:path';
import { createRequire } from 'node:module';
import ts from 'typescript';

export function loadTs(relative, { mocks = {}, process: proc = process, cache = new Map() } = {}) {
  const filename = path.resolve(relative);
  if (cache.has(filename)) return cache.get(filename).exports;
  const source = ts.transpileModule(fs.readFileSync(filename, 'utf8'), {
    compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022, esModuleInterop: true },
  }).outputText;
  const mod = { exports: {} };
  cache.set(filename, mod);
  const localRequire = createRequire(filename);
  const req = (name) => {
    if (Object.hasOwn(mocks, name)) return mocks[name];
    let target = null;
    if (name.startsWith('@/')) target = path.resolve('src', name.slice(2));
    else if (name.startsWith('./') || name.startsWith('../')) target = path.resolve(path.dirname(filename), name);
    if (target) {
      for (const ext of ['.ts', '.tsx']) {
        if (fs.existsSync(target + ext)) return loadTs(target + ext, { mocks, process: proc, cache });
      }
    }
    return localRequire(name);
  };
  new Function('require', 'module', 'exports', 'process', source)(req, mod, mod.exports, proc);
  return mod.exports;
}

/** A process object with a different working directory and environment. */
export function fakeProcess({ cwd = process.cwd(), env = {} } = {}) {
  return Object.create(process, { cwd: { value: () => cwd }, env: { value: { ...env } } });
}
