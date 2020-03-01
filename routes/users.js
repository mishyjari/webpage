const express = require('express');
const router = express.Router();
const User = require('../models/user');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource', { session: req.session });
});

/* GET Login Page */
router.get('/login', (req,res,next) => {
	res.render('login', { session: req.session });
});

/* Handle POST for Login */
router.post('/login', (req,res,next) => {
        User.findOne({
                username: req.body.username,
                password: req.body.password
        }, function(err, results) {
                if (err) { return next(err) }
                if ( results ) {
                        req.session.loggedin = true;
                        req.session.username = req.body.username;
                        res.render('index', { memo: 'Welcome, ' + req.body.username, session: req.session });
                } else {
                        res.send('Invalid Credentials');
                }
        });

});

/* Handle Logout (GET Only) */
router.get('/logout', (req,res,next) => {
	if (!req.session.loggedin) { res.send('Not Logged In') }
	else {
		req.session.destroy(err => {
			if (err) { return next(err) }
			res.render('/login', { memo: 'Logged Out Successfully.', session: req.session})
		});
	}
});

/* GET Registration Page */
router.get('/new', (req,res,next) => {
	res.render('newUser', { session: req.session });
});

/* Handle POST for Registration Form */
router.post('/new', (req,res,next) => {
	const user = new User({
		username: req.body.username,
		firstname: req.body.firstname,
		lastname: req.body.lastname,
		email: req.body.email,
		password: req.body.password,
	});
	if (req.body.password !== req.body.confirmPassword)
		{ res.render('newUser', { memo: 'Passwords Do Not Match', session: req.session} ) }
	else { user.save(err => {
		if (err) { return next(err) }
		res.render('login', { memo: "User Created Successfully", session: req.session}) })
	};	
});

/* GET Edit User Page */
router.get('/:id/edit', (req,res,next) => {
	res.render('editUser', { session: req.session })
});

/* Handle POST for Edit User */
router.post('/:id/edit', (req,res,next) => {
	res.send('Edit User POST Not Implimented')
});

/* GET Delete User Confirmation Form */
router.get('/:id/delete', (req,res,next) => {
	res.render('deleteUser', { session: req.session })
});

/* Handle POST to Delete User */
router.post('/:id/delete', (req,res,next) => {
	res.send('Delete User POST Not Implimented')
});

module.exports = router;
