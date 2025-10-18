const fs = require('fs');
const path = require('path');

const distDir = path.join(__dirname, 'dist');
const publicDir = path.join(__dirname, 'public');
const assetsDir = path.join(__dirname, 'assets');
const cssDir = path.join(__dirname, 'css');
const jsDir = path.join(__dirname, 'js');

function ensureDir(dir) {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
}

function copyDir(src, dest) {
  if (!fs.existsSync(src)) return;
  ensureDir(dest);
  const entries = fs.readdirSync(src, { withFileTypes: true });
  for (const entry of entries) {
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);
    if (entry.isDirectory()) {
      copyDir(srcPath, destPath);
    } else if (entry.isSymbolicLink()) {
      const target = fs.readlinkSync(srcPath);
      let linkTarget = target;
      if (!path.isAbsolute(target)) {
        const resolvedTarget = path.resolve(path.dirname(destPath), target);
        linkTarget = path.relative(path.dirname(destPath), resolvedTarget) || '.';
      }
      fs.symlinkSync(linkTarget, destPath);
    } else {
      fs.copyFileSync(srcPath, destPath);
    }
  }
}

if (fs.existsSync(distDir)) {
  fs.rmSync(distDir, { recursive: true, force: true });
}
ensureDir(distDir);

fs.copyFileSync(path.join(__dirname, 'index.html'), path.join(distDir, 'index.html'));
copyDir(publicDir, path.join(distDir, 'public'));
copyDir(assetsDir, path.join(distDir, 'assets'));
copyDir(cssDir, path.join(distDir, 'css'));
copyDir(jsDir, path.join(distDir, 'js'));

console.log('Build complete!');
