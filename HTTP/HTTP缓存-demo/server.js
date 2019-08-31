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
    console.log('you ask server for html resource')
    response.write(`
    <!DOCTYPE html>
    <head>
    <link rel="stylesheet" href="/style">  
    </head>
    <h1>你好</h1>
    <script src="/script"></script>
    `)
    response.end()
  }else if(path === '/style'){
    response.setHeader('Content-Type', 'text/css;charset=utf-8')
    response.setHeader('Cache-Control', 'max-age=3600')
    console.log('you ask server for style resource')
    response.write(`
      h1{color:red;}
    `)
    response.end()
  }else if(path === '/script'){
    response.setHeader('Content-Type', 'application/javascript;charset=utf-8')
    console.log('you ask server for script resource')
    response.write(`
      console.log('我是js')
    `)
    response.end()
  }

  /******** 代码结束，下面不要看 ************/
})

server.listen(port)
console.log('监听 ' + port + ' 成功\n请打开 http://zhq.com:' + port)