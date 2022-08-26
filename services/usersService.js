const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const UserModel =  require('./../models/userModel');
const responseOk = require('../utils/responseOk');
const responseError = require('../utils/responseError');

const auth = async (email, password) => { 
    try {
        const user= await UserModel.findOne({ email: email });
        if (user) {
            const match = await bcrypt.compare(password, user.password);
            if (match) {   
                const payload = {
                    id: user._id,
                    role: user.role
                };
                const token = jwt.sign(payload, process.env.JWT_SECRET);
                return responseOk({ token, role: user.role })    
            }
            return responseError(401, "password invalid")
        }
        return responseError(401, "user unauthorized");
    } catch (error) {
        return responseError(500, 'Server error');
    }


};

const info = async (id) => {
    try {
        const user= await UserModel.findById(id) // findOne({ _id: id})
        return responseOk({ user });        
    } catch (error) {
        return responseError(500, "Server error");        
    }
}

const propertys = (type, bussinesType) => {
    if (type === "apartamento" && bussinesType === "venta") {
        return responseOk({ token: "$$$$$$$$$$$$$"});
    }
    return responseError(401, "user unauthorized");
}


const register = async (userData) => {
    try {
        if (await validateEmail(userData.email)) {
            return responseError(400, 'Email is ready used');
        }
        const passwordEncrypted = await bcrypt.hash(userData.password, 11);
        userData.password = passwordEncrypted;
        const user = new UserModel(userData);
        await user.save();
        return responseOk({ user });
    } catch (error) {
        console.log('error', error)
        return responseError(500, 'server error');
    }
};

const validateEmail = async (email) => {
    try {
        const checkEmail = await UserModel.findOne({ email: email});
        return checkEmail ? true : false;
    } catch (error) {
        return responseError(500, 'server error');        
    }
}


module.exports = {
    auth,
    register,
    propertys,
    info
}