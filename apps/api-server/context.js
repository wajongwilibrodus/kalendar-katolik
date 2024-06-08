"use strict";
exports.__esModule = true;
exports.createContext = void 0;
var createContext = function (_a) {
    var req = _a.req, res = _a.res;
    return ({
        req: req,
        res: res
    });
};
exports.createContext = createContext;
