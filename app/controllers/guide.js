
/**
 * Module dependencies.
 */

exports.contact = function (req, res) {
	res.render('guide/contact', {
		title: '联系我们'
	})
}

exports.aboutus = function(req, res) {
	res.render('guide/aboutus', {
		title: '关于我们'
	})
}