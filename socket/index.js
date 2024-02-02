const { Server } = require("socket.io");

const io = new Server({
  cors: "http://localhost:5173",
});

let onlineUsers = [];

io.on("connection", (socket) => {
  console.log("new connection", socket.id);
  socket.join("room1");

  //listen to a connection
  socket.on("addUser", (data) => {
    !onlineUsers.some((user) => user.data === data) &&
      onlineUsers.push({
        email: data,
        socketId: socket.id,
      });
    console.log("onlineUsers: ", onlineUsers);

    io.emit("getOnlineUsers", onlineUsers);
  });

  //changing content
  socket.on("changeContent", (data) => {
    // const user = onlineUsers.find((user)=>user.email === data.email)
    io.to("room1").emit("getContent", data);
  });

  //listen to a disconnection
  socket.on("disconnect", () => {
    onlineUsers = onlineUsers.filter((user) => user.socketId !== socket.id);
    io.emit("getOnlineUsers", onlineUsers);
    console.log("A user is disconnected", socket.id);
  });
});

io.listen(3000);
