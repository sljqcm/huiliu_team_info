const http = require('http');
const fs = require('fs');
const path = require('path');

const port = 8080;

const server = http.createServer((req, res) => {
  if (req.url === '/huiliu-team-app.zip') {
    const filePath = '/workspace/huiliu-team-app.zip';
    const stat = fs.statSync(filePath);
    res.writeHead(200, {
      'Content-Type': 'application/zip',
      'Content-Disposition': 'attachment; filename="huiliu-team-app.zip"',
      'Content-Length': stat.size,
    });
    fs.createReadStream(filePath).pipe(res);
  } else if (req.url === '/standalone.html' || req.url === '/') {
    const filePath = '/workspace/standalone.html';
    const stat = fs.statSync(filePath);
    res.writeHead(200, {
      'Content-Type': 'text/html; charset=utf-8',
      'Content-Length': stat.size,
    });
    fs.createReadStream(filePath).pipe(res);
  } else {
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.end('Not found');
  }
});

server.listen(port, '0.0.0.0', () => {
  console.log(`Download server running at http://0.0.0.0:${port}/`);
  console.log('- Main page: http://localhost:8080/');
  console.log('- Standalone HTML: http://localhost:8080/standalone.html');
  console.log('- Zip download: http://localhost:8080/huiliu-team-app.zip');
});
