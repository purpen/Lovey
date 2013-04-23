
/**
 * Module dependencies.
 */

var mongoose = require('mongoose')
  , env = process.env.NODE_ENV || 'development'
  , config = require('../../config/config')[env]
  , Schema = mongoose.Schema


/**
 * Category Schema
 */

var CategorySchema = new Schema({
	name: {type:String, default:'', trim:true},
	total: {type:Number, default: 0},
	parent_id: {type:Number, default: 0},
	order_by: {type:Number, default: 0},
	type:{type:Number, default: 0},
	create_at: {type: Date, default: Date.now} 
})


module.exports = Category = mongoose.model('Category', CategorySchema)