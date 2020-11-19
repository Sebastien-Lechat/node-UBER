const mongoose = require('mongoose');

const historicSchema = mongoose.Schema({
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
        type: Number
    },
    moving_means : {
        type: String
    },
    map : {
        type: String 
    }

})

const Historic = mongoose.model('historic', historicSchema);

module.exports = Historic;