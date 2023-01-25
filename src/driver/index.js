const { EVENT_NAMES, chance } = require("../utils");

const { io } = require("socket.io-client");
const events = io("ws://localhost:3333"); //protocol and domain/hostname and port

function deliver(orderId) {
  console.log("Driver finished delivery of orderId: ", orderId);
  events.emit(EVENT_NAMES.delivered, orderId);
}

function handlePickup(event) {
  console.log("Driver received a pickup event!", event.orderId);  //in lab 12 this was event (without the .orderId)
  setTimeout(
    () => deliver(event.orderId),
    chance.integer({ min: 500, max: 1000 })
  );
}

function startDriver() {
  console.log("Driver ready!");

  events.on(EVENT_NAMES.pickup, handlePickup);
}

module.exports = {
  toTest: {
    deliver,
    handlePickup,
  },
};

startDriver();
