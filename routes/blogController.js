const BlogPost = require('../models/blogModel.js');

// Display all blog posts
exports.all_posts = (req,res,next) => {
	BlogPost.find({}, 'title')
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
		res.render('view-post', { title: entry.title, content: entry.content, date: entry.date });
	});
};
