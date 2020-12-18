var liveServer = require("live-server");

var params = {
    port: 8181,
    root: "./src",
    file: "index.html",
};
liveServer.start(params);