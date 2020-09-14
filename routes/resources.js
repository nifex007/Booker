const express = require('express');

const { createResource, updateResource } = require('../controllers/resourceController');

const router = express.Router();

router.route('/resource').post(createResource);
router.route('/resource/:id').put(updateResource);


module.exports = router;

