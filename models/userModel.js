const  mongoose = require("mongoose");
const { Schema } = mongoose;

const UserSchema = new Schema(
    {
        name: String,
        DocumentType: String,
        document: String,
        email: {
            type: String,
            unique: true,
            required: true
        },
        password: {
            type: String,
            required: true
        },
        phone: String,
        role: {
            type: Number,
            default: 1
        },
        ownerId: {
            type: Schema.Types.ObjectId,
            ref: 'properties'
        },
        ownerId2: {
            type: Schema.Types.ObjectId,
            ref: 'favorites'
        },
    }, 
    { timestamps: true }
);

const User = mongoose.model("users", UserSchema);

module.exports = User;