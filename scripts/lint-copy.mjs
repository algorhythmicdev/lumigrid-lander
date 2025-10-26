import fs from 'node:fs';
import path from 'node:path';

const files = ['src/routes/+page.svelte', 'src/lib/components/**/*.svelte'];
const badWords = [
  /\bmyth(ic|ica)\b/i,
  /\bwhisper(s|ing|ed)?\b/i,
  /\bhug(ging|s)?\b/i,
  /\bstory(book|time|layers)?\b/i,
  /\bpoem\b/i,
  /\bmuse\b/i,
  /\bmagical\b/i
];

let fail = false;
for (const pattern of files) {
  for (const file of globToFiles(pattern)) {
    const content = fs.readFileSync(file, 'utf8');
    for (const rx of badWords) {
      if (rx.test(content)) {
        console.error(`Style violation in ${file}: ${rx}`);
        fail = true;
      }
    }
  }
}

process.exit(fail ? 1 : 0);

function globToFiles(pattern) {
  if (!pattern.includes('*')) {
    return fs.existsSync(pattern) ? [pattern] : [];
  }
  const [basePart, suffixPart = ''] = pattern.split('/**/');
  const base = basePart || '.';
  const suffixRegex = wildcardToRegExp(suffixPart || '*');
  const results = [];
  walk(base);
  return results;

  function walk(current) {
    if (!fs.existsSync(current)) return;
    for (const entry of fs.readdirSync(current, { withFileTypes: true })) {
      const next = path.join(current, entry.name);
      if (entry.isDirectory()) {
        walk(next);
      } else if (suffixRegex.test(entry.name)) {
        results.push(next);
      }
    }
  }
}

function wildcardToRegExp(pattern) {
  const escaped = pattern
    .replace(/[.+^${}()|[\\]\\]/g, '\\$&')
    .replace(/\*/g, '.*');
  return new RegExp(`^${escaped}$`);
}
