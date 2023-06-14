class Configuration {
  constructor() {
    // We could collect any environment variables wanted here,
    // but we should leave the configuration collection till init()
    this.config = {};
  }

  init() {
    // Here we should locate and read any configuration data as needed.
    // But for now lets just decide on the format.

    this.config = {
      core: {
        port: 8080
      }
    };

  }

  /**
   * Allows the retrevial of existing settings
   * config.get("core.port");
   */
  get(keypath) {
    let keypathArr = keypath.split(".");
    console.log(`keypath: ${keypath} - keypathArr: ${keypathArr}`);

    return keypathArr.reduce((prev, curr) => prev?.[curr], this.config);
    //if (this.config[...keypathArr] !== null) {
    //  return this.config[...keypathArr];
    //}

    //return null;
  }

  /**
   * Allows setting a settings key to a specific value
   * config.set("core.port", 8080);
   */
   set(keypath, value) {
     let keypathArr = keypath.split(".");

     //if (this.config[...keypathArr] !== null) {
       // The key has already been set, and we should change the existing value

     //} else if (typeof this.config[...keypathArr.slice(, -1)] === "object") {
       // The parent object of this key exists, meanwhile this specific key
       // does not yet exist

     //}

     // Otherwise the key nor parent object exists yet, we will fail silently here.
   }

}

module.exports = Configuration;
