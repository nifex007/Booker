const express = require('express');

const { createResource, updateResource, getResource, getResources } = require('../controllers/resourceController');
const { protect } = require('../middlewares/auth');
const router = express.Router();

router.route('/resource').post(protect, createResource);
router.route('/resource/:id').put(protect, updateResource).get(getResource);
router.route('/resources').get(getResources)


module.exports = router;

