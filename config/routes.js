/*
var mongoose = require('mongoose')
  , Article = mongoose.model('Article')
  , User = mongoose.model('User')
  , async = require('async');
*/

module.exports = function (app, passport, auth) {
	// user routes
	var users = require('../app/controllers/users')
	app.get('/login', users.login)
	app.get('/signup', users.signup)
	app.post('/signup', users.create)
	
	// blog routes
	var blog = require('../app/controllers/blog')
	app.get('/blog', blog.index)
	app.get('/blog/:id', blog.show)
	
	var home = require('../app/controllers/home')
	app.get('/', home.index)
	app.get('/gift', home.gift)
	
	// admin routes
	var admin = require('../app/controllers/admin')
	app.get('/admin', admin.main)
	
	// category admin routes
	var category = require('../app/controllers/category')
	app.get('/admin/category', category.index)
	app.get('/admin/category/new', category.new)
	
	
	// article routes
	var articles = require('../app/controllers/articles')
	app.get('/admin/articles', articles.index)
	app.get('/admin/articles/new', articles.new)
	app.post('/admin/articles', articles.create)
	app.get('/admin/articles/:id/edit', articles.edit)
	app.put('/admin/articles/:id', articles.update)
	app.del('/admin/articles/:id', articles.destroy)
	
	// asset routes
	var assets = require('../app/controllers/assets')
	var upload = require('../app/controllers/upload')
	app.get('/thumb/:file_id', assets.thumb)
	app.get('/srcfile/:asset_id', assets.srcfile)
	
	app.get('/admin/assets', assets.index)
	app.get('/admin/assets/new', assets.new)
	app.post('/admin/assets', upload.photo)
	app.del('/admin/assets', assets.destroy)
	
	app.param('id', articles.article)
	
	// guide routes
	var guide = require('../app/controllers/guide')
	app.get('/contact', guide.contact)
	app.get('/about-us', guide.aboutus)
	
}