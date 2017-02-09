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

var runSeedFile = function () {
    var _ref2 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee2(app, file) {
        var seeder;
        return _regenerator2.default.wrap(function _callee2$(_context2) {
            while (1) {
                switch (_context2.prev = _context2.next) {
                    case 0:
                        _debugHelper2.default.debug.info("Runing " + file + " seed file");
                        if (!_path2.default.isAbsolute(file)) {
                            file = process.cwd() + "/" + file;
                        }

                        seeder = require(file);

                        if (!_lodash2.default.isFunction(seeder) && seeder.default) {
                            seeder = seeder.default;
                        }
                        if (seeder.length === 2) {
                            seeder = _bluebird2.default.promisify(seeder);
                        }
                        _context2.next = 7;
                        return seeder(app);

                    case 7:
                    case "end":
                        return _context2.stop();
                }
            }
        }, _callee2, this);
    }));

    return function runSeedFile(_x2, _x3) {
        return _ref2.apply(this, arguments);
    };
}();

var _lodash = require("lodash");

var _lodash2 = _interopRequireDefault(_lodash);

var _glob = require("glob");

var _glob2 = _interopRequireDefault(_glob);

var _bluebird = require("bluebird");

var _bluebird2 = _interopRequireDefault(_bluebird);

var _path = require("path");

var _path2 = _interopRequireDefault(_path);

var _debugHelper = require("debug-helper");

var _debugHelper2 = _interopRequireDefault(_debugHelper);

var _utils = require("./utils");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function () {
    var _ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee(argv) {
        var app, promises, files, i, j;
        return _regenerator2.default.wrap(function _callee$(_context) {
            while (1) {
                switch (_context.prev = _context.next) {
                    case 0:
                        app = (0, _utils.appLoader)(argv.app);
                        promises = _lodash2.default.map(app.models, function (Model) {
                            if (Model.dataSource && _lodash2.default.isFunction(Model.destroyAll)) {
                                return Model.destroyAll();
                            }
                            return _bluebird2.default.resolve();
                        });
                        _context.next = 4;
                        return _bluebird2.default.all(promises);

                    case 4:
                        _context.next = 6;
                        return _bluebird2.default.promisify(_glob2.default)(argv.src);

                    case 6:
                        files = _context.sent;

                        files = files.sort();

                        i = 0, j = files.length;

                    case 9:
                        if (!(i < j)) {
                            _context.next = 15;
                            break;
                        }

                        _context.next = 12;
                        return runSeedFile(app, files[i]);

                    case 12:
                        i++;
                        _context.next = 9;
                        break;

                    case 15:
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
