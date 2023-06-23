exports.id = "companion";
// This file is used to export portions of this codebase, for easy consumption of plugins

module.id = "companion";

module.exports = {
  Test: (val) => {
    return `Hello Wrold! ${val}`;
  },
};
