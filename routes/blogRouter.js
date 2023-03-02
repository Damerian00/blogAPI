
const blogController = require('../controllers/blogController');
const express = require('express');
const router = express.Router();

router.post('/', blogController.addBlog);

router.get('/', blogController.getBlogs);

router.get('/:id', blogController.getABlog);

router.put('/:id', blogController.updateBlog);

router.delete('/:id', blogController.deleteBlog);

module.exports = router;
