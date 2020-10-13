const express = require('express');

const { addResourceToInventory } = require('../controllers/inventoryController');
const { protect } = require('../middlewares/auth');


const router = express.Router();

// TODO: Get inventory 

// TODO: Update Inventory 

router.route('/inventory').post(protect, addResourceToInventory);

module.exports = router;
