
/**
 * Module dependencies.
 */

var mongoose = require('mongoose')
  , env = process.env.NODE_ENV || 'development'
  , config = require('../../config/config')[env]
  , Schema = mongoose.Schema


/**
 * Getters
 */

var getTags = function (tags) {
	return tags.join(',');
}

/**
 * Setters
 */

var setTags = function (tags) {
	return tags.split(',');
}

/**
 * Stuff Schema
 */

var StuffSchema = new Schema({
	title: {type:String, default:'', trim:true},
	body: {type:String, default:'', trim: true},
	user: {type: Schema.ObjectId, ref: 'User'},
	tags: {type:[], get:getTags, set:setTags},
	state: {type:Number, default: 1},
	create_at: {type: Date, default: Date.now} 
})


mongoose.model('Stuff', StuffSchema)

