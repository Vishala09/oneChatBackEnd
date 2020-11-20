const server = require("http").createServer();
const io = require("socket.io")(server, {
  transports: ["websocket", "polling"]
});
  const users={};
  const usersarr=[];
  const names=[];
  const messages=[];
io.on('connection',(socket) => {
    //console.log("New Connection",socket.id);
    socket.on('chat',function(data){ 
        //console.log(data);
        //To show all the messages
        messages.push(data);io.sockets.emit('chatData',messages);
        //To show messages only if they are logged in
        //io.sockets.emit('chatData',data);
    });
    

    socket.on('items',function(data){
      messages.push(data);
      io.sockets.emit('getItems',messages)
    });

   // io.sockets.emit('usersnames',names);
    
    io.sockets.emit('getUsers',usersarr);

    socket.on('name',function(data){
        const user = {
            name: data.name,
            id: socket.id
          };
          users[socket.id] = user;
          usersarr.push(user);
          
        io.sockets.emit('myId',user);
        io.sockets.emit('users',Object.values(users));
        io.sockets.emit('getUsers',usersarr);
        console.log('newUser',data,users);
    });
   
})


server.listen(4000);