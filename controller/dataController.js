var csv = require('csvtojson')

var deviceSchema = require('../model/device')

exports.data_based_on_quarter = async (req, res) => {
    let { from, to } = req.body
    try {
        let data = await deviceSchema.find({ t: { $gte: from, $lte: to } }).exec()
        return res.status(200).json({ data })
    } catch (err) {
        console.error(err)
    }
}

exports.data_based_on_time = async (req, res) => {

    let { from } = req.body
    try {
        let data = await deviceSchema.findOne({ t: { $gte: from } }).exec()
        return res.status(200).json({ data })
    } catch (err) {
        console.error(err)
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
                "msg": 'something went wrong'
            })
        })
}
