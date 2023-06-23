const Module = require("node:module");

const cache = {
  builtins: {}
};

function registerBuiltins() {
  const companionJSPath = path.resolve("../exports/compaion.js");
  cache.builtins.companion = companionJSPath;
}

exports.cache.builtins = cache.builtins;
