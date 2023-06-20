/**
 * The possible endpoint for receiving intents, and delegating them amid plugins.
 * One concern being that any ranking and determination of handling within a plugin,
 * may also be needed for device handling outside intents, but that seems unlikely,
 * and most likely will be handled by a DeviceManager class of some sort.
 * Instead once an intent is received, this class should then create an object
 * from it, and test that object against all plugins with compatible values.
 * As well as implement any ranking of the plugins before
 */

class Intent {
  constructor(intentKind, intentObj) {
    this.intentKind = intentKind;
    this.intentObj = intentObj;

    // Items for the sake of history
    this.compatiblePlugins = new Map();
    this.plugin;
  }

  /**
   * Function called to trigger the intent acting on what it's been provided
   */
  act() {
    let potentialPlugins = companion.pluginManager.getServicePlugins();

    if (potentialPlugins.size === 0) {
      console.log("Intent is unable to act without any potential plugins.");
      return;
    }

    potentialPlugins.forEach((value, key, map) => {
      if (typeof value.meta?.companion.intents[this.intentKind] === "string" && value.status === "enabled") {
        this.compatiblePlugins.set(key, value);
      }
    });

    if (this.compatiblePlugins.size === 0) {
      console.log("Intent is unable to act without any compatible plugins.");
      return;
    }

    // Now with our list of plugins that can work with our intent type, we need
    // to rank these results to determine which to call.
    this.plugin = this.rankIntentHandler(this.compatiblePlugins);

    if (typeof this.plugin === "boolean" && this.plugin === false) {
      console.log("Intent is unable to act without a ranked plugin.");
      return;
    }

    let intentResult = this.plugin.instance[`${this.plugin.meta.companion.intents[this.intentKind]}`](this.intentObj);

    return intentResult;
  }

  /**
   * Ranks a map of provided intent handlers. It does this by first calling
   * every single plugin provided to the underscore intent function variant.
   * Each intent plugin will return it's own confidence that it can handle
   * this particular request given the requested data.
   * If the return isn't over `0.4` confident it can handle it (with 1 highest)
   * it won't even be considered. Later on additional checks should be done here
   * such as ranking further based on the history, context, etc.
   * But for now we return the first possible plugin.
   */
  rankIntentHandler(pluginMap) {
    // We are receiving a map of plugins, to determine which is best suited to
    // handle this particular request. First lets ensure they can all handle our request
    if (pluginMap.size === 0) {
      return false;
    }

    let successReportPlugins = new Map();

    pluginMap.forEach((value, key, map) => {

      let canHandle = value.instance[`_${value.meta.companion.intents[this.intentKind]}`](this.intentObj);

      if (canHandle > 0.4) {
        successReportPlugins.set(key, value);
      }
    });

    if (successReportPlugins.size === 0) {
      return false;
    }

    // Now with our list, we want to rank them on what we think is best.
    // If there is more than one. Which will depend on a lot of different things.
    // Such as the last one used in the conversational history, etc
    // For now, we will just return the first item.
    let pluginKeys = successReportPlugins.keys();
    return successReportPlugins.get(pluginKeys.next().value);
  }

}

module.exports = Intent;
