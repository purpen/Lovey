
/**
 * Module dependencies.
 */

var mongoose = require('mongoose')
  , env = process.env.NODE_ENV || 'development'
  , config = require('../../config/config')[env]
  , ObjectID = mongoose.mongo.ObjectID
  , GridStore = mongoose.mongo.GridStore
  , BSON = mongoose.mongo.pure().BSON
  , _ = require('underscore')
  , fs = require('fs')

var menu_admin = 'category'

/**
 * Find category
 */
exports.index = function(req, res) {
	res.render('admin/category/index', {
		title: '分类列表',
		menu_admin: menu_admin,
		category: new Category({})
	})
}

/**
 * 新增
 */
exports.new = function(req, res) {
	res.render('admin/category/new', {
		title: '创建分类',
		menu_admin: menu_admin,
		category: new Category({})
	})
}