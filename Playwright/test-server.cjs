
const http = require('node:http')
const fs = require('node:fs')
const path = require('node:path')

const root = path.resolve(__dirname, '../dist/spa')
const prefix = '/quasar-playwright-cicd'

const mime = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript',
  '.css': 'text/css',
  '.png': 'image/png',
  '.ico': 'image/x-icon',
  '.svg': 'image/svg+xml',
  '.woff2': 'font/woff2',
}

http.createServer((req, res) => {
  let urlPath = new URL(req.url, 'http://localhost').pathname

  if (urlPath === prefix || urlPath.startsWith(prefix + '/')) {
    urlPath = urlPath.slice(prefix.length) || '/'
  }

  const relativePath = urlPath.replace(/^\/+/, '')
  const file = path.resolve(root, relativePath || 'index.html')

  if (!file.startsWith(root + path.sep) && file !== path.join(root, 'index.html')) {
    res.writeHead(403).end('Forbidden')
    return
  }

  const target = fs.existsSync(file) && fs.statSync(file).isFile()
    ? file
    : path.join(root, 'index.html')

  fs.readFile(target, (err, data) => {
    if (err) {
      res.writeHead(404).end('Not found')
      return
    }

    res.writeHead(200, {
      'Content-Type': mime[path.extname(target)] || 'application/octet-stream',
    })
    res.end(data)
  })
}).listen(4173, '127.0.0.1')
