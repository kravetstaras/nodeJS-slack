const express = require('express');
const app = express();
const socketIO = require('socket.io');
const Room = require('./classes/Room');
const namespaces = require('./data/namespaces');

app.use(express.static(__dirname + '/public'));

const expressServer = app.listen(9000);
const io = socketIO(expressServer);

app.set('io', io);

app.get('/change-ns', (req, res) => {
  namespaces[0].addRoom(new Room(0, 'Deleted Articles', 0));
  io.of(namespaces[0].endpoint).emit('nsChange', namespaces[0]);
  res.json(namespaces[0]);
});

io.on('connection', socket => {
  socket.emit('Welcome', 'Welcome to the server');
  socket.on('clientConnect', data => {
    console.log(socket.id, 'has connected');
    socket.emit('nsList', namespaces);
  });
});

namespaces.forEach(namespace => {
  io.of(namespace.endpoint).on('connection', socket => {
    console.log(`${socket.id} has connected to ${namespace.endpoint}`);
  });
});