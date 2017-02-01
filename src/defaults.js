/**
 * Created by garusis on 01/02/17.
 */
import _ from "lodash"
import fs from "fs"
import debug from "debug"
import yargs from "yargs"

const defaults = {
    ds: [],
    model: [],
    method: "migrate",
    src: ["./seeds/*.js"],
    app: "./server/server.js"
}


export default loadDefaults("./.lb-migrationrc.json")

function loadDefaults(rcPath) {
    let newDefaults = {}
    if (fs.existsSync(rcPath)) {
        newDefaults = JSON.parse(fs.readFileSync(rcPath, "utf-8"))
    }
    newDefaults = _.defaults(newDefaults, defaults)
    return newDefaults
}