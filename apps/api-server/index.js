"use strict";
exports.__esModule = true;
var express_1 = require("express");
var trpcExpress = require("@trpc/server/adapters/express");
var cors_1 = require("cors");
var saintsRouter_1 = require("./saintsRouter");
var context_1 = require("./context");
var app = (0, express_1["default"])();
app.use((0, cors_1["default"])());
var port = 8080;
app.use('/trpc', trpcExpress.createExpressMiddleware({
    router: saintsRouter_1.saintsRouter,
    createContext: context_1.createContext
}));
app.get("/", function (_, res) {
    res.send("Hello from api-server");
});
app.listen(port, function () {
    console.log("api-server listening at http://localhost:".concat(port));
});
