const express = require('express');
const router = express.Router();
const BlogPost = require('../models/blogModel.js');
const async = require('async');

// Display all blog posts
router.get('/', (req,res,next) => {
	BlogPost.find({}, 'title content date')
		.populate('entry')
		.exec(function (err, show_posts) {
			if (err) { return next(err); }
			res.render('blog', { all_posts: show_posts, session: req.session });
		});
});

// Render New Post form
router.get('/new', (req,res,next) => {
	res.render('new', { session: req.session })
});

// Handle POST for new blog entry
router.post('/new', (req,res,next) => {
	const entry = new BlogPost({
		title: req.body.title,
		content: req.body.content,
		date: Date.now(),
		author: req.session.username	
	});
	entry.save(function(err) {
		if (err) {return next(err);}
		res.redirect('/blog/posts/' + entry.id);
	});
});

// Diplay post details
router.get('/posts/:id', (req,res,next) => {
	BlogPost.findById(req.params.id)
	.exec((err,results) => {
		if (err) { return next(err); }
		res.render('view-post', {post: results, session: req.session});
	});
});

/* GET Edit Post Form */
router.get('/posts/:id/edit', (req,res,next) => {
	BlogPost.findById(req.params.id)
	.exec((err,results) => {
		if (err) { return next(err) }
		res.render('editBlog', { post: results, session: req.session });
	});
});

/* Handle POST to Edit Post */
router.post('/posts/:id/edit', (req,res,next) => {
	BlogPost.findByIdAndUpdate(req.params.id, { 
		title: req.body.title,
		content: req.body.content,
		edited: Date.now()
	}).exec((err,results) => {
		if (err) { return next(err) }
		res.redirect('/blog/posts/'+results.id, {session: req.session})
	});			
});

/* GET Confirm Delete Page */
router.get('/posts/:id/delete', (req,res,next) => {
	BlogPost.findById(req.params.id)
	.exec((err,results) => {
		if (err) { return next(err) }
		res.render('deleteBlog', { post: results, session: req.session });
	});
});

/* Handle Delete post POST */
router.post('/posts/:id/delete', (req,res,next) => {
	BlogPost.findByIdAndDelete(req.params.id,
	(err,results) => {
		if (err) { return next(err) }
		res.render('index', {memo: 'Post Deleted', session: req.session});
	});
});

module.exports = router;
