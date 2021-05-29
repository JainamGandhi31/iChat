const port =process.env.PORT || 8000;
const socket = io(`http://localhost:${port}`);

const form = document.getElementById('message_send');
const messageInput = document.getElementById('inputmsg');
const chatContainer = document.getElementById('chat_container');
var audio = new Audio('alert.mp3')

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


socket.emit('new-user-joined',nameofuser);

socket.on('user-joined', name=>{
    append(`${name} joined the chat`,'leftmsg');
})

form.addEventListener('submit', e=>{
    e.preventDefault();
    const message = messageInput.value;
    append(`You: ${message}`,'rightmsg');
    socket.emit('send',message);
    messageInput.value = '';
})
socket.on('receive',obj=>{
append(`${obj.name}: ${obj.message}`,'leftmsg');        
})

socket.on('left',leftname=>{
    append(`${leftname} left the chat`,'leftmsg');
})