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
    <link rel="stylesheet" href="/style">    
    </head>
    <h1>你好</h1>
    `)
    response.end()
  }else if(path === '/style'){
    // response.setHeader('Cache-Control', 'max-age=3600')
    // console.log(`cache-control:${response.getHeader('cache-control')}`);

    request.headers

    let ifNoneMatch=request.headers['if-none-match'];
    console.log(ifNoneMatch);
    if(ifNoneMatch==='Frank'){
      response.statusCode=304
      response.end()
    }else{
      response.setHeader('Content-Type', 'text/css;charset=utf-8')
      response.setHeader('Etag', 'Frank')
      response.write(`
        h1{color:black;}
      `)
      response.end()
    }
  }
  /******** 代码结束，下面不要看 ************/
})

server.listen(port)
console.log('监听 ' + port + ' 成功\n请打开 http://zhq.com:' + port)