#### createServer
```
var server = http.createServer(function(request, response){
    /**
     * 每刷新一次页面或在地址栏按下一次回车,这里的代码就会执行一次 
     */
})
```

#### 获取首部字段
```
// 获取响应首部字段
response.getHeader('cache-control')

// 获取请求首部字段
request.headers['Cookie']
```

#### 启动server.js
```
node server.js 9999
```
#### 访问“http://zhq.com:9999/”时，style资源的Requset.Header出现“Provisional headers are shown“
直接访问http://zhq.com:9999/style

#### curl -v http://localhost:9999/style.css
显示从发出请求到得到响应的详细过程


#### 代理(agent)
* 作用：满足特定功能的proxy,比如加速访问、内容缓存、内容过滤、信息加密(用代理过滤内容实现“墙”，用信息加密的代理实现“翻墙”-代理与代理之间的战争)

#### jsonp
* 语法
```
fn({"name":"libai"})
```

#### 为hosts设置(伪造的)域名
1. 打开hosts文件
```
vi /etc/hosts
```
2. 在首行加入域名
```
127.0.0.1 zhq.com
```

#### get和post的区别
1. get一般没有请求的第4部分，而post有

#### 请求的组成
* 请求包括四部分,其中第1,2部分被称为请求头,第4部分被称为请求体
1. 方法、路径、协议版本，使用空格分割
```
GET /user/info HTTP/1.1
```
2. [一堆键值对](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Headers)
```
Accept: 接受的返回格式(*/* 表示接受任何格式)
Accept-Encoding：接受的请求编码
Accept-Language：接受的语言
if-None-Match:条件请求
Content-Type 请求体的格式
```
3. 回车，作用只有一个：分隔开第二部分和第四部分
4. 随便什么内容都可以，内容的格式必须要第二部分里用 Content-Type 说明

#### 响应的组成
* 响应包括四部分
1. 协议/版本号 状态码 状态信息
```
HTTP/1.1 404 Not Found
```
2. 一堆 key: value，用回车分割
```
Server 服务器信息
Etag:将资源以字符串形式唯一标识
Content-Type 响应内容的格式
Cache-Control:缓存策略
```
3. 回车，作用只有一个：分隔开第二部分和第四部分
4. 随便什么内容都可以，内容的格式必须要第二部分里用 Content-Type 说明

