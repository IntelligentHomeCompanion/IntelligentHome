/**
 * Essentially, allows easy interaction with as many possible
 * supported values from here: https://schema.org/
 * To define intents and such
 */

class SchemaObject {
  constructor(opts) {
    this.name = opts.name ?? null;
  }

  hasName() {
    if (this.name !== null) {
      return true;
    } else {
      return false;
    }
  }

}

module.exports = SchemaObject;
