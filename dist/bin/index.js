#! /usr/bin/env node
"use strict";

var _yargs = require("yargs");

var _yargs2 = _interopRequireDefault(_yargs);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var argv = _yargs2.default.usage("lb-migration <cmd> [args]").command('migrate [--ds] [--models]', 'Migrate models in datasources', {
    d: {
        demand: false,
        alias: ["ds", "datasource"],
        default: [],
        describe: "Datasources that will be migrated. If empty or not present, all datasources will be migrates.",
        type: "array"
    },
    m: {
        demand: false,
        alias: "model",
        default: [],
        describe: "Models in the selected datasources that will be migrated. If empty or not present, all models in all selected datasources will be migrates. Selected Models not presents in selected datasources will be not migrated.",
        type: "array"
    }
}, function (argv) {
    console.log('migrate', argv);
}).command('seed [--src]', 'Starts to seed your loopback application models', {
    s: {
        demand: false,
        alias: ["src", "sources"],
        default: ["./seeds/*.js"],
        describe: "File globs to your seeders files.",
        type: "array"
    }
}, function (argv) {
    console.log('seed', argv);
}).options({
    app: {
        demand: false,
        alias: "loopback-app",
        default: "./server/server.js",
        describe: "Path to your loopback application main file.",
        type: "string"
    }
}).help().argv;
/**
 * Created by garusis on 31/01/17.
 */
//# sourceMappingURL=index.js.map
