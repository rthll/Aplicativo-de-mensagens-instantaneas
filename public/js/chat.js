const socket = io();

document.getElementById('send-message').addEventListener('click', () => {
  const message = document.getElementById('message-input').value;
  socket.emit('message', message);
});

socket.on('message', (data) => {
  const messageContainer = document.getElementById('message-container');
  const messageElement = document.createElement('div');
  messageElement.innerText = data;
  messageContainer.appendChild(messageElement);
});
