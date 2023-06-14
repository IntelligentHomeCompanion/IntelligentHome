const Configuration = require("./configuration.js");

class CompanionEnvironment {
  constructor(opts) {
    this.exterminate = opts.exterminate ?? new (require("./exterminate.js"))();
    this.config = new Configuration();
  }

  init() {
    // Initialize all components
    this.config.init();
  }
}

module.exports = CompanionEnvironment;
