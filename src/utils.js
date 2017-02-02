"use strict"
/**
 * Created by garusis on 01/02/17.
 */
import _ from "lodash"
import fs from "fs"
import path from "path"
import debug from "debug"
import yargs from "yargs"

const defs = {
    ds: [],
    model: [],
    method: "migrate",
    ignored_model: [],
    src: ["./seeds/*.js"],
    app: "./server/server.js"
}

export let defaults = loadDefaults("./.lb-migrationrc.json")

export function app(appPath) {
    if (!path.isAbsolute(appPath)) {
        appPath= `${process.cwd()}/${appPath}`
    }
    let app = require(appPath)
    if (!app.loopback && app.default && app.default.loopback) //exported as a ES6 module.
        app = app.default
    return app
}

function loadDefaults(rcPath) {
    let newDefaults = {}
    if (fs.existsSync(rcPath)) {
        newDefaults = JSON.parse(fs.readFileSync(rcPath, "utf-8"))
    }
    newDefaults = _.defaults(newDefaults, defs)
    return newDefaults
}

