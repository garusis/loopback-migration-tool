"use strict"
/**
 * Created by garusis on 31/01/17.
 */
import _ from "lodash"
import glob from "glob"
import Promise from "bluebird"
import path from "path"
import dh from "debug-helper"
import {appLoader} from "./utils"

export default async function (argv) {
    let app = appLoader(argv.app)

    let promises = _.map(app.models, (Model) => _.isFunction(Model.destroyAll) ? Model.destroyAll() : Promise.resolve())
    await Promise.all(promises)

    let files = await Promise.promisify(glob)(argv.src)
    files = files.sort()

    for (let i = 0, j = files.length; i < j; i++) {
        await runSeedFile(app, files[i])
    }
}

async function runSeedFile(app, file) {
    dh.debug.info(`Runing ${file} seed file`)
    if (!path.isAbsolute(file)) {
        file = `${process.cwd()}/${file}`
    }

    let seeder = require(file)
    console.log(seeder)
    if (!_.isFunction(seeder) && seeder.default) {
        seeder = seeder.default
    }
    if (seeder.length === 2) {
        seeder = Promise.promisify(seeder)
    }
    await seeder(app)
}