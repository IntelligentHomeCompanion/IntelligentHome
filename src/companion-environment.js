const Configuration = require("./configuration.js");
const PluginManager = require("./plugin-manager.js");
const Command = require("./command.js");

class CompanionEnvironment {
  constructor(opts) {
    // `companion` is not available in this constructor 
    this.exterminate = opts.exterminate ?? new (require("./exterminate.js"))();
    this.config = new Configuration();
    this.pluginManager = new PluginManager();
    this.command = new Command();
  }

  init() {
    // Initialize all components
    this.config.init();
    this.pluginManager.init();
    this.command.init();
  }
}

module.exports = CompanionEnvironment;
