const Module = require("node:module");
const path = require("path");

console.log(Module);

require.cache[path.resolve("./exports/companion.js")] = {
//Module._cache[path.resolve("./exports/companion.js")] = {
//Module._cache["companion"] = {
  id: "companion",
  path: path.resolve("./exports"),
  exports: require("./exports/companion.js"),
  filename: path.resolve("./exports/companion.js"),
  children: [],
  loaded: true,
  paths: [
    path.resolve("./exports/companion.js"),
    path.resolve("./exports/"),
  ]
};

console.log(Module)
let myMod = Module("companion");
myMod.path = path.resolve("./exports/companion.js");
console.log(myMod);
process.exit(0);

console.log("---");
console.log(require.cache);
//console.log(Module._cache);

//Module._cache["companion"] = new Module.Module();

//const e = require(".");
//console.log(require);
const t = require("companion");

console.log("After req");
console.log(t);
