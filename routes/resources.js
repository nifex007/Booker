const express = require('express');

const { createResource, updateResource, getResource, getResources } = require('../controllers/resourceController');

const router = express.Router();

router.route('/resource').post(createResource);
router.route('/resource/:id').put(updateResource).get(getResource);
router.route('/resources').get(getResources)


module.exports = router;

