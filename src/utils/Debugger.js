const Package = require("../../package.json");
module.exports.log = (e => console.log("\x1b[36m" + Package.name.split(".")
    .join("") + " \x1b[34m» \x1b[32m" + e + "\x1b[0m")), module.exports.error = (e => console.error("\x1b[36m" + Package.name.split(".")
    .join("") + " \x1b[34m» \x1b[31m" + e + "\x1b[0m"));
