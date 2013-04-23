
/**
 * Module dependencies.
 */

exports.index = function (req, res) {
	res.render('home', {
		title: '首页'
	})
}

/**
 * 礼品卡
 */
exports.gift = function (req, res) {
	res.render('gift', {
		title: '礼品'
	})
}