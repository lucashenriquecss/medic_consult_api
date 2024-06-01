const socket = io('http://localhost:3000');

function joinChat() {
  const username = document.getElementById('username').value;
  socket.emit('join', username);
}

function sendMessage() {
  const message = document.getElementById('message').value;
  socket.emit('message', message);
}

socket.on('message', (message) => {
  const chat = document.getElementById('chat');
  const messageElement = document.createElement('div');
  messageElement.textContent = message;
  chat.appendChild(messageElement);
});
