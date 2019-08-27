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
```
vi /etc/hosts
```
#### [用Chrome模拟form请求]()
1. 启动server.js
```
node server.js
```
2. 打开index.html,按F12，点击network,preserve log
3. 按下按钮
4. 选择2.html,点击view parse可以查看请求/响应具体信息

#### get和post的区别
1. get一般没有请求的第4部分，而post有
