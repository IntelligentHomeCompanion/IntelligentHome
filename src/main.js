const CompanionEnvironment = require("./companion-environment.js");
const Exterminate = require("./exterminate.js");

const exterminate = new Exterminate();

(async () => {

  // Before registering the global namespace, lets inject our exports into Node's Module System

  //require.cache["companion"] = require("./exports.js");
  //const m = require("./exports.js");
  //console.log(require);
  //const mod = require("node:module");
  //mod.globalPaths.push(require("path").resolve("./exports.js"));
  //console.log(mod.globalPaths);
  //const exp = require("./exports");
  //console.log(mod.Module);
  //let myExport = new mod.Module()
  //process.exit(0);
  console.log(require.cache.builtins);
  process.exit(0);

  // Register our global namespace
  global.companion = new CompanionEnvironment({
    exterminate: exterminate
  });

  companion.init();

  console.log("Started up");

  console.log(companion.pluginManager.getPlugins());

  console.log("called intent");
  let commandRes = companion.command.add({
    type: "intent",
    content: {
      kind: "get_thing",
      intent: {
        name: "time"
      }
    }
  });

  console.log(`Res: ${commandRes}`);

  let directiveRes = await companion.command.add({
    type: "directive",
    content: {
      command: "turnOn",
      target: "dont-ever-set-the-id",
      params: {
      }
    }
  });
  console.log(`Res: ${directiveRes}`);

})();

// Register all events that warrant a safe shutdown
process.on("exit", async () => {
  // This is the normal exit handler
  await exterminate.trigger("exit");
});

process.on("SIGTERM", async () => {
  await exterminate.trigger("SIGTERM");
});

process.on("SIGINT", async () => {
  await exterminate.trigger("SIGINT");
});
