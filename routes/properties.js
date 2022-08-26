const express = require('express');
const router = express.Router();
// const {property} = require('../controllers/usersCtrl');
const { 
    create, 
    getAll, 
    getDetail,
    uploadImage } = require('../controllers/propertiesCtrl');

router.post('/', create);
router.get('/', getAll);
router.get('/:id', getDetail); 
router.post("/upload", uploadImage);

module.exports = router;