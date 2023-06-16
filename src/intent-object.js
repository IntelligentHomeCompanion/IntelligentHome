/**
 * The IntentObject is the `opts` object passed to each intent handler.
 * This class should not only easily export all possible supported values,
 * It should also come with a huge host of utility functions, to make working
 * with it as easy as possible.
 */
const SchemaObject = require("./schema-object.js");

class IntentObject extends SchemaObject {
  constructor(builder) {
    if (typeof builder === "object") {
      super(builder);
      // This of course assumes that NLP processing will return us a string and
      // not an object
    } else {
      // Do another kind of fancy setup here?
    }
  }

  isLike() {
    // One day do something cool, yeah?
    return true;
  }
  
}

module.exports = IntentObject;
