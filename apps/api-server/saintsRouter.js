"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
exports.__esModule = true;
exports.saintsRouter = void 0;
var trpc_1 = require("./trpc");
var axios_1 = require("axios");
var cheerio = require("cheerio");
var zod_1 = require("zod");
var months = [
    "january",
    "february",
    "march",
    "april",
    "may",
    "june",
    "july",
    "august",
    "september",
    "october",
    "november",
    "december",
];
exports.saintsRouter = (0, trpc_1.router)({
    greeting: trpc_1.publicProcedure.query(function () { return "hello from trpc"; }),
    getSaints: trpc_1.publicProcedure.query(function () { return __awaiter(void 0, void 0, void 0, function () {
        var listOfObj, today, month, day;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    listOfObj = [];
                    today = new Date();
                    month = months[today.getMonth()];
                    day = today.getDate().toString();
                    return [4 /*yield*/, axios_1["default"]
                            .get("http://catholicsaints.mobi/calendar/".concat([day, month].join("-"), ".htm"))
                            .then(function (res) {
                            var $ = cheerio.load(res.data);
                            var listOfVerses = $("hr ~ h3, img, h4, h4:contains(Profile) ~ p");
                            /* listOfVerses.each((_, el) => {
                                        console.log($(el).text());
                                    }) */
                            var pointer = null;
                            var profilePointer = null;
                            var tempObj = {
                                name: "",
                                img: "",
                                profile: []
                            };
                            listOfVerses.each(function (_, el) {
                                var _a, _b;
                                if ($(el).is("h3")) {
                                    if (pointer !== null) {
                                        listOfObj = __spreadArray(__spreadArray([], listOfObj, true), [tempObj], false);
                                        pointer = null;
                                        tempObj = {
                                            name: "",
                                            img: "",
                                            profile: []
                                        };
                                    }
                                    pointer = $(el).text();
                                    tempObj = __assign(__assign({}, tempObj), { name: pointer });
                                }
                                else if ($(el).is("img")) {
                                    var img = (((_a = $(el).attr("src")) === null || _a === void 0 ? void 0 : _a.valueOf()) ? (_b = $(el).attr("src")) === null || _b === void 0 ? void 0 : _b.valueOf() : "");
                                    tempObj = __assign(__assign({}, tempObj), { img: img });
                                }
                                else if ($(el).is("h4")) {
                                    if ($(el).text() === "Profile") {
                                        profilePointer = $(el).text();
                                    }
                                    else {
                                        profilePointer = null;
                                    }
                                }
                                else if ($(el).is("p") && profilePointer) {
                                    tempObj = __assign(__assign({}, tempObj), { profile: __spreadArray(__spreadArray([], tempObj.profile, true), [$(el).text()], false) });
                                }
                            });
                        })];
                case 1:
                    _a.sent();
                    return [2 /*return*/, listOfObj];
            }
        });
    }); }),
    getReadings: trpc_1.publicProcedure
        .input(zod_1["default"].object({
        book: zod_1["default"].string(),
        chapter: zod_1["default"].number(),
        verses: zod_1["default"].array(zod_1["default"].number())
    }))
        .query(function (opts) { return __awaiter(void 0, void 0, void 0, function () {
        var v, reading;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    v = opts.input.verses;
                    reading = {
                        title: "",
                        verses: []
                    };
                    return [4 /*yield*/, axios_1["default"]
                            .get("https://alkitab.mobi/manggarai/".concat(opts.input.book, "/").concat(opts.input.chapter))
                            .then(function (res) {
                            var $ = cheerio.load(res.data);
                            var listOfVerses = $("p");
                            listOfVerses.each(function (_, el) {
                                var verseNumber = 0;
                                var ayat = "";
                                var span = $(el).find("span");
                                if (v.length > 0) {
                                    if ($(span).is(".paragraphtitle")) {
                                        reading = __assign(__assign({}, reading), { title: $(span).text() });
                                    }
                                    if ($(span).is(".reftext")) {
                                        verseNumber = parseInt($(span).find("a").text());
                                        ayat = $(el).text().replace(verseNumber.toString(), "");
                                        if (v.includes(verseNumber)) {
                                            reading = __assign(__assign({}, reading), { verses: __spreadArray(__spreadArray([], reading.verses, true), [
                                                    { idx: verseNumber, text: ayat },
                                                ], false) });
                                            v = v.filter(function (val) { return val !== verseNumber; });
                                        }
                                    }
                                }
                                else {
                                    return false;
                                }
                            });
                        })];
                case 1:
                    _a.sent();
                    return [2 /*return*/, reading];
            }
        });
    }); })
});
