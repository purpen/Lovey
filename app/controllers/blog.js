/**
 * Module dependencies.
 */
var mongoose = require('mongoose')
  , ObjectID = mongoose.mongo.ObjectID
  , GridStore = mongoose.mongo.GridStore
  , env = process.env.NODE_ENV || 'development'
  , config = require('../../config/config')[env]
  , _ = require('underscore')
  , fs = require('fs')

var menu_main = 'blog'

/**
 * Find blog articles
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
			res.render('blog/index', {
				title: '悦生活',
				articles: articles,
				menu_main: menu_main,
				page: page,
				pages: count / perPage
			})
		})
	})
}

/**
 * Find article by id
 */
exports.show = function(req, res) {
	var id = req.param('id')
	Article.load(id, function(err, article) {
		if (err || !article) {
			return new Error('Failed to load article' + id);
		}
			
		res.render('blog/show', {
			title: '文章列表',
			menu_main: menu_main,
			article: article
		})
	})
	
}

/**
 * 列表页
 */
exports.list = function (req, res) {
	res.render('blog/list', {
		title: '悦生活'
	})
}



