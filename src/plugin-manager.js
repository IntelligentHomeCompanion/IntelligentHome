class PluginManager {
  constructor() {
    this.pluginListing;
    this.plugins = new Map();
  }

  init() {
    // Here we would want to begin loading all possible plugins
    this.pluginListing = companion.config.get("pluginManager.pluginListing");
  }
}

module.exports = PluginManager;
