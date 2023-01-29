var csv = require('csvtojson')

var deviceSchema = require('../model/device')

function validate_date(text) {
    if (text.length < 17) return null;

    let [date, time] = text.split(",")  
    date = date.split('/')
    time = time.split(":");
    let valid_date = `20${date[0]}-${date[1]}-${date[2]},${time[0]}:${time[1]}:${time[2]}`
    valid_date = new Date(valid_date).toISOString()

    return valid_date;
}


exports.uploads = (req, res) => {
    var deviceDate;
    csv()
        .fromFile(req.file.path)
        .then((response) => {
            let i = 0;
            for (i; i < response.length; i++) {
                deviceDate = validate_date(response[i].t);
                response[i].t = deviceDate;
            }

            deviceSchema.insertMany(response, (err, data) => {
                if (err) {
                    console.log(err)
                } else {
                    res.status(200).send('Data uploaded successfully')
                }
            })
        })
}