#### 请求和响应的Content-Type
1. 请求的Content-Type在请求的第二部分指定;响应的Content-Type在响应的第二部分指定
2. 请求虽然指定了Content-Type,但是可能没有第四部分(get没有,post有)，因为服务端请求资源不一定需要发送什么具体的内容
* 以post形式发送的form请求会在第4部分放入input.value等内容，且需要指定Content-Type为application/x-www-form-urlencoded
3. 响应的Content-Type作用是告诉浏览器，应该以什么格式和编码解析服务器返回的字符串
* 比如在[server.js](https://github.com/Hanqing1996/JavaScript-advance/blob/master/HTTP/response-Content-Type-demo/server.js)中,如果去掉
```
response.setHeader('Content-Type', 'text/html;charset=utf-8') // text/html是格式,charset=utf-8是编码
```
则浏览器显示
```
鎴戞槸涓€涓猟iv
```

#### application/x-www-form-urlencoded
1. 是Content-Type的一种，form提交时的请求体Content-Type即为application/x-www-form-urlencoded
2. 一般格式
```
xxx=yyy&xxx2=yyy2
```
3. 含有特殊字符(汉字),转换为以%开头的数字
```
xxx=yyy&xxx2=yyy2&xxx3=%E4%BD%A0%E5%A5%BD
```

#### 常见的Content-Type
* html
```
text/html
```
* xml
```
text/xml application/xml text/xml+html
```
* 纯文本("你请求的资源不存在")
```
text/plain
```
* css
```
text/css
```
* javascript
```
text/javascript application/javascript
```
* jsonp
```
application/javascript
```
* json
```
text/json application/json
```
* jpeg
```
image/jpeg
```
* gif
```
image/gif
```

#### [HTTP缓存](https://xiedaimala.com/tasks/5c46b237-9763-474c-910b-68ccb123bac8/video_tutorials/292ecffa-86e3-4300-b44c-3ebe56e9e424)
* Catche-Control(Response才有,Request没有)
```
response.setHeader('Cache-Control', 'max-age=3600')
```
不需要删除
 在node.js诞生以前，前端使用时间戳/版本号来实现1中的random
```
/style?t=20180518164444
/style1?t=20180628164434
```
缺点:粒度可能不够细，手动修改容易出错
 用 MD5重命名
```
fileName_一个Hash值(用webpack生成该文件MD5的前8位)
```
* 清除缓存:用Disable Cache

#### [Etag](https://xiedaimala.com/tasks/5c46b237-9763-474c-910b-68ccb123bac8/video_tutorials/292ecffa-86e3-4300-b44c-3ebe56e9e424)
* Etag的作用是:通过设置本次response.Etag为"Frank",可以使得下次request.If-None-Match为"Frank"
```
let ifNoneMatch=request.headers['if-none-match']; 

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
```
1. 第一次请求与响应
```
request.If-None-Match:undefined
response.Etag:Frank

// 服务器下载对应资源给客户端
```
2. 第二次请求与响应
```
request.If-None-Match:Frank
response.Etag:Frank

// 服务器不下载对应资源给客户端。而是让客户端自己从缓存中拿资源
```
* Etag和Cache-Control的区别
```
Etag每次都会向服务器询问资源是否有更新，校验request.if-none-match与response.Etag是否匹配，不匹配时才下载更新后的资源；
Cache-Control在max-age时间内后,不会再询问服务器资源是否有更新，每次响应的资源直接从缓存中拿
```
* Etag的值由MD5来设置
```
/**
 * 更新资源
 */
updatedResource=`
    h1{color:red}
`
let newEtag=md5(updatedResource) // 生成newEtag

/**
 * 根据request.if-none-match与response.Etag来判断是从服务器下载资源还是从缓存拿资源
 */
let oldIfNoneMatch=request.headers['if-none-match']; // 旧(上次requset的)if-none-match

if(oldIfNoneMatch===newEtag){
      response.statusCode=304 // 304:服务器说"你要代号为Frank的资源?你要的资源没有发生更新，我不给你，你自己从缓存中取吧"
      response.end()
    }else{
      response.setHeader('Content-Type', 'text/css;charset=utf-8')
      response.setHeader('Etag', newEtag) // 
      response.write(updatedResource)
      response.end()
    }
```

#### 304
```
304 Not Modified：此状态码适用于客户端发送了一个有条件的请求（ If-Match，If-ModifiedSince，If-None-Match，If-Range，If-Unmodified-Since ）。比如客户端想获取某个资源，并且是在XXX时间修改过的新的资源，如果这个资源没有修改，服务端就返回304给客户端。
```

#### [cookie](https://github.com/Hanqing1996/JavaScript-advance/tree/master/HTTP/cookie-demo)
* 登录网站后，刷新之后还处于登录状态，就需要cookie
* cookie的作用是:通过设置本次response.Set-Cookie为"login=true",可以使得下次request.Cookie为"login=true"
```
response.setHeader('Set-Cookie', 'login=true')
```
1. 第一次请求与响应(用户登录)
```
request.Cookie:undefined
response.Set-Cookie:login=true
```
2. 第二次请求与响应(展示用户信息)
> 服务器在收到 HTTP 请求头数据之后，就会查找请求头里面的“Cookie”字段信息，当查找到包含login=true的信息时，服务器查询后台，并判断该用户是已登录状态，然后生成含有该用户信息的页面数据，并把生成的数据发送给浏览器。浏览器在接收到该含有当前用户的页面数据后，就可以正确展示用户登录的状态信息了。
```
request.Cookie:login=true
response.Set-Cookie:login=true
```
* cookie是可以被伪造的
* cookie是一个字符串，不是对象
```
response.setHeader('Set-Cookie', 'sessionid=A36TY89')
let cookie=request.headers['cookie'] // 'sessionid=A36TY89'
```
* 清除cookie
chrome->Application->cookie->Clear All

#### [session](https://github.com/Hanqing1996/JavaScript-advance/tree/master/HTTP/session-demo)
* session是cookie的升级版(避免用户伪造cookie,又能唯一标识用户)
```
// session是一个对象，有若干个键值对，键(足够复杂，无法人为伪造)存于cookie中
let random=Math.random()
response.setHeader('Set-Cookie', `sessionid=${random}`)
session[random]={login:true}
```
* 在实现seesion的流程上,[逻辑](https://github.com/Hanqing1996/JavaScript-advance/tree/master/HTTP/session-demo)很简单,关键在于将session的键存在cookie中，然后在首页('/')通过cookie来判断session对应键的值是否存在及正确

#### 【面试答】cookie和session的区别与联系
1. 作用上：cookie用于唯一标识一个用户(作用在于“标识”，“区分”用户)；session用于记录用户的某些信息(作用不在于“标识”,在于记录密码,是不是VIP,购物车数量等)
2. 原理上：cookie是HTTP协议层面的东西,通过设置本次response.Set-Cookie(HTTP的一个API)来影响下次的request.cookie;session与cookie无关，是后端框架通过某种方式来实现的
3. 存储：cookie存在浏览器上,session存在服务器的某个地方(文件，数据库)
4. 二者关系：session一般是基于cookie的,也可以基于localStorage(每次发送请求时,请求的头部不会从浏览器里取cookie)

#### [反向代理](https://xiedaimala.com/tasks/5c46b237-9763-474c-910b-68ccb123bac8/video_tutorials/0e744a43-2679-4fcb-a79b-5311850b6acf)
* 什么是反向代理:代理服务器的代理(代理客户端的代理叫做正向代理)
![img](https://github.com/Hanqing1996/JavaScript-advance/blob/master/HTTP/Img/2019-09-07%2016-20-24%E5%B1%8F%E5%B9%95%E6%88%AA%E5%9B%BE.png)
* nginx实现反向代理
![img](https://github.com/Hanqing1996/JavaScript-advance/blob/master/HTTP/Img/nginx%E5%AE%9E%E7%8E%B0%E5%8F%8D%E5%90%91%E4%BB%A3%E7%90%86.png)


#### 为什么入口文件不能加缓存
* [参考1(18:00开始)](https://xiedaimala.com/tasks/5c46b237-9763-474c-910b-68ccb123bac8/video_tutorials/292ecffa-86e3-4300-b44c-3ebe56e9e424)
* [参考2](https://xiedaimala.com/tasks/3b5ffe52-ff02-47e3-96b2-690871b1d792/video_tutorials/d9d21fc5-0d37-478f-b00b-c3bca86d1a14)
* 关键
1.　html,css,js都是资源,最初都是发送请求从服务器端获得的
2.　入口文件的作用是引入其它资源,将入口文件缓存就丧失了更新其它资源的机会
* [浏览器设置:入口文件(第一个请求的文件)总是需要向服务器请求获取的](https://github.com/Hanqing1996/JavaScript-advance/blob/master/HTTP/GIF/a.gif)



#### [用Chrome学习HTTP](https://xiedaimala.com/tasks/5c46b237-9763-474c-910b-68ccb123bac8/video_tutorials/8a16c68d-b129-41a9-af1d-eb11c019244a)
* [用Chrome查看form请求](https://github.com/Hanqing1996/JavaScript-advance/tree/master/HTTP/form-demo)
![image](https://github.com/Hanqing1996/JavaScript-advance/blob/master/HTTP/GIF/e9.gif)
* [用Chrome查看response的不同ContentType](https://github.com/Hanqing1996/JavaScript-advance/tree/master/HTTP/response-Content-Type-demo)
![image](https://github.com/Hanqing1996/JavaScript-advance/blob/master/HTTP/GIF/e12.gif)
* [请求html和css](https://github.com/Hanqing1996/JavaScript-advance/tree/master/HTTP/html-css-demo)

**注意：对于Chrome而言，link(script)的优先级高于我们在server.js中指定的Content-Type.**
**如果我们在server.js设置<link rel="stylesheet" href="/main">，但main的Content-Type指定为application/javascript。则Chrome将会把main内容解析为css而非js,同时提出warning: Resource interpreted as Stylesheet but transferred with MIME type application/javascript**

![image](https://github.com/Hanqing1996/JavaScript-advance/blob/master/HTTP/GIF/e15.gif)
* [请求html和js](https://github.com/Hanqing1996/JavaScript-advance/tree/master/HTTP/html-js-demo)
![image](https://github.com/Hanqing1996/JavaScript-advance/blob/master/HTTP/GIF/e16.gif)
* [同一path下，根据不同query返回不同结果](https://github.com/Hanqing1996/JavaScript-advance/tree/master/HTTP/path%E4%B8%8Equery-demo)
![image](https://github.com/Hanqing1996/JavaScript-advance/blob/master/HTTP/GIF/h2.gif)

