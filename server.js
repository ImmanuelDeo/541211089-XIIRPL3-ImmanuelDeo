const http = require('http');

const todos = [
    {id:1, text: 'Todo one'},
    {id:2, text: 'Todo two'},
    {id:3, text: 'Todo three'},
]

const server = http.createServer((req, res) => {
    const {method, url} = req;
    let body = [];

    req.on('data', chunk => {
        body.push(chunk);
    })
    .on('end',() => {
        body = Buffer.concat(body).toString();
        console.log(body);
    });

    let status = 404;
    const response = {
        success: false,
        results: [],
        error: ''
    };

    if(method === 'GET' && url === '/todos') {
        status = 200;
        response.success = true;
        response.results = todos;
    }
    else if (method === 'GET' && url === '/todos') {
        const { id, text } = JSON.parse(body);

        if (!id || !text) {
            status = 400;
            response.error = 'Please Add Id and Text';
        }
        else {
            todos.push({id, text});
            status = 201;
            response.success = true;
            response.results = todos;
        }
    }

    res.writeHead(status, {
        'Content-Type': 'application/json',
        'X-Powered-By': 'Node.js'
    });

    res.end(JSON.stringify(response));
});

const PORT = 5000;

server.listen(PORT, () => console.log(`Server running on port ${PORT}`));