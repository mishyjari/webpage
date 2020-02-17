const express = require('express');
const router = express.Router();
const blog_ctrl = require('./blogController.js');

/* GET Blog Main */
router.get('/', blog_ctrl.all_posts);

/* GET new post form */
router.get('/new', blog_ctrl.new_post_get);

/* Handle POST for new blog post */
router.post('/new', blog_ctrl.new_post_post);

module.exports = router;
