const req = require('express/lib/request');
const res = require('express/lib/response');
const { agregateFavorite, viewproperties } = require('../services/favoriteService');

const agregate = async (req, res) => {
    try {
        const user = req.body;
        const {statusHttp, response} = await agregateFavorite(user);
        //TODO
        res.status(statusHttp).json(response);
        
    } catch (error) {
        res.status(500).send(error);  
    }
};

const listar = async (req, res) => {
    try {
        const id = req.params.id;
        const {statusHttp, response} = await viewproperties(id);
        //TODO
        res.status(statusHttp).json(response);
        
    } catch (error) {
        res.status(500).send(error);  
    }
}

module.exports = {
    agregate,
    listar
}