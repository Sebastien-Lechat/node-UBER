const mongoose = require('mongoose');

const historySchema = mongoose.Schema({
    user_id : {
        type: String,
        required: [true, "User ID required"]
    },
    departure_location : {
        type: String,
        required : [true, "Departure location required"]
    },
    arrival_location : {
        type: String,
        required : [true, "Arrival location required"]
    },
    waypoints : {
        type : String
    },
    date: {
        type: Date,
        default: Date.now()
    },
    moving_means : {
        type: String
    },
    map : {
        type: String, 
        required : [true, "Map required"]
    }
})

const History = mongoose.model('history', historySchema);

module.exports = History;