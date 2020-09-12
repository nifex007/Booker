const express = require('express');

const { addResourceToInventory } = require('../controllers/inventoryController');


const router = express.Router();

router.route('/').post(addResourceToInventory);

module.exports = router;
