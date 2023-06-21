class Configuration {
  constructor() {
    // `companion` is not available in this constructor
    // We could collect any environment variables wanted here,
    // but we should leave the configuration collection till init()
    this.config = {};
  }

  init() {
    // Here we should locate and read any configuration data as needed.
    // But for now lets just decide on the format.

    this.config = {
      core: {
        port: 8080,
        refreshTime: 1000
      },
      pluginManager: {
        pluginListing: [
          // This array should only list files and names of plugins, along with
          // enabled, disabled status
          {
            name: "clock",
            location: "./plugins/clock",
            status: "enabled"
          },
          {
            name: "mystery-binary-switch",
            location: "./plugins/mystery-binary-switch",
            status: "enabled"
          },
          {
            name: "default-web",
            location: "./plugins/default-web",
            status: "enabled"
          }
        ]
      }
    };

    // Register the save function to the shutdown of the core
    companion.exterminate.add("core.config.save", this.save);

  }

  /**
   * Allows the retrevial of existing settings
   * config.get("core.port");
   */
  get(keypath, curObj = false) {
    let keypathArr = keypath.split(".");

    let value;

    if (curObj !== false) {
      value = curObj[keypathArr[0]] ?? null;
    } else {
      value = this.config[keypathArr[0]] ?? null;
    }

    if (value === null) {
      return value;
    }

    if (keypathArr.length > 1) {
      keypathArr.shift();
      return this.get(keypathArr.join("."), value);
    } else {
      return value;
    }
  }

  /**
   * Allows setting a settings key to a specific value
   * config.set("core.port", 8080);
   * You can even set a deep object that doesn't yet exist such as:
   * config.set("core.plugin.notexist.notexist.notexist", "hello world");
   */
   set(keypath, value, curObj = false) {
     let keypathArr = keypath.split(".");

     let obj;

     if (curObj !== false) {
       obj = curObj[keypathArr[0]] ?? null;

       if (obj === null) {
         curObj[keypathArr[0]] = {};
         obj = curObj[keypathArr[0]];
       }
     } else {
       obj = this.config[keypathArr[0]] ?? null;

       if (typeof obj === "undefined") {
         this.config[keypathArr[0]] = {};
         obj = curObj[keypathArr[0]];
       }
     }

     if (keypathArr.length > 1) {
       keypathArr.shift();
       return this.set(keypathArr.join("."), value, obj);
     } else {
       // We are in the final position of the keypath
       // lets set the value
       if (curObj !== false) {
         curObj[keypathArr[0]] = value;
       } else {
         this.config[keypathArr[0]] = value;
       }
       return undefined;
     }

   }

   /**
    * A simple initialization into the layout of any given configuration.
    * Will add a new key to the root of the existing config, only if not already
    * present, and walk down the tree adding all values as provided.
    * While this was originally going to walk the object, ensuring to skip
    * some type of key determined to be a descriptor, might just set the whole thing.
    * No harm in a few extra bytes for simplicity
    */
   initPlugin(name, conf) {
     if (typeof this.config[name] === "undefined") {
       this.config[name] = conf;
     } // We could error if being asked to add something that already exists?
   }

   // Should exist to save the configuration, either on update, or otherwise
   save() {
     console.log("Saving Config...");
   }

}

module.exports = Configuration;
