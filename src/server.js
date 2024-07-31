const express = require('express');
const http = require('http');
const { Server } = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000", // 클라이언트의 주소
    methods: ["GET", "POST"],
  }
});

io.on('connection', (socket) => {
  console.log('a user connected', socket.id);
  
  socket.on('chat message', (msg) => {
    console.log('Message received:', msg);
    io.emit('chat message', msg);
  });

  socket.on('disconnect', () => {
    console.log('user disconnected', socket.id);
  });
});
