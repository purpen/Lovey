
/**
 * Module dependencies.
 */

var mongoose = require('mongoose')
  , ObjectID = mongoose.mongo.BSONPure.ObjectID
  , GridStore = mongoose.mongo.GridStore
  , env = process.env.NODE_ENV || 'development'
  , config = require('../../config/config')[env]
  , fs = require('fs')
  , mime = require('mime')
  , async = require('async')
  , _ = require('underscore')
  , gm = require('gm')
  , Asset = mongoose.model('Asset')

/**
 * Upload image files
 */
exports.photo = function(req, res){
	var db = mongoose.createConnection(config.db).db
	var upload_files = []
	var files = req.files.image
	
	var prepareUpload = function(file, fn){
		var file_id = new ObjectID()
		// Create a new file
		var gs = new GridStore(db, file_id, 'w')
		gs.open(function(err, gs){
			if (err) return fn(err)
			var file_data = fs.readFileSync(file.path)
			var org_file = file
			var asset_info = {
				'filename': file.name,
				'mine_type': file.type,
				'bytes': file.size
			}
			
			gm(file.path).identify(function (err, data) {
			  if (err) return fn(err)
				
				asset_info['width'] = data.size.width
				asset_info['height'] = data.size.height
				
				// Write the file to GridFS
				gs.write(file_data, function(err, gs) {
					if (err) return fn(err)
					// Flush to the GridFS
					gs.close(function(err, gs) {
						if (err) return fn(err)

						asset_info['original_file'] = file_id
						var asset = new Asset(asset_info)
						// Save asset info
						asset.save(function(err){
							if (err) return fn(err)
							// save file ids
							upload_files.push(file_id)
						})
					})
				})
				
			})
		})
	}
	
	async.forEach(files, prepareUpload, function(err) {
		if (err) {
			console.error(err)
		}
	})
	
	res.redirect('/admin/assets')
}