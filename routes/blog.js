const express = require('express');
const router = express.Router();
const blog_ctrl = require('./blogController.js');

/* GET Blog Main */
router.get('/', blog_ctrl.all_posts);

/* GET new post form */
router.get('/new', blog_ctrl.new_post_get);

/* Handle POST for new blog post */
router.post('/new', blog_ctrl.new_post_post);

/* GET fot post details */
router.get('/posts/:id', blog_ctrl.post_detail);

/* GET for edit post form */
router.get('/posts/:id/edit', blog_ctrl.edit_post_get);

/* Handle POST for edit post */
router.post('/posts/:id/edit', blog_ctrl.edit_post_post);

/* GET Confirm post delete page */
router.get('/posts/:id/delete', blog_ctrl.delete_post_get);

/* Handle POST to delete post */
router.post('/posts/:id/delete', blog_ctrl.delete_post_post);

module.exports = router;
