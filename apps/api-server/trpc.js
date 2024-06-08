"use strict";
exports.__esModule = true;
exports.middleware = exports.publicProcedure = exports.router = void 0;
var server_1 = require("@trpc/server");
var t = server_1.initTRPC.context().create();
exports.router = t.router;
exports.publicProcedure = t.procedure;
exports.middleware = t.middleware;
