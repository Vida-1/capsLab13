const { events, EVENT_NAMES } = require("../eventPool");
const {
  toTest: { deliver, handlePickup },
} = require("./handler");

jest.useFakeTimers();

test("Driver deliver", () => {
  // Arrange
  const emitMock = jest.spyOn(events, "emit");

  // Act (call the method)
  deliver("1234");

  // Assert (expect)
  expect(emitMock).toHaveBeenCalledWith(EVENT_NAMES.delivered, "1234");
});

test("Driver handlePickup", () => {
  // Arrange
  const emitMock = jest.spyOn(events, "emit");

  // Act
  handlePickup({
    store: "handlePickup test",
    orderId: "1234",
    customer: "Jean-Luc Picard",
    address: "1 Chateau Picard",
  });

  // Timers - skip setTimeout
  jest.runAllTimers();

  // Assert
  expect(emitMock).toHaveBeenCalledWith(EVENT_NAMES.delivered, "1234");
});
