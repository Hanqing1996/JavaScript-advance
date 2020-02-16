#### [函数](https://github.com/Hanqing1996/JavaScript-advance/tree/master/%E4%BD%A0%E7%9C%9F%E7%9A%84%E6%87%82%E5%87%BD%E6%95%B0%E5%90%97)
* return 的坑
* 几道关于函数和对象的面试题目
* if(temp=1+2) 不是判断temp是否等于3
* 函数不一定总有返回值
* var和let
* function.length:返回函数在声明时的参数个数
* 词法分析树:一个函数所能访问的变量在函数定义时就已经决定了 
* 变量提升 
* js的预编译和解释执行
* 函数的callstack 
* this 
* 对象内部的 this 和 Class 内部的 this
* Class 内部的箭头函数可以用来保存该类
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

#### [事件](https://github.com/Hanqing1996/JavaScript-advance/blob/master/%E4%BA%8B%E4%BB%B6/README.md)
* [手动触发事件](https://github.com/Hanqing1996/JavaScript-advance/blob/master/%E5%85%B6%E5%AE%832/event.html)
* 事件冒泡
* 浏览器窗口事件
    * resize：调整文档视图大小时触发
    * scroll：


#### [面向对象](https://github.com/Hanqing1996/JavaScript-advance/tree/master/%E9%9D%A2%E5%90%91%E5%AF%B9%E8%B1%A1)
* 对象转字符串（序列化）
* 字符串转对象（反序列化）
* 为什么后端给前端传的是字符串而非对象
* 'age' in obj
* person2 = {name:"rick"};重新开辟内存空间给person2
* arr.indexOf(obj)
* 为已有的类添加公共属性
* let obj={} obj.age={} 内存变化
* obj.age.type/undefined 与 obj.age.type.required/error
* {sayHi(){console.log('h1')}}
* Object.freeze()
* Object.defineProperty()与get/set的区别
* 关键字的概念
* Object的属性遍历
* enumerable:设置某个属性是否可被遍历到
* 【面试】实现a===1&&a===2&&a===3
* undefined的本质是window的只读属性
* 设置对象的只读属性
* configurable
* obj['name']=12   obj[name]=12/为对象添加键值对   obj={[name]:12}  obj={name:12}为空对象添加键值对
* var obj={a,b,c}
* var obj={sayHi(){}}
* get与set
* 如何生成一个空对象
* object
* object的存储
* Object.keys(obj):遍历对象属性
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
* [...arr] 是 arr 的深拷贝吗
* 交换两个数的值
* join
* splice:删除
* slice:切片
* shift:删除第一个元素
* unshift:头部插入元素
* sort
* 对象数组按某个字段排序
* forEach 实现列表更新
* [常用]map
* 用 map 和 sort 判断两个数组的元素id是否完全一致
* filter
* 对象数组移除某个元素：copy = copy.filter(item => item.id !== targetId)
* 用redue实现map
* 用reduce实现filter
 

#### [字符串](https://github.com/Hanqing1996/JavaScript-advance/tree/master/%E5%AD%97%E7%AC%A6%E4%B8%B2)
[教程](https://xiedaimala.com/tasks/05ad6931-9101-4c43-8810-893e787efb5f/video_tutorials/dafabdb1-724f-43c7-8b66-3b8037d3363e)
* 包含空格和回车的字符串
* 模板字符串`${str}`
* 函数接字符串
* 为什么字符串不应该作为函数参数
* split()


#### [其它1](https://github.com/Hanqing1996/JavaScript-advance/tree/master/%E5%85%B6%E5%AE%831)
* 用setTimeout模拟setInterval
* 清除页面定时器:window.clearInterval(timerId)
* export
* 默认值设置 num=num||1
* 7/3结果为小数
* 6种数据类型
* if(a=b)
* 6个假值
* a=1不一定是声明了一个全局变量
* var可以重复声明 
* let不存在变量提升
* let不可以重复声明
* const在声明时就必须赋值,不可以重复声明,不可以重复赋值
* const服从块级作用域
* for循环细节
* for循环与let
* 处理默认参数
* 剩余参数
* ...
* {...obj1}深拷贝
* var {name}={name:'libai'}
* function createToast({propsData}){}  和 createToast( {propsData: toastOptions})
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
* 【ES6】块级作用域{}
* 字面量
* unicode(ES6)
* sybmol
* 迭代器
* 生成器(迭代器生成的语法糖)
* for...of(迭代)
* 迭代和遍历
* NaN===NaN返回false
* 4&&9
* undefined&&9
* trim()
* flag1&&flag2&&console.log('flag1　and flag2 all true')
* 将字符串数组中的元素转为Number型，为什么不能直接用ParseInt

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
* 【面试答】cookie和session的区别与联系
* 反向代理
* 为什么入口文件不能加缓存

#### ajax
* 用 ajax 上传并预览图片

#### Chrome
* 切换网络
> 注意每次刷新页面后网络将恢复为 online 状态
![image](https://github.com/Hanqing1996/JavaScript-advance/blob/master/Chrome/GIF/trigger.gif)
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
* 查看本页面cookie(清除cookie也在这里)
![image](https://github.com/Hanqing1996/JavaScript-advance/blob/master/Chrome/GIF/~kka.gif)
* 伪造cookie
![image](https://github.com/Hanqing1996/JavaScript-advance/blob/master/Chrome/GIF/ii2.gif)