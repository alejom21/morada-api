const jwt = require('jsonwebtoken');
require('../connection/mongoconn');
const responseOk = require('../utils/responseOk');
const responseError = require('../utils/responseError');
const FavoriteModel = require('./../models/favoriteModel');
const UserModel =  require('./../models/userModel');
const propertyModel = require('./../models/propertyModel');

const mongoose = require('mongoose');
const {ObjectId} = mongoose.Types;

const agregateFavorite = async (Data ) => {
    try {
       // if (await validateUser(Data.email) && await validateProperty(Data.propertyId)) {
            
            const user = new FavoriteModel(Data);
            /*await user.aggregate([
                {
                    $match: {
                        userId: Data.userId
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
            ]);*/
            //console.log("favoritesByUser", favoritesByUser); 
           /* const user = await FavoriteModel.aggregate([
                {
                    $match: {
                        userId: ObjectId(Data.userId)
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
            ]);*/
            await user.save(); 
            return responseOk({ user });   
       /* }     
        if (await validateUser(Data.email) == false) {
            return responseOk ("error email")
        } */
 
    } catch (error) {
        return responseError(500, "Server error-1");        
    }
}


const viewproperties = async (id) => {
    try {
/*        const pp =await FavoriteModel.populate("userId")
                                    .populate("propertyId")
                                    .exec();*/
/*        const properties = await FavoriteModel.findById(id)
                            .populate("propertyId", "title")
                            .populate("userId","name")
                            .exec();      */ 
                            const user = await FavoriteModel.aggregate([
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
        
        return responseOk({ user });        
          
    
    } catch (error) {
        return responseError(500, "Server error-2");           
    }
}

const validateUser = async (email) => {
    try {
        const checkUser = await UserModel.findOne({ email: email});
        return checkUser ? true : false;
    } catch (error) {
        return responseError(500, 'server error - CheckEmail');        
    }
}

const validateProperty = async (propertyId) => {
    try {
        const checkproperty = await propertyModel.findOne({ propertyId: propertyId});
        return checkproperty ? true : false;
    } catch (error) {
        return responseError(500, 'server error - CheckProperty');        
    }
}



/*
const addFavorites = async (favoriteData) => {
    try {
        const favorite = new FavoriteModel(favoriteData);
        await favorite.save();
        return responseOk({ favorite });
    } catch (error) {
        return responseError(500, 'Server error');
    }
};

const getFavorites = async (id) => {
    try {
        const favoriteByUser = await FavoriteModel.aggregate(
            [
                {
                    $match: {
                        userId: objectId(id)
                    }
                },
                {
                    $lookup: {
                        from: 'users',
                        localField: 'userId',
                        foreignField: '_id',
                        as: 'user'
                    }
                },
                {
                    $unwind: '$user'
                },
                {
                    $lookup: {
                        from: 'properties',
                        localField: 'propertyId',
                        foreignField: '_id',
                        as: 'property'
                    }
                },
                {
                    $unwind: '$property'
                },
                {
                    $project: {
                        userId: 'user._id',
                        name: '$user.name',
                        email: '$user.email',
                        phone: '$user.phone',
                        propertyId: '$property._id',
                        title: '$property',
                        value: '$property.value'
                    }
                }
            ]
        );

        if (favoriteByUser.length > 0) {
            return responseOk({ favoriteByUser});
        }
        return responseError(404, 'propiedad no encontrada')
    
    } catch (error) {
        return responseError(500, 'server error');
    }
};*/

module.exports ={
    agregateFavorite, 
    viewproperties
}