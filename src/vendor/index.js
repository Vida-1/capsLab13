const { chance, EVENT_NAMES } = require("../utils");
const { io } = require("socket.io-client");

const events = io("ws://localhost:3333");

function sendPickup() {  // 1. vendor sends pickup for a store
  const event = {
    vendor: events.id,
    store: chance.city(),
    orderId: chance.guid().substring(0, 8),
    customer: chance.name(),
    address: chance.address(),
  };
  console.log("Vendor asking for pickup! OrderId: ", events.id, event.orderId);
  events.emit(EVENT_NAMES.pickup, event);
}

function acknowledgeDelivery(orderId) {
  console.log("Vendor thank you for the delivery!", events.id, orderId);
}

function startVendor() {
  events.on(EVENT_NAMES.delivered, acknowledgeDelivery);
  console.log("Vendor ready!");

  // Copy this pattern
  function ready() {
    sendPickup();

    setTimeout(ready, chance.integer({ min: 3000, max: 4000 })); //once vendor is ready, every half a second it will send a new pickup event
  }
  ready();
  // The pattern
}

module.exports = {
   toTest: {
    acknowledgeDelivery,
    sendPickup,
  }
};

startVendor();
