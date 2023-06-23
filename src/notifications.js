const { v4: uuidv4 } = require("uuid");

class Notifications {
  constructor() {
    this.notifications = new Map();
  }

  addNotification(content, meta = {}) {
    // content is required, meta is all the possibly values that have been passed along.
    if (typeof content !== "string") {
      throw new Error("Content must be a type of string!");
    }

    meta.id ??= uuidv4();
    meta.content ??= content;

    this.notifications.set(meta.id, meta);
    return meta.id;
  }

  addInfo(content, opts = {}) {
    opts.class ??= "info";

    return this.addNotification(content, opts);
  }

  addWarning(content, opts = {}) {
    opts.class ??= "warning";

    return this.addNotification(content, opts);
  }

  addError(content, opts = {}) {
    opts.class ??= "error";

    return this.addNotification(content, opts);
  }

}

module.exports = Notifications;
