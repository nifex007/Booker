const express = require('express');
const router = express.Router();


router.post('/', (request, response) => {
    response.status(200).json({});
});
 

router.get('/', (request, response) => {
    response.status(200).json({});
});


router.get('/:id', (request, response) => {
    response.status(200).json({});
});


router.put('/:id', (request, response) => {
    response.status(200).json({});
});


router.delete('/:id', (request, response) => {
    response.status(200).json({});
});



module.exports = router;