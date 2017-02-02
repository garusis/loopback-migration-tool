"use strict"
/**
 * Created by garusis on 31/01/17.
 */
import _ from "lodash"
import glob from "glob"
import Promise from "bluebird"
import path from "path"
import debug from "debug"
import {appLoader} from "./utils"

export default function (argv) {
    let app = appLoader(argv.app)

    return new Promise(function (resolve, reject) {
        glob(argv.src, function (err, files) {
            if (err) return reject(err)
            let promises = _.map(files, function (file) {
                if (!path.isAbsolute(file)) {
                    file= `${process.cwd()}/${file}`
                }

                let seeder = require(file)
                if(!_.isFunction(seeder) && seeder.default){
                    seeder = seeder.default
                }
                if(seeder.length === 2){
                    seeder = Promise.promisify(seeder)
                }
                return seeder(app)
            })
            Promise.all(promises)
                .then(resolve)
                .catch(reject)
        })
    })
}