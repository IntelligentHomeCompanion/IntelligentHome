const CompanionEnvironment = require("./companion-environment.js");
const Exterminate = require("./exterminate.js");

const exterminate = new Exterminate();

(async () => {

  // Register our global namespace
  global.companion = new CompanionEnvironment({
    exterminate: exterminate
  });


})();

// Register all events that warrant a safe shutdown
process.on("SIGTERM", async () => {
  await exterminate.trigger("SIGTERM");
});

process.on("SIGINT", async () => {
  await exterminate.trigger("SIGINT");
});
