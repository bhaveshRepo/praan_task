const mongoose = require("mongoose");
const { Schema } = mongoose;


const deviceSchema = new Schema(
    {
        device: {
            type: String,
        },
        t: {
            type: String
        },
        w: {
            type: String,
            required: true,
            maxlength: 32,
        },
        h: {
            type: String,
        },
        p1:{
            type: String,

        },
        p25:{
            type: String,

        },
        p10:{
            type: String,

        },
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model("device", deviceSchema);