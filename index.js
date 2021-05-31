// node server which will handle our socket io connections
const port = process.env.PORT || 8000;
const io = require('socket.io')( (port), {
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

















// server.listen(PORT,()=>{
//     console.log(`Listening on ${PORT}`);
// })



// 'use strict';

// const express = require('express');
// const path = require('path');
// const fs = require('fs');
// const app = express();

// const port = process.env.PORT || 3000;
// const INDEX = '/index.html';
// const server = app.listen(port, () => {
//     console.log("Listening on port: " + port);
// });
// const io = require('socket.io')(8000);

// app.set('view engine','html'); 
// app.use((req, res) => res.sendFile(INDEX, { root: './' }))


// app.use(express.static(path.join(__dirname, 'public')));

// app.use('/static',express.static('static'));  
//For serving static files
// app.use(express.urlencoded());
 //it helps us to get the submited data through express

//PUG SPEIFIC STUFF
//set the template engine as pug
// server.set('views',path.join(__dirname,'views'));
   //Set the views directory
//   .use((req, res) => res.sendFile(INDEX, { root: __dirname }))
//   .listen(PORT, () => console.log(`Listening on ${PORT}`));

// server.get('/',(req,res)=>{
//     res.status(200).render('index.pug');
//     })


// const io = socketIO(server);