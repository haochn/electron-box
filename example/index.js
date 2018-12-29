const path = require("path");
const {eleBox} = require(path.join(__dirname, "../src/index.js"));
console.log(path.join(__dirname, "../src/index"));
const electronBox = new eleBox();
electronBox.ready('./index.html');