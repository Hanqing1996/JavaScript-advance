var http = require('http')
var fs = require('fs')
var url = require('url')
var port = process.argv[2]

if(!port){
  console.log('请指定端口号好不啦？\nnode server.js 8888 这样不会吗？')
  process.exit(1)
}

var server = http.createServer(function(request, response){
  var parsedUrl = url.parse(request.url, true)
  var pathWithQuery = request.url 
  var queryString = ''
  if(pathWithQuery.indexOf('?') >= 0){ queryString = pathWithQuery.substring(pathWithQuery.indexOf('?')) }
  var path = parsedUrl.pathname
  var query = parsedUrl.query
  var method = request.method

  /******** 从这里开始看，上面不要看 ************/
  if(path==='/'){
    response.setHeader('Content-Type', 'text/html;charset=utf-8')
    response.write(`
    <!DOCTYPE html>
    <head>
    <link rel="stylesheet" href="/style" method="get">    
    </head>
    <h1>你好,请登录</h1>
    <form action="/login">
    <input type="password" name="password">
    <input type="submit">
    </form>  
    `)
    response.end()
  }else if(path === '/login'){
    console.log(request.headers['cookie']);
    response.setHeader('Content-Type', 'text/html;charset=utf-8')
    if(query.password=="fff"){
      response.setHeader('Set-Cookie', 'login=true')
      response.end("您已登录")
    }
    else{
      response.end("密码错了")
    }
  }

  /******** 代码结束，下面不要看 ************/
})

server.listen(port)
console.log('监听 ' + port + ' 成功\n请打开 http://zhq.com:' + port)