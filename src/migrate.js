"use strict"
/**
 * Created by garusis on 31/01/17.
 */
import _ from "lodash"
import Promise from "bluebird"
import debug from "debug"


export default function (argv) {

    return new Promise(function (resolve, reject) {
        app.on('booted', function () {
            let specificDS = !!argv.ds.length
            let specificModels = !!argv.model.length

            if (specificModels) argv.model = _.map(argv.model, (modelName) => _.lowerCase(modelName))
            argv.ignored_model = _.map(argv.ignored_model, (modelName) => _.lowerCase(modelName))

            let datasources = _.chain(app.datasources).toArray().uniq().value() //remove duplicated datasources
            let dsByName = _.keyBy(datasources, (elem) => _.lowerCase(elem.settings.name))

            if (specificDS) {
                argv.ds = _.map(argv.ds, (dsName) => _.lowerCase(dsName))

                datasources = {}
                _.forEach(argv.ds, function (ds) { //filter to get the specific datasources
                    datasources[ds] = dsByName[ds]
                })
            } else {
                datasources = dsByName
                argv.ds = _.keys(datasources)
            }


            let modelsByDS = {}

            _.forEach(app.models, function (Model) {
                let modelName = Model.definition.name
                if (Model.dataSource) {
                    let dsName = _.lowerCase(Model.dataSource.settings.name)
                    let modelNameLower = _.lowerCase(modelName)
                    if (!datasources[dsName] || _.includes(argv.ignored_model, modelNameLower)) return

                    if (!specificModels || (specificModels && _.includes(argv.model, modelNameLower))) {
                        if (!modelsByDS[dsName]) {
                            modelsByDS[dsName] = []
                        }
                        modelsByDS[dsName].push(modelName)
                    }
                }
            })

            let isUpdateMethod = argv.method === 'update'
            let promises = _.map(modelsByDS, function (modelNames, dsLowerName) {
                let ds = datasources[dsLowerName]
                let migrateMethod = isUpdateMethod ? ds.autoupdate : ds.automigrate
                if (!migrateMethod) return Promise.resolve()

                console.log(`---------------Start to migrate the ${ds.settings.name} datasource with ${argv.method} method`)
                console.log(`Models to migrate ${JSON.stringify(modelNames)}`)
                migrateMethod = Promise.promisify(migrateMethod, {context: ds})
                return migrateMethod(modelNames)
                    .then(function () {
                        console.log(`---------------${ds.settings.name} datasource migration finished.`)
                    })
            })


            return Promise.all(promises)
                .then(resolve)
                .catch(reject)
        })
    })
}