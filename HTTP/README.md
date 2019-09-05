#### 启动server.js
```
node server.js 9999
```

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
2. 一堆键值对
```
Host 指明请求的地址
Server 服务器信息
Content-Type 请求体的格式,如 xxx/www-url-encoded-form-data application/json
Accept: 接受的返回格式(*/* 表示接受任何格式)
Accept-Encoding：接受的请求编码
Accept-Language：接受的语言
Pragma：兼容http1.0的缓存
Cache-Control:缓存策略
Via:走过的服务器链路信息
Use-agent:curl/chrome
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
Content-Type: text/html;charset=utf-8
Date: Tue, 27 Aug 2019 10:28:00 GMT
Connection: keep-alive
Transfer-Encoding: chunked
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
* 设置缓存的方式
```
    response.setHeader('Cache-Control', 'max-age=3600') // 设置缓存为3600秒(业界一般设置为10年)
```
* 有了缓存，浏览器就不必向服务器请求资源，只需要从磁盘/内存中读取资源即可，用户看到图片的速度会变快
* 资源更新后，需要将浏览器由从缓存中读取资源，改为向服务器请求资源，该怎么做?
1. 在path不变(这样才能保证请求的资源正确)的前提下修改href(修改query) 
在[server.js](https://github.com/Hanqing1996/JavaScript-advance/tree/master/HTTP/HTTP%E7%BC%93%E5%AD%98-demo)中，将
```
    <link rel="stylesheet" href="/style">  
```
修改为
```
    <link rel="stylesheet" href="/style?random=12">  
```
注意
```
response.setHeader('Cache-Control', 'max-age=3600')
```
不需要删除
2. 在node.js诞生以前，前端使用时间戳/版本号来实现1中的random
```
/style?t=20180518164444
/style1?t=20180628164434
```
缺点:粒度可能不够细，手动修改容易出错
3. 用 MD5重命名
```
fileName_一个Hash值(用webpack生成该文件MD5的前8位)
```
4. 


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

