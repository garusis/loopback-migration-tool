"use strict";
/**
 * Created by garusis on 31/01/17.
 */

Object.defineProperty(exports, "__esModule", {
    value: true
});

exports.default = function (argv) {
    var app = (0, _utils.appLoader)(argv.app);

    return new _bluebird2.default(function (resolve, reject) {
        (0, _glob2.default)(argv.src, function (err, files) {
            if (err) return reject(err);
            var promises = _lodash2.default.map(files, function (file) {
                if (!_path2.default.isAbsolute(file)) {
                    file = process.cwd() + "/" + file;
                }

                var seeder = require(file);
                if (!_lodash2.default.isFunction(seeder) && seeder.default) {
                    seeder = seeder.default;
                }
                if (seeder.length === 2) {
                    seeder = _bluebird2.default.promisify(seeder);
                }
                return seeder(app);
            });
            _bluebird2.default.all(promises).then(resolve).catch(reject);
        });
    });
};

var _lodash = require("lodash");

var _lodash2 = _interopRequireDefault(_lodash);

var _glob = require("glob");

var _glob2 = _interopRequireDefault(_glob);

var _bluebird = require("bluebird");

var _bluebird2 = _interopRequireDefault(_bluebird);

var _path = require("path");

var _path2 = _interopRequireDefault(_path);

var _debug = require("debug");

var _debug2 = _interopRequireDefault(_debug);

var _utils = require("./utils");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
//# sourceMappingURL=seeder.js.map
