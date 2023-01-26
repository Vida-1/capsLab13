const { Server } = require("socket.io");
const { EVENT_NAMES } = require("./utils");

const io = new Server(3333);

function startEventServer() {
  io.on("connection", (socket) => {
    console.log("have new connection", socket.id);
    // socket.join("general"); removed b/c we decided not to use rooms

    // BUSY WORK! Whenever the hub gets a pickup or delivered event, send it to everyone!
    socket.on(EVENT_NAMES.delivered, (delivered) => {
      console.log("HUB delivered by driver", socket.id, delivered.orderId);  // in working lab12 this said delivered.orderID but pretty sure that was a typo
      io.emit(EVENT_NAMES.delivered, delivered);
    });

    socket.on(EVENT_NAMES.pickup, (pickup) => {
      console.log("HUB pickup from client", socket.id, pickup.orderId);
      io.emit(EVENT_NAMES.pickup, pickup); // if using rooms this would be: io.to("general").emit(EVENT_NAMES.pickup, pickup);
    });
  });

  console.log("Everything is started!");
}

startEventServer();
