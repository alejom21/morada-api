const req = require('express/lib/request');
const res = require('express/lib/response');
const { auth, register, propertys, info} = require('../services/usersService');

const login = async (req, res) => {
    try{
        const user = req.body;
        const {statusHttp, response} = await auth(user.email, user.password);
        //TODO
        res.status(statusHttp).json(response);
        //res.json({ auth: true });
    } catch (error){
        res.status(500).send(error);
    }
};

const getUser = async (req, res) => {
    try {
        //const {id} = req.query; //const id= req.body.id
        const {id} = req.payload;
        const { statusHttp, response} = await info(id);
        res.status(statusHttp).json(response);
    } catch (error) {
        res.status(500).send(error);        
    }
}

const signup = async (req, res) => {
    try {
        const user =  req.body;   
        const {statusHttp, response} = await register(user);
        //TODO
        res.status(statusHttp).json(response);
    } catch (error) {
        res.status(500).send(error);
    }
};

const property = (req, res) => {
    try {
        const user = req.query;
        const {statusHttp, response} = propertys(user.type, user.bussinesType);
        //TODO
        res.status(statusHttp).json(response);
        
    } catch (error) {
        res.status(500).send(error);  
    }
};

module.exports = {
    login, 
    signup,
    property,
    getUser
};