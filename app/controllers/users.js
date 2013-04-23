/**
 * Module dependencies.
 */
var mongoose = require('mongoose')
  , User = mongoose.model('User');

exports.signin = function (req, res) {}

/**
 * Auth callback
 */

exports.authCallback = function (req, res, next) {
  res.redirect('/')
}

exports.login = function (req, res) {
	res.render('users/login', {
		title: '登录'
	});
};

exports.signup = function (req, res) {
	res.render('users/signup', {
		title: '注册',
		user: new User()
	});
};

/**
 * Create user
 */
exports.create = function (req, res) {
	var user = new User(req.body);
	user.provider = 'local';
	user.save(function (err) {
		if (err) {
			return res.render('users/signup', { title: '注册', errors: err.errors, user: user });
		}
		req.login(user, function (err) {
			if (err) return next(err);
			return res.redirect('/');
		});
	});
};