const express = require('express');
const router = express.Router();
const { agregate, listar } = require('../controllers/favoritesCtrl');

router.post('/agregate', agregate);
router.get('/:id', listar);

module.exports = router; 