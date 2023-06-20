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
    this.capabilities = [];

    // Our Update Functions
    this.update = opts.update ?? null;
    this.updateAsync = opts.updateAsync ?? null;

    // Save our `opts` for later use
    this.opts = opts;
  }

  /**
   * Mainly used to register any update functions to the global timing utility
   */
   init() {
     companion.timer.global.on("refresh", async () => {
       if (typeof this.update === "function") {
         this.update();
       }
       if (typeof this.updateAsync === "function") {
         await this.updateAsync();
       }
     });
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
        this.capabilities.push("binary_switch");

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

module.exports = Device;
