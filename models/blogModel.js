const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const BlogPostSchema = new Schema({
	title: {type: String, required: [true, 'Title required']},
	content: {type: String, required: [true, 'Content required']},
	date: {type: Date, default: Date.now() }
});

BlogPostSchema
	.virtual('url')
	.get(function() { return '/blog/posts/' + this.id; });

module.exports = mongoose.model('BlogPost', BlogPostSchema);
