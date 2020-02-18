const BlogPost = require('../models/blogModel.js');
const async = require('async');

// Display all blog posts
exports.all_posts = (req,res,next) => {
	BlogPost.find({}, 'title content date')
		.populate('entry')
		.exec(function (err, show_posts) {
			if (err) { return next(err); }
			res.render('blog', { all_posts: show_posts });
		});
};

// Render New Post form
exports.new_post_get = function(req,res,next) {
	res.render('new', { title: 'New Post' })
};

// Handle POST for new blog entry
exports.new_post_post = (req,res,next) => {
	const entry = new BlogPost({
		title: req.body.title,
		content: req.body.content,
		date: Date.now()});
	entry.save(function(err) {
		if (err) {return next(err);}
		res.redirect('/blog/posts/' + entry.id);
	});
};

// Diplay post details
exports.post_detail = function(req,res,next) {
	async.parallel({
		entry: function(cb) {
			BlogPost.findById(req.params.id)
			.exec(cb)
		},
	}, function(err,results) {
		if (err) { return next(err); }
		res.render('view-post', { 
			id: results.entry.id, 
			title: results.entry.title,
			content: results.entry.content, 
			date: results.entry.date })
	});
}

// GET Edit Post form
exports.edit_post_get = function(req,res,next) {
	async.parallel({
		entry: function(cb) {
			BlogPost.findById(req.params.id)
			.exec(cb)
		},
	}, function(err,results) {
		if (err) { return next(err); }
		res.render('edit-post', { 
                        id: results.entry.id, 
                        title: results.entry.title, 
                        content: results.entry.content, 
                        date: results.entry.date 
		});
	});	
};

// POST Edit Post
exports.edit_post_post = function(req,res,next) {
	res.send('Edit Post POST')
};

// Delete Post GET
exports.delete_post_get = function(req,res,next) {
        async.parallel({
                entry: function(cb) {
                        BlogPost.findById(req.params.id)
                        .exec(cb)
                },
        }, function(err,results) {
                if (err) { return next(err); }
                res.render('delete-post', {
                        id: results.entry.id,
                        title: results.entry.title,
                        content: results.entry.content,
                        date: results.entry.date 
                });
        });
};

// Delete Post POST
exports.delete_post_post = function(req,res,next) {
	async.parallel({
		entry: function(cb) {
			BlogPost.findById(req.body.id).exec(cb)
		},
	}, function(err,resuts) {
		if (err) { return next(err); }
		BlogPost.findByIdAndRemove(req.body.id, function deleteBlogPost(err) {
			if (err) { return next(err); }
			res.redirect('/blog');
		})
	});
};
