const  mongoose = require("mongoose");
const { Schema } = mongoose;

const RequestSchema = new Schema({
    propertyId: {
        type: Schema.Types.ObjectId,
        ref: 'properties'
    },
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'users'
    },
    Comment: String
}, {
    timestamps: true
})

const Request = mongoose.model('requests', RequestSchema);
module.exports = Request;