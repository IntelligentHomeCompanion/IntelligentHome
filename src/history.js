const { v4: uuidv4 } = require("uuid");
/**
 * The purpose of this class is to keep the running History of every command
 * used on the system.
 */
class History {
  constructor() {
    this.history = new Map();
  }

  addCommand(cmd) {
    let id = uuidv4();
    this.history.set(id, {
      content: cmd,
      resolution: null,
      object: null,
      added: Date.now()
    });

    return id;
  }

  editCommand(id, key, val) {
    let obj = this.history.get(id);
    obj[key] = val;
    this.history.set(id, obj);
  }
}

module.exports = History;
