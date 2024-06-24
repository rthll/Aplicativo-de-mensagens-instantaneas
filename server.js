require('dotenv').config();
const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const path = require('path');
const authRoutes = require('./routes/auth');
const chatRoutes = require('./routes/chat');
const indexRoutes = require('./routes/index');
const { sequelize } = require('./models');
const app = express();
const server = http.createServer(app);
const io = socketIo(server);

app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/auth', authRoutes);
app.use('/chat', chatRoutes);
app.use('/', indexRoutes);

sequelize.sync().then(() => {
  console.log('Database synced');
});

// Configuração do Socket.io
io.on('connection', (socket) => {
  console.log('Novo cliente conectado');
  socket.on('message', (data) => {
    io.emit('message', data);
  });
  socket.on('disconnect', () => {
    console.log('Cliente desconectado');
  });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
