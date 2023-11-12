const Plugin = require("./plugin.js");

class PluginManager {
  constructor() {
    // `companion` is not available in this constructor
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

  getServicePlugins() {
    let pluginList = new Map();

    this.plugins.forEach((value, key, map) => {
      if (value.getType() === "service") {
        pluginList.set(key, value);
      }
    });

    return pluginList;
  }

}

module.exports = PluginManager;
