const port = process.env.PORT ||8000;
const socket = io(`http://localhost:${port}`);


//Get DOM elements in respective JS variables.

const form = document.getElementById('message_send');
const messageInput = document.getElementById('inputmsg');
const chatContainer = document.getElementById('chat_container');


var audio = new Audio('alert.mp3');


//Ask new user for his/her name
const nameofuser = prompt("Enter your name to join the chat");

const append = (defaultmessage, position)=>{
    const messageElement = document.createElement('div');
    messageElement.innerText = defaultmessage;
    messageElement.classList.add('message');
    messageElement.classList.add(position);
    chatContainer.append(messageElement)
    if(position == 'leftmsg')
    {
        audio.play();
    }
}

//If a new user joins let the server know
socket.emit('new-user-joined',nameofuser);


//If new user joins , receive his/her name from server.
socket.on('user-joined', name=>{
    append(`${name} joined the chat`,'leftmsg');
})


//If server sends a message receive it
socket.on('receive',obj=>{
    append(`${obj.name}: ${obj.message}`,'leftmsg');        
})

//If a user leaves the chat
socket.on('left',leftname=>{
    append(`${leftname} left the chat`,'leftmsg');
})

//If form is submitted, send it to the server 
form.addEventListener('submit', e=>{
    e.preventDefault();
    const message = messageInput.value;
    append(`You: ${message}`,'rightmsg');
    socket.emit('send',message);
    messageInput.value = '';
})