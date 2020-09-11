const ResourceModel = require('../models/Resource');
/**
 * Create new Resource
 * POST /api/v1/resource
 * @access Private
 */

exports.createResource = async (request, response, promise) => {
    const resource = await ResourceModel.create(request.body);
    response.status(201).json({
        success: true,
        message: `${resource.name} added!`,
        data: resource
    });   
};


