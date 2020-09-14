const ResourceModel = require('../models/Resource');
const asyncHandler = require('../middlewares/async');
/**
 * Create new Resource
 * POST /api/v1/resource
 * @access Private
 */

exports.createResource = asyncHandler(async (request, response, next) => {
        const resource = await ResourceModel.create(request.body);
        response.status(201).json({
        success: true,
        message: `${resource.name} added!`,
        data: resource
    });    
});


