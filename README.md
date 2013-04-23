##
 变更环境我们可以设置 NODE_ENV 环境变量，如：
 $ NODE_ENV=production node app.js

## 
  关联到命名占位符（named placeholders）的值可用 req.params 来访问。
  app.get('/user/:id', function(req, res){
	res.send('user' + req.params.id);
  })