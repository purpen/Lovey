/**
 * Module dependencies.
 */
var mongoose = require('mongoose')
  , User = mongoose.model('User');

var menu_admin = 'dashboard'

/**
 * 后台管理入口
 */
exports.main = function (req, res) {
	res.render('admin/index', {
		title: '后台管理',
		menu_admin: menu_admin,
		layout: 'admin'
	})
}



