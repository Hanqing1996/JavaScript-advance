#### [函数](https://github.com/Hanqing1996/JavaScript-advance/tree/master/%E4%BD%A0%E7%9C%9F%E7%9A%84%E6%87%82%E5%87%BD%E6%95%B0%E5%90%97)
* 函数不一定总有返回值
* 词法分析树 
* 变量提升 
* js的预编译和解释执行
* 函数的callstack 
* this 
* call/apply 
* bind
* 箭头函数
* 柯里化函数
* 浏览器线程
* DOM树的解析和渲染
* js阻塞DOM树解析和渲染
* onload 

#### [异步](https://github.com/Hanqing1996/JavaScript-advance/tree/master/%E5%BC%82%E6%AD%A5)
* 回调
* Promise
* async/await

#### [面向对象](https://github.com/Hanqing1996/JavaScript-advance/tree/master/%E9%9D%A2%E5%90%91%E5%AF%B9%E8%B1%A1)
* Object.defineProperty()与get/set的区别
* 关键字的概念
* Object的属性遍历
* enumerable:设置某个属性是否可被遍历到
* 【面试】实现a===1&&a===2&&a===3
* undefined的本质是window的只读属性
* 设置对象的只读属性
* configurable
* obj['name']=12   obj[name]=12   obj={[name]:12}
* var obj={a,b,c}
* var obj={sayHi(){}}
* get与set
* 如何生成一个空对象
* object
* object的存储
* Object.keys(obj):获取对象索引
* let a=Object.create(b):等价于a.__proto__=b
* __proto__和prototype的区别
* obj与obj.__proto__
* 原型链
* 私有属性与共有属性
* 对构造函数中的this的理解
* 构造函数
* new/create/class
* js的对象和JSON的对象的区别

#### [数组](https://github.com/Hanqing1996/JavaScript-advance/tree/master/%E6%95%B0%E7%BB%84%E6%93%8D%E4%BD%9C)
* Array和Array.prototype
* 伪数组
* [...arguments]
* 交换两个数的值
* join
* slice
* sort
* map
* filter
* 用redue实现map
* 用reduce实现filter
 

#### [字符串](https://github.com/Hanqing1996/JavaScript-advance/tree/master/%E5%AD%97%E7%AC%A6%E4%B8%B2)
[教程](https://xiedaimala.com/tasks/05ad6931-9101-4c43-8810-893e787efb5f/video_tutorials/dafabdb1-724f-43c7-8b66-3b8037d3363e)
* 包含空格和回车的字符串
* 字符串中添加变量
* 函数接字符串
* 为什么字符串不应该作为函数参数


#### [其它1](https://github.com/Hanqing1996/JavaScript-advance/tree/master/%E5%85%B6%E5%AE%831)
* 7/3结果为小数
* 6种数据类型
* if(a=b)
* 6个假值
* a=1不一定是声明了一个全局变量
* var可以重复声明 
* let不存在变量提升
* let不可以重复声明
* const在声明时就必须赋值,不可以重复声明,不可以重复赋值
* for循环细节
* for循环与let
* 处理默认参数
* 剩余参数
* ...
* {...obj1}深拷贝
* var {name,age,male}=per
* var p={per}
* {name:xingming}
* {child:{name}}
* {name='libai'}
* [a=0,b=9]=[1]
* [a, ,b]=[1,2,3]
* 深度拷贝
* 浅拷贝
* Object.assign
* 【面试答】JSON.parse(JSON.stringif(data))可以实现深度拷贝
* 如何实现复杂对象的深度拷贝

#### [其它2](https://github.com/Hanqing1996/JavaScript-advance/tree/master/%E5%85%B6%E5%AE%832)
* 字面量
* unicode(ES6)
* sybmol
* 迭代器
* 生成器(迭代器生成的语法糖)
* for...of(迭代)
* 迭代和遍历

#### [HTTP](https://github.com/Hanqing1996/JavaScript-advance/tree/master/HTTP)
* curl -v
* 代理(agent)
* jsonp
* 为hosts设置(伪造的)域名
* get和post的区别
* application/x-www-form-urlencoded
* 请求的组成
* 响应的组成
* 请求和响应的Content-Type
* 常见的Content-Type
* HTTP缓存
* Etag
* 304
* cookie
* session
* 面试答】cookie和session的区别与联系
* 反向代理

#### Chrome
* Preserve log:记录每次页面重新加载后的页面资源下载情况
![image](https://github.com/Hanqing1996/JavaScript-advance/blob/master/Chrome/GIF/dd.gif)
* 查看请求/响应头部,查看response内容
![image](https://github.com/Hanqing1996/JavaScript-advance/blob/master/Chrome/GIF/b.gif)
* 增加method选项
![image](https://github.com/Hanqing1996/JavaScript-advance/blob/master/Chrome/GIF/c.gif)
* 在Chrome中运行js代码
![image](https://github.com/Hanqing1996/JavaScript-advance/blob/master/Chrome/GIF/e.gif)
* 查看资源体积大小和下载时间
![image](https://github.com/Hanqing1996/JavaScript-advance/blob/master/Chrome/GIF/e17.gif)
* 查看dom内容加载完毕时间(用户可以看到页面内容，但有些图片还没被加载出来)和资源下载完毕时间(所有下载成功的图片都被看到)
![image](https://github.com/Hanqing1996/JavaScript-advance/blob/master/Chrome/GIF/e21.gif)
* 设置缓存
![image](https://github.com/Hanqing1996/JavaScript-advance/blob/master/Chrome/GIF/e23.gif)
* Disable cache:清除当前页面缓存
![image](https://github.com/Hanqing1996/JavaScript-advance/blob/master/Chrome/GIF/dd2.gif)
* 查看本页面cookie
![image](https://github.com/Hanqing1996/JavaScript-advance/blob/master/Chrome/GIF/~kka.gif)
* 伪造cookie
![image](https://github.com/Hanqing1996/JavaScript-advance/blob/master/Chrome/GIF/ii2.gif)