const Configuration = require("./configuration.js");
const PluginManager = require("./plugin-manager.js");

class CompanionEnvironment {
  constructor(opts) {
    this.exterminate = opts.exterminate ?? new (require("./exterminate.js"))();
    this.config = new Configuration();
    this.pluginManager = new PluginManager();
  }

  init() {
    // Initialize all components
    this.config.init();
    this.pluginManager.init();
  }
}

module.exports = CompanionEnvironment;
