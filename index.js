const expressf = require('express');
const port=process.env.PORT ||8000;
var app = expressf();    
app.listen(port, "192.168.137.1");
// e.g.
// app.listen(8000, "192.168.137.1");
const users={};
const io = require('socket.io')(port, {
    cors: {
      origin: '*',
    }
  });
  const express = require('express');


io.on('connection',socket =>{
    socket.on('new-user-joined',name=>{
        console.log('New user',name);
        users[socket.id]=name;
        socket.broadcast.emit('user-joined',name);
    });
    
    socket.on('send',message=>{
        socket.broadcast.emit('receive',{message: message,name: users[socket.id]})
    });
    socket.on('disconnect',message=>{
        socket.broadcast.emit('left',users[socket.id]);
        delete users[socket.id];
    });
})
