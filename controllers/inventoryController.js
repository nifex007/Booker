const InventoryModel = require('../models/Inventory');

/**
 * Add new resource to inventory
 * POST /api/v1/inventory
 * @access Private
 */

 exports.addResourceToInventory = async (request, response, next) => {
     try {
        const inventory = await InventoryModel.create(request.body);
        response.status(201).json({
            success: true,
            message: `${inventory.resourceName} added to Inventory`,
            data: inventory
        });
         
     } 
     catch (error) {
         next(error);   
     }
     

     

 };