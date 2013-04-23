
/**
 * Module dependencies.
 */

var mongoose = require('mongoose')
  , ObjectID = mongoose.mongo.BSONPure.ObjectID
  , GridStore = mongoose.mongo.GridStore
  , env = process.env.NODE_ENV || 'development'
  , config = require('../../config/config')[env]
  , fs = require('fs')

var menu_admin = 'assets'

/**
 * Show the asset file of the Gridfs
 */
exports.thumb = function(req, res){
	var db = mongoose.createConnection(config.db).db
	var file_id = req.param('file_id')
	console.log("Show file [%s].", file_id)
	GridStore.read(db, ObjectID.fromString(file_id), function(err, fileData) {
		if (err) {
			console.log(err)
			// 异常出错，显示默认图
			fileData = fs.readFileSync(config.root+'/public/images/default-560x560px.jpg');
		}
		db.close()
		
		res.contentType("image/jpeg")
		res.send(fileData)
	})
}

/**
 * Show the original file of the asset
 */
exports.srcfile = function(req, res){
	var db = mongoose.createConnection(config.db).db
	var asset_id = req.param('asset_id')
	Asset.load(asset_id, function(err, asset){
		if (err || !asset) {
			console.log(err)
			// 异常出错，显示默认图
			fileData = fs.readFileSync(config.root+'/public/images/default-560x560px.jpg')
			
			res.contentType("image/jpeg")
			res.send(fileData)
		}else{
			var file_id = asset.original_file
			GridStore.read(db, ObjectID.fromString(file_id), function(err, fileData) {
				if (err) {
					console.log(err)
					// 异常出错，显示默认图
					fileData = fs.readFileSync(config.root+'/public/images/default-560x560px.jpg')
				}
				db.close()

				res.contentType("image/jpeg")
				res.send(fileData)
			})
		}
	})
}

exports.index = function(req, res){
	var page = req.param('page') > 0 ? req.param('page') : 0
	var perPage = 5
	var options = {
		perPage: perPage,
	    page: page
	}
	
	Asset.list(options, function(err, assets){
		if (err) return res.render('500')
		Asset.count().exec(function(err, count){
			res.render('admin/assets/list', {
				title: '附件列表',
				assets: assets,
				menu_admin: menu_admin,
				page: page,
				pages: count / perPage
			})
		})
	})
}

/**
 * Upload asset file
 */
exports.new = function(req, res){
	res.render('admin/assets/new', {
		title: '上传附件',
		menu_admin: menu_admin,
		asset: new Asset({})
	})
}

/**
 * Delete an Asset
 */
exports.destroy = function(req, res) {
	var id = req.param('id')
	console.log("Delete file [%s]", id)
	Asset.load(id, function(err, asset){
		asset.remove(function(err) {
			res.redirect('/admin/assets')
		})
	})
}
