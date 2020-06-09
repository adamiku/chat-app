import notifyMe from './notification.js';

const SERVER_IP_ADDRESS = 'http://35.157.80.184:8080/';

const socket = io(SERVER_IP_ADDRESS);

const messageFormContainer = document.getElementById('message-form-container');
const messageContainer = document.getElementById('message-list-container');
const messageUser = document.getElementById('message-user');
const messageText = document.getElementById('message-text');

let userName = '';

socket.on('message', ({ user, message }) => {
    if (user === userName) return;
    const messageData = `${user}: ${message}`;
    appendMessage(messageData);
    notifyMe(messageData);
})

messageFormContainer.addEventListener('submit', e => {
    e.preventDefault();

    const message = messageText.value;
    userName = messageUser.value;

    if (message === '') return;

    appendMessage(`${message}`, true);

    socket.emit('message', { message, user: userName});
    messageText.value = '';
})

function appendMessage(message, ownMessage = false) {
    const messageElement = document.createElement('div');
    messageElement.innerText = message;
    
    if (ownMessage) messageElement.classList.add("ownMessage");
    
    messageContainer.append(messageElement);
    messageElement.scrollIntoView();
}