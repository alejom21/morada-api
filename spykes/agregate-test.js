require('../connection/mongoconn');
const responseError = require('../utils/responseError');
const FavoriteModel = require('./../models/favoriteModel');

const mongoose = require('mongoose');
const {ObjectId} = mongoose.Types;

const main = async (id) => {
    
    try {  
        const favoritesByUser = await FavoriteModel.aggregate([
            {
                $match: {
                    userId: ObjectId(id)
                }
            },
            {
                $lookup: {
                    from: "properties",
                    localField: "propertyId", //favorite
                    foreignField: "_id", // property
                    as: "property",
                }
            },
            {
                $unwind: "$property", // para que se divida de forma correcta (mongo)
            },
            {
                $project: {
                    property: "$property",
                },
            },
        ]);
        console.log("favoritesByUser", favoritesByUser);
        /*if (favoriteByUser.length > 0) {
            return responseOk({ favoriteByuser});
        }
        return responseError(404, 'propiedad no encontrada')*/
    
    } catch (error) {
        return responseError(500, 'server error');
    }
};


main("62e3242b744b9b6693a0fffe");

// 62925c14e7ae52825d0db224
// 62e89ba766d0c1a992ca6392

//ObjectId("629b7e9763764ea44d25a881"),
// ObjectId("62e89ba766d0c1a992ca6392"),
/*
db.favorites.insertOne(
    {
        propertyId: ObjectId("62e89ba766d0c1a992ca6392"),
        userId: ObjectId("62e3242b744b9b6693a0fffe"),
    }
)
*/

// ObjectId("62e3242b744b9b6693a0fffe")