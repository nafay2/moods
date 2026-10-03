// After `vite build`, pack the whole site into ONE self-contained index.html
// (styles, fonts and code inlined). Written to dist/ and to the repo root, so the
// site works whether GitHub Pages is set to "GitHub Actions" or "Deploy from a branch".
import fs from 'node:fs'
import path from 'node:path'

const dist = 'dist'
let html = fs.readFileSync(path.join(dist, 'app.html'), 'utf8')
const assets = fs.readdirSync(path.join(dist, 'assets'))
const js = fs.readFileSync(path.join(dist, 'assets', assets.find((f) => f.endsWith('.js'))), 'utf8')
const css = fs.readFileSync(path.join(dist, 'assets', assets.find((f) => f.endsWith('.css'))), 'utf8')
if (/<\/script/i.test(js)) throw new Error('script contains </script')

html = html.replace(/<script type="module" crossorigin src="[^"]+"><\/script>\s*/, '')
html = html.replace(/<link rel="stylesheet" crossorigin href="[^"]+">/, () => `<style>${css}</style>`)
if (fs.existsSync('scripts/icon.png')) {
  const icon = fs.readFileSync('scripts/icon.png').toString('base64')
  html = html.replace('<meta name="description"', `<link rel="apple-touch-icon" href="data:image/png;base64,${icon}" />\n    <meta name="description"`)
}
html = html.replace('</body>', () => `<script type="module">${js}</script>\n  </body>`)
if (html.includes('src="./assets') || html.includes('href="./assets')) throw new Error('assets were not inlined')

fs.writeFileSync(path.join(dist, 'index.html'), html)
fs.writeFileSync('index.html', html)
console.log(`single-file site written (${Math.round(html.length / 1024)} KB): dist/index.html and ./index.html`)
