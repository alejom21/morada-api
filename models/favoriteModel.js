const  mongoose = require("mongoose");
const { Schema } = mongoose;

const FavoriteSchema = new Schema({
    
    propertyId: {
        type: Schema.Types.ObjectId,
        ref: 'properties'
    },
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'users'
    }

}, {
    timestamps: true
})

const Favorite = mongoose.model('favorites', FavoriteSchema);
module.exports = Favorite;