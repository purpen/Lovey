
/**
 * Module dependencies.
 */

var mongoose = require('mongoose')
  , env = process.env.NODE_ENV || 'development'
  , config = require('../../config/config')[env]
  , Schema = mongoose.Schema


/**
 * Asset Schema
 */

var AssetSchema = new Schema({
	target_id: {type:String, default:''},
	original_file: {type:String, default:''},
	filename: {type:String, default:'', trim: true},
	mine_type: {type:String, default:''},
	bytes: {type:Number, default: 0},
	width: {type:Number, default: 0},
	height: {type:Number, default: 0},
	asset_type: {type:Number, default: 1},
	state: {type:Number, default: 1},
	create_at: {type: Date, default: Date.now} 
})

/**
 * Statics
 */

AssetSchema.statics = {
	
	/**
	 * Find asset by id
	 *
	 * @param {ObjectId} id
	 * @param {Function} cb
	 * @api public
	 */
	load: function (id, cb) {
		this.findOne({ _id: id})
		  .exec(cb)
	},
	
	
	list: function(options, cb) {
		var criteria = options.criteria || {}

	    this.find(criteria)
	      .sort({'create_at': -1}) // sort by date
	      .limit(options.perPage)
	      .skip(options.perPage * options.page)
	      .exec(cb)
	}
}

module.exports = Asset = mongoose.model('Asset', AssetSchema)