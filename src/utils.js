// this is what we're going to replace with socket.io in lab 12

const chance = require("chance")();

const EVENT_NAMES = {
  pickup: "pickup",
  delivered: "delivered",
};

module.exports = { chance, EVENT_NAMES };
