/**
 * This class is responsible for keeping track and state of all devices added to the system
 */
class Inventory {
  constructor() {

    this.devices = new Map();

  }

  addDevice(device) {
    let id = device.id ?? device.name;

    this.devices.set(id, device);
  }

  /**
   * This function will run all update, or updateAsync functions for all devices
   */
  update() {

    this.devices.forEach(async (value, key, map) => {
      if (typeof value.update === "function") {
        value.update();
      } else if (typeof value.updateAsync === "function") {
        await value.updateAsync();
      }
    });

  }
}

module.exports = Inventory;