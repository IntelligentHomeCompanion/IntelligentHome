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

      if (typeof this.meta.companion.config === "object") {
        this.rawConfig = this.meta.companion.config;
        companion.config.initPlugin(this.name, this.meta.companion.config);
      }

      if (typeof this.instance.init === "function" && this.getType() !== "web") {
        // We have to check for `web` here, since ExpressJS has a builtin function `init()`
        // that's exported here as well
        this.instance.init();
      }

      // Additional setup of the plugin depending on what type it is
      if (this.getType() === "device") {
        companion.timer.global.on("refresh", async () => {
          await this.runUpdates();
        });
      } else if (this.getType() === "web") {
        // This is the backend and/or frontend plugin
        // we must setup the HTTP listener here

        this.server = this.instance.listen(companion.config.port, () => {
          console.log("HTTP Server of some sort is up!");
        });

        companion.exterminate.add(`shutdown-${this.name}`, () => {
          this.server.close(() => {
            console.log(`${this.name} - HTTP Server Shutting down!`);
          });
        });
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

  destroyPlugin() {
    this.instance = undefined;
    this.meta = {};
  }

  getType() {
    return this.meta?.companion?.type ?? "";
  }

  async runUpdates() {
    if (typeof this.instance.update === "function") {
      this.instance.update();
    }
    if (typeof this.instance.updateAsync === "function") {
      await this.instance.updateAsync();
    }
  }

}

module.exports = Plugin;
