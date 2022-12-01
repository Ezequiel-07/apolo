if(process.env.NODE_ENV != 'production'){
    require('dotenv').config();
}

// Imports
const express = require('express');
const morgan = require('morgan');
const MOD = require('method-override');
const cors = require('cors');
const app = express();

app.set('port', process.env.PORT || 1357);
require('./server/database');

// File Handler;
const cloudinary = require('cloudinary');
cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET
});

// Midlewares;
app.use(MOD('_method'));
app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use(cors());
app.use(morgan('tiny'));

// Routes;
const auth_routes = require('./routes/auth');
const chats_routes = require('./routes/chats');
app.use('/api', auth_routes);
app.use('/api', chats_routes);

// Server Listen;
const server = app.listen(app.get('port'));
console.log(`server on port ${app.get('port')}`);

// Socket io
const {Server} = require('socket.io');
const io = new Server(server);
const socket_routes = require('./routes/socket');

io.on('connection', (socket)=>{
    socket.on('in-connection', async (data)=>{
        const connection_with_socket = await socket_routes.in_connection(data, socket.id);
        if(connection_with_socket == false){
            io.to(socket.id).emit('in-connection', 'error');
            socket.disconnect(true);
        }
        console.log(/socket:/ + connection_with_socket.first_name + connection_with_socket.last_name)
        io.to(socket.id).emit('in-connection', connection_with_socket);
    });

    socket.on('users-in-connection', async ()=>{
        io.emit('ping', 'ping');
    });

    socket.on('pong', async ()=>{
        let user = await socket_routes.users(socket.id);
        io.except(socket.id).emit('users-in-connection', user);
    });

    socket.on('emit-message', (data)=>{
        io.to(data.id).emit('emit-message', data);
    });
});
