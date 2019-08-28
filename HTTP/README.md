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


#### 响应的Content-Type作用
* 作用是告诉浏览器，应该以什么格式和编码解析服务器返回的字符串
* 比如在[server.js](https://github.com/Hanqing1996/JavaScript-advance/blob/master/HTTP/response-Content-Type-demo/server.js)中,如果去掉
```
response.setHeader('Content-Type', 'text/html;charset=utf-8') // text/html是格式,charset=utf-8是编码
```
则浏览器显示
```
鎴戞槸涓€涓猟iv
```

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
* [请求json](https://github.com/Hanqing1996/JavaScript-advance/tree/master/HTTP/%E8%AF%B7%E6%B1%82json-demo)



