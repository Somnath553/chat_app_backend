const expressf = require('express');
const port=process.env.PORT ||8000;
var app = expressf();    
// app.listen(port, function(err){
//     if (err) console.log("Error in server setup")
//     console.log("Server listening on Port", port);
// });
// e.g.
app.use(expressf.static("public"))
const users={};
const io = require('socket.io')(port, {
    cors: {
      origin: '*',
    }
  });
  const express = require('express');
app.get('/', function (req, res) {
    res.write(`<h1>coonected</h1>`)
})

io.on('connection',socket =>{
    console.log("connected");
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
