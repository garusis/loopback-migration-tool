#! /usr/bin/env node
/**
 * Created by garusis on 31/01/17.
 */
import yargs from "yargs"

const argv = yargs
    .usage("lb-migration <cmd> [args]")
    .command('migrate [--method] [--ds] [--models]', 'Migrate models in datasources', {
        d: {
            demand: false,
            alias: ["ds", "datasource"],
            default: [],
            describe: "Datasources that will be migrated. If empty or not present, all datasources will be migrates.",
            type: "array"
        },
        mod: {
            demand: false,
            alias: "model",
            default: [],
            describe: "Models in the selected datasources that will be migrated. If empty or not present, all models in all selected datasources will be migrates. Selected Models not presents in selected datasources will be not migrated.",
            type: "array"
        },
        m: {
            demand: false,
            alias: "method",
            default: "migrate",
            choices:["update", "migrate"],
            describe: "Loopback migration method to use. Loopback uses automigrate and autoupdate methods for migrations.",
            type: "string"
        }
    }, function (argv) {
        console.log('migrate', argv)
    })
    .command('seed [--src]', 'Starts to seed your loopback application models', {
        s: {
            demand: false,
            alias: ["src", "sources"],
            default: ["./seeds/*.js"],
            describe: "File globs to your seeders files.",
            type: "array"
        }
    }, function (argv) {
        console.log('seed', argv)
    })
    .options({
        a: {
            demand: false,
            alias: ["app", "loopback-app"],
            default: "./server/server.js",
            describe: "Path to your loopback application main file.",
            type: "string"
        }
    })
    .help()
    .argv