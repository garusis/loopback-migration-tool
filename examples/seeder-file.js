/**
 * Created by garusis on 01/02/17.
 */
"use strict"

const _ = require("lodash")
const Promise = require("bluebird")
const data = [
    {
        origin: "Colombia",
        destination: "Mexico",
        passengers: [
            {passport: "AO8888888", name: "A-Name"},
            {passport: "AO7777777", name: "Another-Name"},
            {passport: "AO7777444", name: "Another-Name2"}
        ]
    },
    {
        origin: "Mexico",
        destination: "Colombia",
        passengers: [
            {passport: "AO8888111", name: "AA-Name"},
            {passport: "AO6666777", name: "AAnother-Name"},
            {passport: "AO5577444", name: "AAnother-Name2"}
        ]
    }
]

module.exports = function (app, cb) {
    let Travel = app.models.Travel

    let promises = _.map(data, function (entry) {
        let passengers = entry.passengers
        delete entry.passengers

        return Travel.create(entry)
            .then((travel) => travel.passengers.create(passengers))
    })

    return Promise.all(promises) //Or you can use cb argument when all is done, but not both.
}