/**
 * THe first test device
 * Within either update function if a device is discovered then we have to add
 * it to the system inventory.
 */

function init() {
  // This can be used for any setup needed for this plugin to discover devices
  console.log("mystery-binary-switch up");
}

function update() {
  // This will be a function called routinely to allow this plugin to preform an
  // additional search on the network
}

async function updateAsync() {
  // Here again we get another function to search for devices, this time async
  // if we prefer or need.
}

module.exports = {
  init,
  update,
  updateAsync
};
