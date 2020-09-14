const InventoryModel = require('../models/Inventory');
const ErrorResponse = require('../utilities/errorResponse');
const asyncHandler = require('../middlewares/async');

/**
 * Add new resource to inventory
 * POST /api/v1/inventory
 * @access Private
 */

 exports.addResourceToInventory = asyncHandler(async (request, response, next) => {
    const inventory = await InventoryModel.create(request.body);
    response.status(201).json({
        success: true,
        message: `${inventory.resourceName} added to Inventory`,
        data: inventory
    });
 });