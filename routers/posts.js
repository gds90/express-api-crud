const express = require('express');
const router = express.Router();

const {
    store,
    show,
    index,
    update,
    destroy
} = require('../controllers/posts.js');

// Rotte
router.post('/', store);
router.get('/:slug', show);
router.get('/', index);
router.put('/:slug', update);
router.delete('/:slug', destroy);

module.exports = router;