const fs = require("fs");
const path = require("path");

class Plugin {
  constructor(pluginListing) {
    this.name = pluginListing.name;
    this.location = pluginListing.location;
    this.status = pluginListing.status;

    this.instance;
    this.meta = {};

    this.initData();

    if (this.status === "enabled") {
      this.initPlugin();
    }

  }

  initPlugin() {
    if (typeof this.instance === "undefined") {
      this.instance = require(`${path.resolve(this.location)}`);

      if (typeof this.instance.init === "function") {
        this.instance.init();
      }
    }
  }

  initData() {
    let pack = fs.readFileSync(`${this.location}/package.json`, {encoding: "utf8"});

    this.meta = JSON.parse(pack);
  }

  resetPlugin() {
    this.instance = undefined;
    this.meta = {};
    this.initData();

    if (this.status === "enabled") {
      this.initPlugin();
    }
  }

  getType() {
    return this.meta?.companion?.type ?? "";
  }

}

module.exports = Plugin;