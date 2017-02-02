#! /usr/bin/env node
"use strict"
/**
 * Created by garusis on 31/01/17.
 */
import yargs from "yargs"
import {defaults} from "../utils"
import migrate from "../migrate"
import seeder from "../seeder"

const argv = yargs
    .usage("lb-migration <cmd> [args]")
    .command('migrate [--method] [--ds] [--models]', 'Migrate models in datasources', {
        d: {
            demand: false,
            alias: ["ds", "datasource"],
            default: defaults.ds,
            describe: "Datasources that will be migrated. If empty or not present, all datasources will be migrates.",
            type: "array"
        },
        mod: {
            demand: false,
            alias: "model",
            default: defaults.model,
            describe: "Models in the selected datasources that will be migrated. If empty or not present, all models in all selected datasources will be migrates. Selected Models not presents in selected datasources will be not migrated.",
            type: "array"
        },
        imod: {
            demand: false,
            alias: "ignored_model",
            default: defaults.ignored_model,
            describe: "Models in the selected datasources that will be not migrated.",
            type: "array"
        },
        m: {
            demand: false,
            alias: "method",
            default: defaults.method,
            choices: ["update", "migrate"],
            describe: "Loopback migration method to use. Loopback uses automigrate and autoupdate methods for migrations.",
            type: "string"
        },
        a: {
            demand: false,
            alias: ["app", "loopback-app"],
            default: defaults.app,
            describe: "Path to your loopback application main file.",
            type: "string"
        }
    }, function (argv) {
        return migrate(argv)
            .then(function () {
                process.exit(0)
            })
            .catch(function (err) {
                console.error(err)
                process.exit(-1)
            })
    })
    .command('seed [--src]', 'Starts to seed your loopback application models', {
        s: {
            demand: false,
            alias: ["src", "sources"],
            default: defaults.src,
            describe: "File globs to your seeders files.",
            type: "array"
        },
        a: {
            demand: false,
            alias: ["app", "loopback-app"],
            default: defaults.app,
            describe: "Path to your loopback application main file.",
            type: "string"
        }
    }, function (argv) {
        return seeder(argv)
            .then(function () {
                process.exit(0)
            })
            .catch(function (err) {
                console.error(err)
                process.exit(-1)
            })
    })
    .help()
    .argv