const http = require('http');
const fs = require('fs');
const path = require('path');
const pagesPath = path.join(__dirname, '/pages');

function readPageData(url) {
    try {
        const data = fs.readFileSync(path.join(pagesPath, url + '.html'), 'utf8');
        return data;
    } catch(error) {
        return error;
    }
}

const server = http.createServer((req, res) => {
    let { url } = req;

    if(url === '/') {
        url = 'index';
    }

    if(url === '/favicon.ico') {
        res.writeHead(204);
        res.end();
        return;
    }

    const data = readPageData(url);

    if(data instanceof Error) {
        res.writeHead(404);
        res.end(readPageData('404'));
        return;
    }

    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.end(data);
}).listen(8080);