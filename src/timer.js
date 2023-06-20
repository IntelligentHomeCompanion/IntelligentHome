const { v4: uuidv4 } = require("uuid");
const { EventEmitter } = require("node:events");
/**
 * Global Timer utility
 * Allows regular interval timers to help refresh device data, as well
 * as lets plugins create timers themselves to assist in triggering time
 * based events
 */
class Timer {
  constructor() {
    this.timer = new EventEmitter();
    this.timers = new Map();
  }

  init() {
    // Setup the global refresh timer
    const refreshTimeout = setInterval(() => {
      this.timer.emit("refresh");
    }, companion.config.get("core.refreshTime"));

    this.timers.set("global", refreshTimeout);

    // Setup teardown of timers
    companion.exterminate.add("timer", () => {
      this.haltTimers();
    });
  }

  get global() {
    return this.timer;
  }

  haltTimers() {
    console.log("Clearing Utility Timers...");

    this.timers.forEach((value, key, map) => {
      clearInterval(value);
    });
  }

  /**
   * Allows plugins to add their own timers
   */
  add(id, interval) {
    const pluginTimeout = setTimeout(() => {
      this.timer.emit(`refresh-${id}`);
    }, interval);

    this.timers.set(`${id}:${uuidv4()}`, pluginTimeout);
  }

}

module.exports = Timer;
