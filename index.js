const express =require('express');
const app=express();
const bodyParser=require('body-parser');
const cors=require('cors');
const dbConnect = require('./db_connect.js');
const Profile=require('./routes/profile_route.js');
const Authentication=require('./routes/authentication_route.js');
const Favoris=require('./routes/favoris_route.js');
const Plan = require('./routes/plan_route.js');
const Product = require('./routes/product_route.js');
const Category= require('./routes/category_route.js');
const Alert= require('./routes/alert_route.js')

const Catalog=require ('./routes/catalog_route.js');
const Payment =require('./routes/payment_route.js');
const Message =require('./routes/message_route.js');
const forgotPassword = require('./routes/forgot_password_route.js');
const Discussion=require('./controllers/discussion_controller');
const http = require('http').createServer(app)
const io = require('socket.io')(http);

const productsHome = require('./routes/product_home_route')
const serviceHome = require('./routes/service_home_route')


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

/*****cors error protection and data parsing*****/
/*app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
});*/
//app.use(cors());
app.use(bodyParser.json({limit:"50mb",extended: true, parameterLimit:50000}));

/*******endpoints******/


app.use('/', Plan)
app.use('/', Category)
app.use('/', Alert)
app.use('/',Product)
app.use('/',Authentication)
app.use('/',Favoris)

app.get('/',(req,res,next)=>{
	res.json('Hello world !')
})
app.use('/',Profile);
app.use('/',Catalog);
app.use ('/',Payment);
app.use ('/',forgotPassword);
app.use ('/',Message);


app.use('/',productsHome)
app.use('/', serviceHome)
module.exports=app