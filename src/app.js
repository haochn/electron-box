const path = require("path");
const {eleBox} = require(path.join(__dirname, "./index.js"));

const electronBox = new eleBox();

electronBox.ready('./example/index.html');