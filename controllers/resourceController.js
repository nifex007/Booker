const ResourceModel = require('../models/Resource');
const asyncHandler = require('../middlewares/async');
const ErrorResponse = require('../utilities/errorResponse');
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


/**
 * Update a specific Resource
 * POST /api/v1/resource/:id
 * @access Private
 */
 exports.updateResource = asyncHandler(async (request, response, next) => {
     const resource = await ResourceModel.findByIdAndUpdate(request.params.id, request.body, {new: true, runValidators: true});
     if (!resource) {
         return next(new ErrorResponse(`Resource with id of ${request.params.id} not found`, 404));
     }
     response.status(200).json({
         success: true,
         message: "OK",
         data: resource
     });
 });
