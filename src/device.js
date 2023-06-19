const { v4: uuidv4 } = require("uuid");

/**
 * This is the base device class.
 * Intended only as the groundwork of all devices, allowing additional
 * capabilities to be added as needed.
 */
class Device {
  constructor(opts) {
    this.discoveryPlugin = opts.plugin ?? "Not Assigned";
    this.name = opts.name ?? "Device";
    this.id = opts.id ?? uuidv4();

    // Our Update Functions
    this.update = opts.update ?? null;
    this.updateAsync = opts.updateAsync ?? null;

    // Save our `opts` for later use
    this.opts = opts;
  }

  /**
   * This function allows the addition of a new capability via a string, adding
   * a host of related properties, or functions to the device.
   * Accepting new additions of the functions needed to be added via new params,
   * or will even reuse those originally passed to the class.
   */
  addCapability(capability, params = {}) {
    switch(capability) {
      case "binary_switch": {
        // Parameters declaration
        this.isOn = params.isOn ?? this.opts.isOn ?? false;

        // Function declaration
        this.turnOn = params.turnOn ?? this.opts.turnOn ?? null;
        this.turnOnAsync = params.turnOnAsync ?? this.opts.turnOnAsync ?? null;
        this.turnOff = params.turnOff ?? this.opts.turnOff ?? null;
        this.turnOffAsync = params.turnOffAsync ?? this.opts.turnOffAsync ?? null;
        break;
      }
      default: {
        console.log(`Unsupported capability: ${capability}`);
        break;
      }
    }

  }

}

/**
 * Below this will be all the additional classes that could be used
 */

class BinarySwitch extends Device {
  constructor(opts) {
    super(opts);

    this.addCapability("binary_switch");
  }

  //statusObj() {
  //  return {
  //    on: this.isOn
  //  };
  //}

  //statusText() {
  //  return `${this.name} is ${!this.isOn ? "not" : ""} powered on.`;
  //}

}

module.exports = {
  Device,
  BinarySwitch,
};
