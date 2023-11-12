/**
 * THe first test device
 * Within either update function if a device is discovered then we have to add
 * it to the system inventory.
 */

function init() {
  // This can be used for any setup needed for this plugin to discover devices
  console.log("mystery-binary-switch up");

  let ourdevice = new companion.inventory.Device({
    plugin: "mystery-binary-switch",
    name: "mystery-switch",
    id: "dont-ever-set-the-id",
    // It's sorta required for device update functions to be passed this way.
    // If written as a standard arrow function the 'this' context is lost,
    // and the device won't be able to modify it's own properties.
    update: deviceUpdate,
    turnOn: deviceTurnOn,
  });

  ourdevice.addCapability("binary_switch");

  companion.inventory.addDevice(ourdevice);
}

function update() {
  // This will be a function called routinely to allow this plugin to preform an
  // additional search on the network
  console.log("update!");
}

async function updateAsync() {
  // Here again we get another function to search for devices, this time async
  // if we prefer or need.
  console.log("update async!");
}

// Device Utility Functions
// These are written out as totally seperate functions to increase readability
// and ensure they don't lose context to be able to access the device 'this' context
function deviceUpdate() {

}

function deviceTurnOn() {
  console.log("Turning the device on!");
  return `${this.name} is now turned on!`;
}

module.exports = {
  init,
  update,
  //updateAsync
};
