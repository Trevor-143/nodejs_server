const http = require('http');
const fs = require('fs')
const _ = require('lodash')

const server = http.createServer((req, res) => {
    // console.log(req.url, req.method);

    // lodash
    // const num = _.random(1, 100);
    // console.log(num)

    const greet = _.once(() => {
        console.log('Hey')
    })
    greet()

    
    //set header content type
    res.setHeader('content-type', 'text/html');

    let path = './views/';
    switch (req.url) {
        case '/':
            path += 'index.html';
            res.statusCode = 200;
            break;
        case '/about':
            path += 'about.html'
            res.statusCode = 200;
            break
        case '/about-us':
            res.setHeader('Location', '/about')
            res.statusCode = 301;
            res.end()
            break
        default:
            path += '404.html'
            res.statusCode = 404;
            break;
    }
    fs.readFile(path, (err, data) => {
        if(err) {
            console.log(err)
            res.end()
        } else {
            res.end(data)
        }
    })
});

server.listen(3000, 'localhost', () => {
    console.log('litsening at port 3000');
})