//node server which will handle our socket io connections
const io = require('socket.io')( process.env.PORT ||3000, {
    cors: {
      origin: '*',
    }
  });

const users = {};

io.on('connection', socket =>{
//If new user joins let other users of server know
    socket.on('new-user-joined', name=>{
        users[socket.id] = name;
        socket.broadcast.emit('user-joined',name);

    });

    //If someone sends the message, broadcas it to other people 
    socket.on('send', message=>{
        socket.broadcast.emit('receive',{ message: message, name: users[socket.id] });
    });


    //If someone leaves the chat let others know
    socket.on('disconnect', ()=>{
        socket.broadcast.emit('left',users[socket.id]);
        delete(users[socket.id]);
    });
});