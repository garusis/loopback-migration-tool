"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _lodash = require("lodash");

var _lodash2 = _interopRequireDefault(_lodash);

var _fs = require("fs");

var _fs2 = _interopRequireDefault(_fs);

var _debug = require("debug");

var _debug2 = _interopRequireDefault(_debug);

var _yargs = require("yargs");

var _yargs2 = _interopRequireDefault(_yargs);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Created by garusis on 01/02/17.
 */
var defaults = {
    ds: [],
    model: [],
    method: "migrate",
    src: ["./seeds/*.js"],
    app: "./server/server.js"
};

exports.default = loadDefaults("./.lb-migrationrc.json");


function loadDefaults(rcPath) {
    var newDefaults = {};
    if (_fs2.default.existsSync(rcPath)) {
        newDefaults = JSON.parse(_fs2.default.readFileSync(rcPath, "utf-8"));
    }
    newDefaults = _lodash2.default.defaults(newDefaults, defaults);
    return newDefaults;
}
//# sourceMappingURL=defaults.js.map
