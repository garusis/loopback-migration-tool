#! /usr/bin/env node

"use strict";
/**
 * Created by garusis on 31/01/17.
 */

var _yargs = require("yargs");

var _yargs2 = _interopRequireDefault(_yargs);

var _defaults = require("../defaults");

var _defaults2 = _interopRequireDefault(_defaults);

var _migrate = require("../migrate");

var _migrate2 = _interopRequireDefault(_migrate);

var _seeder = require("../seeder");

var _seeder2 = _interopRequireDefault(_seeder);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var argv = _yargs2.default.usage("lb-migration <cmd> [args]").command('migrate [--method] [--ds] [--models]', 'Migrate models in datasources', {
    d: {
        demand: false,
        alias: ["ds", "datasource"],
        default: _defaults2.default.ds,
        describe: "Datasources that will be migrated. If empty or not present, all datasources will be migrates.",
        type: "array"
    },
    mod: {
        demand: false,
        alias: "model",
        default: _defaults2.default.model,
        describe: "Models in the selected datasources that will be migrated. If empty or not present, all models in all selected datasources will be migrates. Selected Models not presents in selected datasources will be not migrated.",
        type: "array"
    },
    imod: {
        demand: false,
        alias: "ignored_model",
        default: _defaults2.default.ignored_model,
        describe: "Models in the selected datasources that will be not migrated.",
        type: "array"
    },
    m: {
        demand: false,
        alias: "method",
        default: _defaults2.default.method,
        choices: ["update", "migrate"],
        describe: "Loopback migration method to use. Loopback uses automigrate and autoupdate methods for migrations.",
        type: "string"
    },
    a: {
        demand: false,
        alias: ["app", "loopback-app"],
        default: _defaults2.default.app,
        describe: "Path to your loopback application main file.",
        type: "string"
    }
}, function (argv) {
    return (0, _migrate2.default)(argv).catch(function (err) {
        console.error(err);
    });
}).command('seed [--src]', 'Starts to seed your loopback application models', {
    s: {
        demand: false,
        alias: ["src", "sources"],
        default: _defaults2.default.src,
        describe: "File globs to your seeders files.",
        type: "array"
    },
    a: {
        demand: false,
        alias: ["app", "loopback-app"],
        default: _defaults2.default.app,
        describe: "Path to your loopback application main file.",
        type: "string"
    }
}, function (argv) {
    return (0, _seeder2.default)(argv).catch(function (err) {
        console.error(err);
    });
}).help().argv;
//# sourceMappingURL=index.js.map
