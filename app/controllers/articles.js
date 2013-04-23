
/**
 * Module dependencies.
 */

var mongoose = require('mongoose')
  , Article = mongoose.model('Article')
  , env = process.env.NODE_ENV || 'development'
  , config = require('../../config/config')[env]
  , ObjectID = mongoose.mongo.ObjectID
  , GridStore = mongoose.mongo.GridStore
  , BSON = mongoose.mongo.pure().BSON
  , _ = require('underscore')
  , fs = require('fs')

var menu_admin = 'articles'

/**
 * Find articles
 */
exports.index = function(req, res) {
	var page = req.param('page') > 0 ? req.param('page') : 0
	var perPage = 5
	var options = {
		perPage: perPage,
	    page: page
	}
	
	Article.list(options, function(err, articles){
		if (err) return res.render('500')
		Article.count().exec(function(err, count){
			res.render('admin/articles/list', {
				title: '文章列表',
				articles: articles,
				menu_admin: menu_admin,
				page: page,
				pages: count / perPage
			})
		})
	})
	
}

/**
 * Find article by id
 */

exports.article = function(req, res, next, id){
  Article.load(id, function (err, article) {
    if (err) return next(err)
    if (!article) return next(new Error('Failed to load article ' + id))
    req.article = article
    next()
  })
}

/**
 * Find article by id
 */
exports.show = function(req, res, next, id) {
	Article.load(id, function(err, article) {
		if (err) return next(err);
		if (!article) return next(new Error('Failed to load article' + id));
		req.article = article;
		next();
	});
	
	res.render('admin/articles/list', {
		title: '文章列表',
		menu_admin: menu_admin
	});
};

/**
 * 新增
 */
exports.new = function(req, res) {
	res.render('admin/articles/new', {
		title: '发表文章',
		menu_admin: menu_admin,
		article: new Article({})
	});
};

/**
 * Create an Article
 */
exports.create = function(req, res) {
	//console.log(req.body)
	var article = new Article(req.body)
	article.uploadAndSave(req.files.image, function(err){
		if (err) {
			console.log(err)
			res.render('admin/articles/new', {
				title: '发表文章',
				article: article,
				menu_admin: menu_admin,
				errors: err.errors
			})
		} else {
			res.redirect('/admin/articles')
		}
	})
	
}

/**
 * Edit an Article
 */
exports.edit = function(req, res) {
	var id = req.param('id')
	Article.load(id, function (err, article) {
	    if (!article) return next(new Error('Failed to load article ' + id))
		res.render('admin/articles/edit', {
			title: '编辑文章: '+ article.title,
			menu_admin: menu_admin,
			article: article
		})
	})
}

/**
 * Update an Article
 */
exports.update = function(req, res) {
	var article = req.article
	article = _.extend(article, req.body)
	console.log(req.files.image)
	article.uploadAndSave(req.files.image, function(err){
		if (err) {
			res.render('admin/articles/edit', {
				title: '编辑文章',
				article: article,
				menu_admin: menu_admin,
				errors: err.errors
			})
		} else {
			res.redirect('/admin/articles')
		}
	})
}

/**
 * Delete an Article
 */
exports.destroy = function(req, res) {
	var article = req.article
	article.remove(function(err) {
		res.redirect('/admin/articles')
	})
}

