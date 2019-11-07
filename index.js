const app = require('http').createServer(handler);
const io = require('socket.io')(app);
const fs = require('fs');

app.listen(8000, '0.0.0.0');

function handler(req, res) {
    fs.readFile('templates/index.html', (err, data) => {
        if(err) {
            res.writeHead(500);
            return res.end("Error loading site!");
        }

        res.writeHead(200);
        res.end(data);
    });
}

var name = "Baaal";

io.on('connection', socket => {
    socket.on('message change', data => {
        name = data.name;
        socket.broadcast.emit('message change req', { name: name });
    })
})
