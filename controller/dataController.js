var csv = require('csvtojson')

var deviceSchema = require('../model/device')



exports.dataParameter = (req, res) => {
    let particle = req.params.particle; // hard issue placing the variable "particle" into the arguments so tried this sqwitch case as a temporary workout 

    switch (particle) {
        case 'p1':
            return deviceSchema.find({}, { p1: 1, device: 1 })
                .then(data => {
                    res.send(data);

                }
                )
                .catch(err => {
                    res.status(400).send({
                        "type": 'error',
                        "msg": 'somethingo went wrong'
                    })
                })

        case 'p10':
            return deviceSchema.find({}, { p10: 1 })
                .then(data => {
                    res.send(data)
                }
                )
                .catch(err => {
                    res.status(400).send({
                        "type": 'error',
                        "msg": 'somethingo went wrong'
                    })
                })

        case 'p25':
            return deviceSchema.find({}, { p25: 1 })
                .then(data => {
                    res.send(data)
                }
                )
                .catch(err => {
                    res.status(400).send({
                        "type": 'error',
                        "msg": 'somethingo went wrong'
                    })
                })
        default:
            return (res.send({
                "type": "warning",
                "msg": 'Column do not exist '
            }))
    }
}

exports.allData = (req, res) => {
    deviceSchema.find({})
        .then(data => {
            return res.status(200).send(data);
        }
        )
        .catch(err => {
            return res.status(400).send({
                "type": 'error',
                "msg": 'somethingo went wrong'
            })
        })
}
