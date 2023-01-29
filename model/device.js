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
            type: Number,
            required: true,
            maxlength: 32,
        },
        h: {
            type: String,
        },
        p1: {
            type: Number,

        },
        p25: {
            type: Number,

        },
        p10: {
            type: Number,

        },
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model("device", deviceSchema);