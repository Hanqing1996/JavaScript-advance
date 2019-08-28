#### curl -v http://localhost:9999/style.css
显示从发出请求到得到响应的详细过程

#### 用户代理(user agent)
* Chrome
* curl
* 爬虫

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



#### 请求常见的Content-Type
[教程](https://xiedaimala.com/tasks/5c46b237-9763-474c-910b-68ccb123bac8/video_tutorials/8a16c68d-b129-41a9-af1d-eb11c019244a)
* x-www-form-urlencoded([form表单提交](https://github.com/Hanqing1996/JavaScript-advance/blob/master/HTTP/form-demo/index.html))
1. 一般格式
```
xxx=yyy&xxx2=yyy2
```
2. 含有特殊字符(汉字),转换为以%开头的数字
```
xxx=yyy&xxx2=yyy2&xxx3=%E4%BD%A0%E5%A5%BD
```

#### [响应常见的Content-Type](https://github.com/Hanqing1996/JavaScript-advance/blob/master/HTTP/response-Content-Type-demo/server.js)
* html
```
text/html
```
* css
```
text/csss
```
* javascript
```
application/javascript
```
* jsonp
```
application/javascript
```
* json
```
application/json
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
* [用Chrome模拟form请求](https://github.com/Hanqing1996/JavaScript-advance/tree/master/HTTP/form-demo)
![image](https://github.com/Hanqing1996/JavaScript-advance/blob/master/Chrome/GIF/b.gif)
* [用Chrome模拟response的不同ContentType](https://github.com/Hanqing1996/JavaScript-advance/tree/master/HTTP/response-Content-Type-demo)
![image](https://github.com/Hanqing1996/JavaScript-advance/blob/master/Chrome/GIF/b.gif)
* 
