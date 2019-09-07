var http = require('http')
var fs = require('fs')
var url = require('url')
var port = process.argv[2]

if(!port){
  console.log('请指定端口号好不啦？\nnode server.js 8888 这样不会吗？')
  process.exit(1)
}

const session={}

var server = http.createServer(function(request, response){

/**
 * 每刷新一次页面或在地址栏按下一次回车,下面的代码就会执行一次 
 */
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
    let cookie=request.headers['cookie'] // sessionid=????
    let login=false
    if(cookie){
      
      let sessionId=cookie.split("=")[1] // ????

      if(session[sessionId]&&session[sessionId].login===true){
        login=true;
      }
    }
    
    let html=`
    <!DOCTYPE html>
    <h1>__hi__</h1>
    <form action="/login">
    <input type="password" name="password">
    <input type="submit">
    </form>  
    `
    if(login){
      html=html.replace('__hi__','您好，登录用户')
    }else{
      html=html.replace('__hi__','您好，请登录')
    }
    response.write(html)
    response.end()
  }else if(path === '/login'){

    response.setHeader('Content-Type', 'text/html;charset=utf-8')
    if(query.password=="fff"){

      let random=Math.random()
      response.setHeader('Set-Cookie', `sessionid=${random}`)
      session[random]={login:true}

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