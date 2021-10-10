const http = require('http');
const app = require('./index.js');
require('dotenv').config();
const server = http.createServer(app);
const io = require('socket.io')(http);


io.on('connection', socket => {
  console.log('Am connected')
  //Get the chatID of the user and join in a room of the same chatID
  chatID = socket.handshake.query.chatID
  socket.join(chatID)

  //Leave the room if the user closes the socket
  socket.on('disconnect', () => {
      console.log('Am disconnect')
      socket.leave(chatID)
  })

  //Send message to only a particular user
  socket.on('send_message', message => {
      receiverChatID = message.receiverChatID
      senderChatID = message.senderChatID
      content = message.content

      //Send message to only that particular room
      socket.in(receiverChatID).emit('receive_message', {
          'content': content,
          'senderChatID': senderChatID,
          'receiverChatID':receiverChatID,
      })
  })
  socket.on('chat_direct',(data)=>{
    console.log(data)
  })
});
const normalizePort = val => {
  const port = parseInt(val, 10);

  if (isNaN(port)) {
    return val;
  }
  if (port >= 0) {
    return port;
  }
  return false;
};
const port = normalizePort(process.env.PORT || '50002');
app.set('port', port);

const errorHandler = error => {
  if (error.syscall !== 'listen') {
    throw error;
  }
  const address = server.address();
  const bind = typeof address === 'string' ? 'pipe ' + address : 'port: ' + port;
  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges.');
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(bind + ' is already in use.');
      process.exit(1);
      break;
    default:
      throw error;
  }
};



server.on('error', errorHandler);
server.on('listening', () => {
  const address = server.address();
  const bind = typeof address === 'string' ? 'pipe ' + address : 'port ' + port;
  console.log('server is running on ' + bind);
});

server.listen(port);