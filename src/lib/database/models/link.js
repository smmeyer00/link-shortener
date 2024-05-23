import isURL from "validator/lib/isURL";

/**
 * _id, shortUrl, fullUrl, dateCreated, numClicks (eventually move to aggregate stats), userId
 */
const mongoose = require("mongoose");

const linkSchema = new mongoose.Schema({
    shortUrl: {
        type: String,
        required: true, 
        minLength: 1, // generator will start with 5, smaller min for paid custom links in future. TODO: collision rate metrics
        maxLength: 8, // 62 ** 8 = 218,340,105,584,896: will never exhaust 
        match: /^[a-zA-Z0-9]*$/,
        unique: true
    },
    fullUrl: {
        type: String,
        required: true,
        validate: {
            validator: (v) => {
                return isURL(v, {
                    require_protocol: true,
                })
            }
        }
    },
    dateCreated: {
        type: Date, 
        required: true,
        default: Date.now
    },
    numClicks: {
        type: Number,
        default: 0,
        min: 0,
        required: true
    }, 
    analyticsEnabled: {
        type: Boolean,
        required: false,
        default: false 
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true 
    }
})
linkSchema.index({ userId: 1 })
linkSchema.index({ shortUrl: 1 })

const Link = mongoose.models?.Link || mongoose.model('Link', linkSchema);
module.exports = Link