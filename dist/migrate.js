"use strict";
/**
 * Created by garusis on 31/01/17.
 */

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _stringify = require("babel-runtime/core-js/json/stringify");

var _stringify2 = _interopRequireDefault(_stringify);

exports.default = function (argv) {
    var app = (0, _utils.appLoader)(argv.app);

    return new _bluebird2.default(function (resolve, reject) {
        app.on('booted', function () {
            var specificDS = !!argv.ds.length;
            var specificModels = !!argv.model.length;

            if (specificModels) argv.model = _lodash2.default.map(argv.model, function (modelName) {
                return _lodash2.default.lowerCase(modelName);
            });
            argv.ignored_model = _lodash2.default.map(argv.ignored_model, function (modelName) {
                return _lodash2.default.lowerCase(modelName);
            });

            var datasources = _lodash2.default.chain(app.datasources).toArray().uniq().value(); //remove duplicated datasources
            var dsByName = _lodash2.default.keyBy(datasources, function (elem) {
                return _lodash2.default.lowerCase(elem.settings.name);
            });

            if (specificDS) {
                argv.ds = _lodash2.default.map(argv.ds, function (dsName) {
                    return _lodash2.default.lowerCase(dsName);
                });

                datasources = {};
                _lodash2.default.forEach(argv.ds, function (ds) {
                    //filter to get the specific datasources
                    datasources[ds] = dsByName[ds];
                });
            } else {
                datasources = dsByName;
                argv.ds = _lodash2.default.keys(datasources);
            }

            var modelsByDS = {};

            _lodash2.default.forEach(app.models, function (Model) {
                var modelName = Model.definition.name;
                if (Model.dataSource) {
                    var dsName = _lodash2.default.lowerCase(Model.dataSource.settings.name);
                    var modelNameLower = _lodash2.default.lowerCase(modelName);
                    if (!datasources[dsName] || _lodash2.default.includes(argv.ignored_model, modelNameLower)) return;

                    if (!specificModels || specificModels && _lodash2.default.includes(argv.model, modelNameLower)) {
                        if (!modelsByDS[dsName]) {
                            modelsByDS[dsName] = [];
                        }
                        modelsByDS[dsName].push(modelName);
                    }
                }
            });

            var isUpdateMethod = argv.method === 'update';
            var promises = _lodash2.default.map(modelsByDS, function (modelNames, dsLowerName) {
                var ds = datasources[dsLowerName];
                var migrateMethod = isUpdateMethod ? ds.autoupdate : ds.automigrate;
                if (!migrateMethod) return _bluebird2.default.resolve();

                console.log("---------------Start to migrate the " + ds.settings.name + " datasource with " + argv.method + " method");
                console.log("Models to migrate " + (0, _stringify2.default)(modelNames));
                migrateMethod = _bluebird2.default.promisify(migrateMethod, { context: ds });
                return migrateMethod(modelNames).then(function () {
                    console.log("---------------" + ds.settings.name + " datasource migration finished.");
                });
            });

            return _bluebird2.default.all(promises).then(resolve).catch(reject);
        });
    });
};

var _lodash = require("lodash");

var _lodash2 = _interopRequireDefault(_lodash);

var _bluebird = require("bluebird");

var _bluebird2 = _interopRequireDefault(_bluebird);

var _debug = require("debug");

var _debug2 = _interopRequireDefault(_debug);

var _utils = require("./utils");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
//# sourceMappingURL=migrate.js.map
