const express = require("express");
const app = express();

if (typeof companion.config.get("default-web.trust-proxy") === "boolean") {
  // If the type is not boolean, it's never been set. As such we will leave it alone
  app.set("trust proxy", companion.config.get("default-web.trust-proxy"));
}

app.use((req, res) => {
  // Keep at last position,
  // Sitewide 404
});

module.exports = app;
