var lovey = {
	visitor : {},
    url : {},
    redirect: function(url,delay) {
        setTimeout(function(){
            window.location = url;
        },delay);
    }
};

/**
 * 初始化
 */
lovey.initial = function() { 
	
};


lovey.articles = function() {
	$('#article-from').validate({
		rules: {
			title: 'required',
			body: 'required'
		},
		messages: {
			title: '标题不能为空，不超过75个字符',
			body: '内容不能为空'
		}
	});
}


$(document).ready(function () {
	$('#article-body').wysihtml5({
		stylesheets: ["/css/wysiwyg-color.css"]
	});
	
	$('#tags').tagsInput({
	    'height':'30px',
	    'width':'530px'
	});
	
	lovey.articles();
	
});