const jwt = require('jsonwebtoken');
const responseOk = require('../utils/responseOk')
const responseError = require('../utils/responseError')
const PropertyModel = require('./../models/propertyModel')

/*const addPropertyFavorite = async (filter) => {
    try {
        const query= buildQueryFilter(filter);
        if (query) {    
            const properties = await PropertyModel.find(query);
            //obtenemos todos los datos de la propiedad para agregarla a favoritos
            //const propertieid
            
            const Favorite = new FavoriteModel(properties);
            await Favorite.save();
            return responseOk({ Favorite });
           // const Favoriteproperty = new FavoriteModel(propertyData);
            //await Favoriteproperty.save();
            //return responseOk({ Favoriteproperty})
        }
        return responseError(401, "property invalid")
        //const propertie= await FavoriteModel.findOne({propertyId : propertyId});
        
    } catch (error) {
        return responseError(error)
    }
}*/

const addProperty = async (propertyData) => {
    try {
        const property = new PropertyModel(propertyData);
        await property.save();
        return responseOk({ property})
    } catch (error) {
        return responseError(error)
    }
}
 
const getProperties = async (filter) => {
    try {
        const query= buildQueryFilter(filter);
        const properties = await PropertyModel.find(query);
        return responseOk({ properties});
    } catch (error) {
        responseError(500, 'server error');
    }
};

const buildQueryFilter = (filter) => {
    const query = {};
    if (filter.city) query.city= Number(filter.city);
    if (filter.zone) query.zone= Number(filter.zone);
    if (filter.propertyType) query.propertyType= Number(filter.propertyType);
    if (filter.businessType) query.businessType= Number(filter.businessType);
    if (filter.status) query.status= Number(filter.status);
    if (filter.minPrice && filter.maxPrice) {
        query.value = {
            $gte: Number(filter.minPrice), 
            $lte: Number(filter.maxPrice) 
        }
    }
    return query;
};

const getProperty = async (id) => {
    try {
        const property = await PropertyModel.findById(id)
                        .populate("ownerId", "name email phone")
                        .exec();
        if (property) {
            return responseOk({ property });        
        }  
        return responseError(404, "Property not found") 
    } catch (error) {
        responseError(500, 'server error');        
    }
}



module.exports = {
    addProperty,
    getProperties,
    getProperty,
    buildQueryFilter,
};