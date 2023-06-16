const Plugin = require("./plugin.js");

class PluginManager {
  constructor() {
    this.pluginListing;
    this.plugins = new Map();
  }

  init() {
    // Here we would want to begin loading all possible plugins
    this.pluginListing = companion.config.get("pluginManager.pluginListing");

    this.loadPlugins();
  }

  loadPlugins() {

    for (let i = 0; i < this.pluginListing.length; i++) {
      this.plugins.set(this.pluginListing[i].name, new Plugin(this.pluginListing[i]));
    }

  }

  getPlugins() {
    return this.plugins;
  }

}

module.exports = PluginManager;
