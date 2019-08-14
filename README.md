* [从浏览器多进程到JS单线程，JS运行机制以及浏览器渲染过程最全面的一次梳理](https://zhuanlan.zhihu.com/p/33230026)
* [Chrome performance](https://zhuanlan.zhihu.com/p/29879682)

# 函数

#### var和let
* var
```
 for(var i=0;i<5;i++)
 {
     setTimeout(()=>{console.log(i);},1000);
 }
```
* let
```
for(let i=0;i<5;i++)
{
    setTimeout(()=>{console.log(i);},1000);
}
```


#### function.length
返回函数在声明时的参数个数
```
function fn(a,b,c){}

console.log(fn.length); // 3
```

#### 词法分析树
* [介绍](https://xiedaimala.com/tasks/f3b7885d-ac51-4c41-a498-d01d532cc651/video_tutorials/76247167-7764-4c49-bf78-53b4d126da7a)
* 作用
确定当前函数能访问哪些变量

#### 变量提升
1. 所有的声明都会被提升到当前作用域的最顶端
2. 编译器在遇到var a的时候，会询问作用域是否已经有一个该名称的变量存在于同一个作用域，如果有，编译器会忽略该声明，继续进行编译；否则它会要求作用域在当前作用域的集合中声明一个新的变量，并命名为 a
3. 编译器在遇到function a{}的时候，不会有类似3的现象
```
function fn(a){ // 参数a为局部变量

    function a(){ // 局部变量a的值被修改为一个函数
        console.log('I am a');
    }

    var a; // 声明无效
    console.log(a); // [Function: a]
}

fn(10)
```
4. 函数声明优先于变量声明

#### 函数参数是局部变量
```
function a(i) // 这里的参数i是局部变量 
{
    var i; // 定义一个同名的局部变量 i，由于之前已经存在局部变量i, 此声明无效
    alert(i);
};
a(10);
```
#### js的预编译(声明)和解释执行(运行)
* [参考](https://zhuanlan.zhihu.com/p/55581736)
* [code]()
* 我对预编译(声明)和解释执行(运行)的理解
1. 函数是关键，所有代码可以看作运行在一个全局函数(windows)中.声明发生在函数执行前，运行发生在函数的执行过程中
2. 每遇到一个函数，就发生一次声明和运行，函数的调用次序遵照[call stack](https://xiedaimala.com/tasks/f3b7885d-ac51-4c41-a498-d01d532cc651/video_tutorials/6e3cd39b-c322-4bfb-83b9-d926c7072929)

#### call stack
call stack存放的是函数调用的入口(当前位置)

#### this
1. this这个概念只与函数有关,常见的有如下场景
```
function f(){
    console.log(this) // 对函数f的this进行操作
}

f.call({name:'libai'}) //为函数f指定this
```
2. 一个无聊的语法糖
```
var person={
    sayHi:function(){
        console.log('say hi');
    }
}

person.sayHi(); // 等效于person.sayHi.call(person);
```
但是注意
```
window.n = 'window name'
var obj = {
    n: 'obj name',
    sayN(){
        console.log(this.n)
    }
}

var fn = obj.sayN
fn()

// window name
```
3. call的参数有两个:call(this,arg[0],arg[1],arg[2]...arg[n]).其中this是一个对象,默认为window(在浏览器中,非严格模式下),其它参数构成数组arguments
```
function f(){
    console.log(this)
    console.log(arguments)
}
f.call() // window
f.call({name:'frank'}) // {name: 'frank'}, []
f.call({name:'frank'},1) // {name: 'frank'}, [1]
f.call({name:'frank'},1,2) // {name: 'frank'}, [1,2]
```
4. fn.call()的this不一定是window
对于
```
function fn(){
    console.log(this);
}

fn().call();
```
* Node.js环境下
```
function fn(){
    console.log(this);
}

fn.call(); // global
```
* 浏览器 use strict
```
function fn(){
    'use strict'
    console.log(this);
}

fn.call(); // undefined
```
5. 注意区别
```
f()等价于f.call('undefined')

person.sayHi()等价于person.sayHi.call(person)
```
6. this 是参数，所以，只有在调用的时候才能确定
```
person.sayHi.call({name:'haha'})  // 这时函数sayHi的this就不是person了
```
7. [为什么需要this](https://github.com/Hanqing1996/JavaScript-advance/blob/master/%E4%BD%A0%E7%9C%9F%E7%9A%84%E6%87%82%E5%87%BD%E6%95%B0%E5%90%97/%E4%B8%BA%E4%BB%80%E4%B9%88%E9%9C%80%E8%A6%81this.js)
8. this的意义在于为函数指定一个依附的对象，但实际上不是所有函数都需要一个依附的对象(比如求和函数)

#### call与apply
1. 唯一的区别在于参数
```
f.call(this,arg[0],arg[1]...arg[n])

f.apply(this,arr) // arr为数组
```
2. 1决定了apply可以处理不定长数组，call不可以
3. 例子：[求和](https://github.com/Hanqing1996/JavaScript-advance/blob/master/%E4%BD%A0%E7%9C%9F%E7%9A%84%E6%87%82%E5%87%BD%E6%95%B0%E5%90%97/call%E4%B8%8Eapply.js) 


#### bind
* bind的适用场景是fn2函数需要复制fn函数的内容，且要求fn2函数在调用时this值固定为某个对象
```
// 令函数fn2的内容等于函数fn,且函数fn2在通过call()调用时this值固定为obj
fn2=fn.bind(obj)
```
* 一旦fn2通过bind被绑定了this,call()就无法通过参数来修改this了
```
var young={age:16}
var old={age:77}

function fn()
{
    console.log('I am '+this.age);
}

var fn2=fn;

fn2.call() // I am undefined
fn2.call(old) // I am 77


fn2=fn.bind(young); //绑定fn2的this

fn2.call() // I am 16
fn2.call(old) // I am 16
```
* 一段看起来很复杂的代码
```
bindEvents:function(){
    this.element.onclick=this.onclick.bind(this);
}
```
其中,this是函数bindEvents在call()时的第一个参数(对象形式),this.element是一个对象,this.onclick是一个函数

#### 高阶函数
* 定义:满足以下至少一个条件的函数()
1. 接受一个或多个函数作为输入：forEach sort map filter reduce
2. 输出一个函数：bind curry
* 作用:组合函数
```
arr=[1,2,3,4,5,6,7,8];

even_arr=arr.filter(n=>n%2==0);
even_sum=even_arr.reduce((sum,cur)=>sum+cur,0)

console.log(even_sum);
```

#### 构造函数
```
function Person(name,age)
{
    // 设置this的字段值
    this.name='li';
    this.age=13;

    // 返回修改后的this对象
    return this;
}

var per=Person.call({},'li',13);

console.log(per);// { name: 'li', age: 13 }
```
语法糖
```
function Person(name,age)
{
    this.name='li';
    this.age=13;
}

var per=new Person('li',13);

console.log(per);// { name: 'li', age: 13 }
```
#### 箭头函数
* 语法
1. 内容只有一句话，不用加{},若有返回值，不用写return
```
var fn=(i,j)=> i+j;
```
2. 内容超过两句话，加{},若有返回值，要写return
```
var fn=(i,j)=>{console.log(i+j);return i+j;};
```
* 箭头函数没有this
```
setTimeout(function(){
    console.log(this);

    setTimeout(function(){
        console.log(this);
    }.bind(this),1000);// 注意这行的this是{name:'liming'}
}.bind({name:'liming'}),1000);

// 结果为{name:'liming'},{name:'liming'}
```
用箭头函数实现如下
```
setTimeout(function(){
    console.log(this);

    setTimeout(()=>console.log(this),1000); //箭头函数没有this,所以这个箭头函数内部的this只是一个变量，值为{name:'liming'}
}.bind({name:'liming'}),1000);

// 结果为{name:'liming'},{name:'liming'}
```
* 强制为箭头函数绑定this呢
```
fn=()=>console.log(this);

fn.call({name:'liming'});

// 结果为window,即强制绑定this失败
```
#### 柯里化函数
* 示例
```
function curry(fn)
{
    return function(p1){
        return function(p2){
            return function(p3){
                return fn(p1,p2,p3);
            }
        }
    }
}

function sum(x,y,z){
    return x+y+z;
}

// 将sum函数curry化
var curried=curry(sum)

var res=curried(1)(2)(3); // 等价于 var res=sum(1,2,3);

console.log(res);// 6
```
* 将上述的curry函数抽象化,大致是这样一个流程
```
function curry(fn){
    
    当前参数个数=0;
    
    if(当前参数个数<fn参数个数)
    {
        当前参数个数++;
        return function(参数1){
            if(当前参数个数<fn参数个数){
                当前参数个数++;
                return function(参数2){
                    ......

                    if(当前参数个数==fn参数个数)
                        fn(参数1,参数2,参数3...参数n)
                }
            }
        }   
    }
}
```
写成递归
```
function curry(fn,已传入参数)
{
    return function(){
        获取新传入参数
        if(新传入参数个数+已传入参数个数<fn参数个数){
            curry(fn,已传入参数+新传入参数)
        }
        else{
            fn.call(undefined,已传入参数+新传入参数)
        }
    }
}
```
写成代码
```
function curry(func , fixedParams){
    if ( !Array.isArray(fixedParams) ) { fixedParams = [ ] } // 初始化
    return function(){
        let newParams = Array.prototype.slice.call(arguments); // 新传的所有参数
        if ( (fixedParams.length+newParams.length) < func.length ) {
            return curry(func , fixedParams.concat(newParams));
        }else{
            return func.apply(undefined, fixedParams.concat(newParams));
        }
    };
}
```
#### 浏览器进程
* 每打开一个新页面，会开启多个浏览器进程
1. 浏览器渲染进程（浏览器内核）（Renderer进程，内部是多线程的）：由多个线程组成
2. 第三方插件进程
3. Browser进程：浏览器的主进程（负责协调、主控）

#### 组成浏览器渲染进程的多线程
1. GUI渲染线程：负责渲染浏览器界面，解析HTML，CSS，构建DOM树和RenderObject树，布局和绘制等。
2. JS引擎线程：
3. 事件触发线程：
4. 定时触发器线程：setTimeout,setInterval
5. 异步http请求线程：

#### DOM树
* 解析
通过解析html元素(按照代码上下顺序)来形成DOM树,当所有html元素解析完毕后,DOM树形成
* 渲染
再解析完毕后，只有当该页面所有script的js代码(setTimeout除外)都运行完毕,DOM树才会开始渲染

#### setTimeout
* [setTimeout们会等到所有script执行完毕后再按顺序执行](https://github.com/Hanqing1996/JavaScript-advance/blob/master/%E5%BC%82%E6%AD%A5/setTimeout%E4%B8%8Escript.html)
* [setTimeout执行时,DOM树一定已经解析完毕(即一定可以在setTimeout执行时读取到DOM元素)](https://github.com/Hanqing1996/JavaScript-advance/blob/master/%E5%BC%82%E6%AD%A5/setTimeout%E4%B8%8EDOM%E6%A0%91%E8%A7%A3%E6%9E%90.html)
* [setTimout执行时,DOM树一定已经渲染完毕(即页面)](https://github.com/Hanqing1996/JavaScript-advance/blob/master/%E5%BC%82%E6%AD%A5/setTimeout%E4%B8%8EDOM%E6%A0%91%E6%B8%B2%E6%9F%93.html)

#### js阻塞DOM树解析和渲染
* [js阻塞DOM树解析](https://github.com/Hanqing1996/JavaScript-advance/blob/master/%E5%BC%82%E6%AD%A5/js%E9%98%BB%E5%A1%9EDOM%E6%A0%91%E8%A7%A3%E6%9E%90.html)
 浏览器按照代码先后顺序解析html元素，形成DOM树。如果遇到script标签，则暂停DOM树的解析，开始运行js代码。
* [js阻塞DOM树渲染](https://github.com/Hanqing1996/JavaScript-advance/blob/master/%E5%BC%82%E6%AD%A5/js%E9%98%BB%E5%A1%9EDOM%E6%A0%91%E6%B8%B2%E6%9F%93.html)
只有当该页面所有script的js代码(setTimeout除外)都运行完毕,DOM树才会开始渲染

#### onload
* 发生在页面资源加载完毕的时候(不是页面渲染完毕的时候)
```
document.getElementsByTagNames('img')[0].onload = function(){
    console.log(this.width) // 宽度不为 0
}
```
# 异步

#### 回调
* 回调的本质
在异步任务结束后调根据任务结果调用相应函数的行为
* 不同场景下的回调
1. Node.js 的 error-first 形式
```
 fs.readFile('./1.txt', (error, content)=>{
     if(error){
         // 失败
     }else{
         // 成功
     }
 })
 ```
2. jQuery 的 success / error 形式
```
 $.ajax({
     url:'/xxx',
     success:()=>{},
     error: ()=>{}
 })
 ```
3. jQuery 的 done / fail / always 形式
```
 $.ajax({
     url:'/xxx',
 }).done( ()=>{} ).fail( ()=>{} ).always( ()=> {})
```

#### catch-语法糖
```
 axios({
     url:'xxx',
     async:true,
 }).then( ()=>{
 }, ()=>{
   console.log('失败1')
   return Promise.reject('e1 can not deal it')
 }).then(()=>{  // 注意这里then只包含一个函数
 }).catch((e)=>{
   console.log('I catch it')
   console.log(e) // e1处理失败的原因
 })

/**
 * 输出:
 * 失败1
 * I catch it
 * e1 can not deal it
 */
```
等价于
```
 axios({
     url:'xxx',
     async:true,
 }).then( ()=>{
 }, ()=>{
   console.log('失败1')
   return Promise.reject('e1 can not deal it')
 }).then(()=>{
 },(e)=>{
   console.log(e) // e1处理失败的原因
 })

/**
 * 输出:
 * 失败1
 * e1 can not deal it
 */
```
#### 自己实现的回调
```
function buyfruit(fn){ // fn即回调函数

    setTimeout(() => { 

        // 在这里执行任务

        // 异步任务执行完毕，开始根据结果调用相应函数
        if(Math.random()>0.5){

            // 执行回调函数
            fn.call(undefined,"买到的苹果")
        }
        else{

            // 执行回调函数
            fn.call(undefined,new Error)
        }
    }, (Math.random+0.5)*1000);
}

// buyfruit(fn),其中fn即为回调函数
buyfruit(function(res){ 

    if(res instanceof Error){
        console.log("没买到苹果");
    }
    else{
        console.log("买到了苹果");
    }
})

/**
 * 输出:
 * 成功1
 * 失败2
 * [object Error] { ... }
 */
```




#### Promise
* Promise和异步没有任何关系,我们可以往Promise内部塞入一个异步任务，但Promise不是异步的，
* Promise不是异步的,resolve(),reject()也不是异步的，只是普普通通的对象和调用方法而已。但是,then()是异步的，会在resolve()或reject()执行完毕后执行
```
function buyFruit(){
    return new Promise((resolve,reject)=>{ // 注意resolve,reject不是回调函数
        setTimeout(()=>{
            resolve('apple') // s1执行,接下来将执行s2
        },10000)
    })
}

var pro=buyFruit() 

pro.then(s=>console.log(s))

// 10秒后输出apple

// prom会立即被赋值为PromiseValue=undefined的Promise对象,但直到10秒后prom变为PromiseValue=undefined的Promise对象，才会执行then()
```
* Promise是一个对象，不是一个函数
```

// 下面这句等价于var promise=Promise.resolve("1");
var promise=new Promise(resolve=>resolve('1')) // promise是一个对象

var promise2=promise.then() // 对象promise执行了then方法,返回了一个新对象,所以promise2是一个对象

promise2.then(s=>console.log(s)) // 对象promise2执行了then方法

// 输出1
```
* promise的局限
promise的作用只是规范了回调,使[回调变得可控](https://zhuanlan.zhihu.com/p/22782675),避免了回调地狱的出现，但并没有消除回调
* Promise函数顺序问题
1. s1处理成功引发s2
```
 axios({
     url:'.',
     async:true,
 }).then( ()=>{
   console.log('成功1')
 }, ()=>{
   console.log('失败1')
 }).then(()=>{
   console.log('成功2')
 },()=>{
   console.log('失败2')
 })

/**
 * 输出:
 * 成功1
 * 成功2
 */
```
2. e1处理成功引发s2
```
 axios({
     url:'xxx',
     async:true,
 }).then( ()=>{
   console.log('成功1')
 }, ()=>{
   console.log('失败1')
 }).then(()=>{
   console.log('成功2')
 },()=>{
   console.log('失败2')
 })


/**
 * 输出:
 * 失败1
 * 成功2
 */
 ```

3. s1处理失败引发e2
```
 axios({
     url:'.',
     async:true,
 }).then( ()=>{
   console.log('成功1')
   处理失败
 }, ()=>{
   console.log('失败1')
 }).then(()=>{
   console.log('成功2')
 },(e)=>{
   console.log('失败2')
   console.log(e) // s1处理失败的原因
 })


/**
 * 输出:
 * 成功1
 * 失败2
 * [object Error] { ... }
 */
 ```
4. e1处理失败引发e2
```
 axios({
     url:'xxx',
     async:true,
 }).then( ()=>{
   console.log('成功1')
 }, ()=>{
   console.log('失败1')
   处理失败
 }).then(()=>{
   console.log('成功2')
 },(e)=>{
   console.log('失败2')
   console.log(e) // e1处理失败的原因
 })


/**
 * 输出:
 * 失败1
 * 失败2
 * [object Error] { ... }
 */
 ```
* Promise中值的传递
1. s1(e1)处理成功,return一个值,则s2可以接受一个参数,参数值等于s1的return值
```
 axios({
     url:'xxx',
     async:true,
 }).then( ()=>{
 }, ()=>{
   return 'e1处理成功'
 }).then((s)=>{
   console.log(s)
 },(e)=>{
 })

/**
 * 输出:
 * e1处理成功
 */
```
2. s1(e1)主动承认处理失败(处理不了),return Promise.reject(''),则e2可以接受一个参数,参数值等于(s1)e1的reject的内容
```
 axios({
     url:'xxx',
     async:true,
 }).then( ()=>{
 }, ()=>{
   console.log('失败1')
   return Promise.reject('e1 can not deal it')
 }).then(()=>{
 },(e)=>{
   console.log('失败2')
   console.log(e) // e1处理失败的原因
 })

/**
 * 输出:
 * 失败1
 * 失败2
 * e1 can not deal it
 */
```
3. s1(e1)处理失败,则e2可以接受一个参数,参数值为s1(e1)的处理失败原因
```
 axios({
     url:'xxx',
     async:true,
 }).then( ()=>{
 }, ()=>{
   console.log('失败1')
   处理失败
 }).then(()=>{
 },(e)=>{
   console.log('失败2')
   console.log(e) // e1处理失败的原因
 })


/**
 * 输出:
 * 失败1
 * 失败2
 * [object Error] { ... }
 */
 ```
* 自己实现的promise
注意这里的then逻辑和上面讲的不一样。上面e1处理成功后会执行s2,而这里e1执行后会执行e2
```
function buyFruit(){
    return new Promise((resolve,reject)=>{ // 注意resolve,reject不是回调函数
        setTimeout(()=>{
            reject('apple') // s1执行,接下来将执行s2
        },10000)
    })
}

var promise=buyFruit()

// 对于promise.then(s2,e2),s2,e2是回调函数
promise.then(()=>{ 
    console.log('成功') // s2
},()=>{
    console.log('失败') // e2
})
```



[理解 JavaScript 的 async/await](https://segmentfault.com/a/1190000007535316)

#### async 
async的作用不是把一个函数变成异步函数(放入event loop到最后执行之类的)，而是会使得后面跟的函数返回一个Promise对象
* async函数返回值
```
async function fn() {
  return '小明';
}

console.log(fn())
fn().then(s => console.log('get'+s)); 

/**
 * 输出:
 * Promise {<resolved>: "小明"}
 * __proto__: Promise
 * [[PromiseStatus]]: "resolved"
 * [[PromiseValue]]: "小明" 
 *
 * get小明
 */
```
等价于
```
var fn=function()
{
    // 等价于Promise.resolve('小明');
    return new Promise(resolve=>resolve('小明'));
}

console.log(fn())
fn().then(s => console.log(s))
```
* async函数不返回值
```
async function fn() {
}

console.log(fn())

/**
 * 输出:
 * Promise {<resolved>: undefined}
 * __proto__: Promise
 * [[PromiseStatus]]: "resolved"
 * [[PromiseValue]]: undefined
 *
 */
```
* 如果async函数本来就返回一个Promise对象,此时async有没有无区别
```
async function fn()
{
    return Promise.resolve('小明');
}

console.log(fn());

/**
 * 输出:
 * Promise {<resolved>: 小明}
 * __proto__: Promise
 * [[PromiseStatus]]: "resolved"
 * [[PromiseValue]]: 小明
 *
 */
```
#### await
* await 后面是可以接普通函数调用或者直接量的
```
function fn()
{
    return 2;
}

var res=await fn()
console.log(res);

// 输出:2
```
* 如果await 后面跟的是Promise的对象，await会获取该Prmose对象 resolve 的值
```
async function testAsync() {
    return Promise.resolve('hh');
}


var v2=await testAsync();

console.log(v2);

// 输出:hh
```
* await的作用在于我们不用写then()了
```
function test() {
    return Promise.resolve('hh');
}

testAsync().then(s=>console.log(s))
```
等价于
```
function test() {
    return Promise.resolve('hh');
}

var s=await test();
console.log(s)
```
* 语法规定：如果一个函数内部有await，该函数前面必须有async
```
function test() {
    const v = await takeLongTime();
    console.log(v);
}

test()

// 报错：Uncaught SyntaxError: await is only valid in async function
```
* await 命令后面的 Promise 对象，运行结果可能是 rejected，所以最好把 await 命令放在 try...catch 代码块中。
```
async function myFunction() {
  try {
    await somethingThatReturnsAPromise();
  } catch (err) {
    console.log(err);
  }
}

// 等价于

async function myFunction() {
  await somethingThatReturnsAPromise().catch(function (err){
    console.log(err);
  });
}
```


#### 我对异步的理解

异步是必需的，因为它能节省时间。
```
var result=asynctask()
console.log(result);
```
这种写法在逻辑流程上是没错的，但是js线程的机制(eventloop)决定了这种流程是实现不了的。事实上这种流程一直没有实现，async,await的出现也只是“看起来”实现了这种流程而已

#### setImmediate()

#### process.nextTick()

# 面向对象

#### 封装
隐藏细节

#### 继承
复用代码

#### 多态
更灵活。一个东西拥有多种东西的属性

#### object
1. 对象
2. 函数
3. 数组

#### object的存储
```
// 在堆内存中开辟一块空间存储object的属性名和属性值,同时栈内存中保存对应地址
var baba={
    name:'Mayun',
    child:{
        name:'Sicong',
        sayName:function (){
            console.log(this.name);
        }
    }
}

baba:A11

// A11内存情况
name:'Mayun'
child:A22

// A22内存情况
name:'Sicong'
sayName:A34

// A34内存情况
{name:sayName,functionBody:'console.log(this.name);'}
```

#### object的原型链
* [toString()是怎么来的](https://xiedaimala.com/tasks/5833c9d4-ebd5-44e4-91b5-661f476f9cad/video_tutorials/ccd79503-4f54-4b31-9f91-6f76f6073722)
* 原型链的优点：省内存

#### protype:公共属性/方法
1. window.Array.protype：数组公共属性/方法
2. window.Function.protype：
3. window.Object.protype：

#### 为何都是object,数组有push方法,而对象没有；函数有console.log方法,而对象没有
```
arr:window.Array.protype(有push方法)->window.Object.protype
fn1:window.Function.protype(有console.log方法)->window.Object.protype
obj1:window.Object.protype
```
#### 函数是一个对象
```
// obj是一个函数，也是一个对象
var obj={
    name:'fn1',
    length:2,
    params:['x','y'],
    functionBody:'console.log("hello world")',
}

// 公共属性/方法
objGongYong={
    call:function(x){

        // eval的作用是执行字符串
        eval(x.functionBody)
    }
}

obj.__proto__=objGongYong

obj.call(obj) // hello world
```


#### 私有属性与共有属性
见作业第三题

#### new
* [教程](https://xiedaimala.com/tasks/5833c9d4-ebd5-44e4-91b5-661f476f9cad/video_tutorials/4312943e-4fd3-4225-97e5-d4f04d6845be)
* [文章](https://zhuanlan.zhihu.com/p/23987456)
* [不用new创造solider]()
* [用new创造solider]()


#### prototype
* Solioder.prototype的作用是在var s=new Solider()时,为对象s指定其__proto__

#### constructor 
* constructor的作用是记录对象是由哪个公共构造函数创建的
```
Solider.prototype = {
  constructor: Solider
}
```
#### 对构造函数中的this的理解
* 是{}

#### 函数Human的两种调用方法
1. 返回对象
```
function Human(color,name){

    this.color=color;
    this.name=name; 
}

var per=new Human('yellow','xiaoming')

console.log(per); // { color: 'yellow', name: 'xiaoming' }
```
等价于
```
function Human(color,name){

    this={};

    this.color=color;
    this.name=name; 

    this.__proto__=Human.prototype;

    return this;
}

var per=new Human('yellow','xiaoming')

console.log(per); // { color: 'yellow', name: 'xiaoming' }
```
2. 不返回对象(此时Huamn就是一个普通的函数，对call时的第一个参数进行一些操作，不是构造函数)
```
// Human就是一个普通的函数!!!不是构造函数!!!
function Human(color,name){

    this.color=color;
    this.name=name; 
}

var per={hobby:'football'};

Human.call(per,'yellow','xiaoming')

console.log(per); // { hobby: 'football', color: 'yellow', name: 'xiaoming' }
```

#### 下面写法会覆盖Solider.prototype，导致constructor丢失
```
Solider.protoype = {
    兵种:"美国大兵",
    攻击力:5,
    行走:function(){ /*走俩步的代码*/},
    奔跑:function(){ /*狂奔的代码*/  },
  }
```
所以正确写法应该是
```
  Solider.prototype.兵种 = "美国大兵"
  Solider.prototype.攻击力 = 5
  Solider.prototype.行走 = function(){ /*走俩步的代码*/}
  Solider.prototype.奔跑 = function(){ /*狂奔的代码*/  }
```
#### new
* new关注的是：什么是共有的，什么是私有的
1. 凡公有的，交给Solider.prototype(公共构造函数constructor、公共属性)
2. 凡私有的，交给Solider，在其中设置私有属性和方法(this.)


#### 构造函数规则
1. 构造函数大写
2. 构造函数省略Create
3. 构造函数若无参数，则不加()
```
new Solider
```

#### 用js模拟继承(__proto__/new/create/class)
* 需求
Solider的基类是Human,用Solider可以得到一个对象s,s具有作为Solider的共有和私有属性,具有作为Human的共有和私有属性
* 漫长的进化
1. [不用new，完全用__proto__实现对象间的继承]()
2. [用new省略对象间的__proto__设置，只设置constructor.prototype.__proto__]()
3. [生产环境不允许使用__proto__，用new代替__proto__的设置]()
4. [3的问题是s.__proto__存在Human的私有属性，我们用一个空白的构造函数Empty()来解决这一问题]()
5. [IE(面试考)：用create实现Solider.prototype.__proto__ = Human.prototype]()
6. [ES6:class]()

#### create()
```
A=Object.create(B);
```
等价于
```
A.__proto__ = B;
```
#### super
* 作用:为s设置作为Human的属性
```
super("yellow", "nezha")
```
等价于
```
Human.call(this, "yellow", "nezha")
```
#### class
* class A extends B:说明B是A的父类
* A extends B
实现了
```
A.prototype.__proto__ = B.prototype
```
* 在class中，constructor(){}内部的，为私有属性；外部的，为共有属性
* super()只能为父类传递私有属性，不能传递公有属性,公有属性是由extends实现的
* 注意公有属性只能是函数，而私有属性可以是函数，也可以不是函数
* class的本质仍然是函数(一个无法call的函数)