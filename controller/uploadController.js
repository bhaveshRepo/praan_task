var express = require('express')
var multer = require('multer')
var mongoose = require('mongoose')
var path = require('path')
var bodyParser = require('body-parser')
var csv = require('csvtojson')

var deviceSchema = require('../model/device')



exports.uploads = (req, res) => {
    var deviceData;
    csv()
        .fromFile(req.file.path)
        .then((response) => {
            console.log(response);
            deviceSchema.insertMany(response, (err, data) => {
                if (err) {
                    console.log(err)
                } else {
                    console.log(data);
                    res.status(200).send('Data uploaded successfully')
                }
            })
        })
}



