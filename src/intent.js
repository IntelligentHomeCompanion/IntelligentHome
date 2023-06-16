/**
 * The possible endpoint for receiving intents, and delegating them amid plugins.
 * One concern being that any rankind and determination of handling within a plugin,
 * may also be needed for device handling outside intents, but that seems unlikely,
 * and most likely will be handled by a DeviceManager class of some sort.
 * Instead once an intent is received, this class should then create an object
 * from it, and test that object against all plugins with compatible values.
 * As well as implement any ranking of the plugins before
 */

class Intent {
  constructor() {

  }

  receiveIntent(intentKind, intentObj) {

  }

}

module.exports = Intent;
