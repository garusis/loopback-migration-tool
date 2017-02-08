"use strict";
/**
 * Created by garusis on 31/01/17.
 */

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _regenerator = require("babel-runtime/regenerator");

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require("babel-runtime/helpers/asyncToGenerator");

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

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

exports.default = function () {
    var _ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee(argv) {
        var app, promises;
        return _regenerator2.default.wrap(function _callee$(_context) {
            while (1) {
                switch (_context.prev = _context.next) {
                    case 0:
                        app = (0, _utils.appLoader)(argv.app);
                        promises = _lodash2.default.map(app.models, function (Model) {
                            return _lodash2.default.isFunction(Model.destroyAll) ? Model.destroyAll() : _bluebird2.default.resolve();
                        });
                        _context.next = 4;
                        return _bluebird2.default.all(promises);

                    case 4:
                        _context.next = 6;
                        return new _bluebird2.default(function (resolve, reject) {
                            (0, _glob2.default)(argv.src, function (err, files) {
                                if (err) return reject(err);
                                promises = _lodash2.default.chain(files).sort().map(function (file) {
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
                                }).value();
                                _bluebird2.default.all(promises).then(resolve).catch(reject);
                            });
                        });

                    case 6:
                        return _context.abrupt("return", _context.sent);

                    case 7:
                    case "end":
                        return _context.stop();
                }
            }
        }, _callee, this);
    }));

    return function (_x) {
        return _ref.apply(this, arguments);
    };
}();
//# sourceMappingURL=seeder.js.map
