/**
 * @class Exterminate
 * @classdesc Allows functions to register functions to be called during shutdown
 * of the program. Allows and encourages safe shutdown practices.
 */
class Exterminate {
  constructor() {
    // Registry tracks all items we want to shutdown
    this.registry = new Map();
  }

  /**
   * @function add
   * @desc Allows adding a new item to exterminate once the server has to be shut
   * down. Similar to event listeners, requires an ID, and function value.
   * Some IDs are 'reserved' or otherwise special use. Such as "server"
   * @param {string} id - The identifier of your new item
   * @param {function} value - The function to call for extermination
   */
  add(id, value) {
    this.registry.set(id, value);
  }

  /**
   * @function remove
   * @desc Allows removing any previously added item by it's id.
   * @param {string} id - The identifier to remove
   */
  remove(id) {
    this.registry.delete(id);
  }

  /**
   * @function trigger
   * @desc Triggers the calling of ever registered shutdown function.
   * @param {string} callee - The ID for what's caused the shutdown
   */
  async trigger(callee) {
    console.log(`${callee} signal receivied`);

    this.registry.forEach(async (value, key, map) => {
      if (typeof value === "function") {
        if (key === "server") {
          // This should be the reserved key for the actual ExpressJS server
          value.close(() => {
            console.log("HTTP Server Closed");
          });
        } else {
          // Any generic function
          await value();
        }
      }
    });

    console.log("Shutting down.");
  }

}

module.exports = Exterminate;
