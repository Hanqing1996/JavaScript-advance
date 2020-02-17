* [从浏览器多进程到JS单线程，JS运行机制以及浏览器渲染过程最全面的一次梳理](https://zhuanlan.zhihu.com/p/33230026)
* [Chrome performance](https://zhuanlan.zhihu.com/p/29879682)

# 函数
#### return 的坑
* 不 return 任何东西，相当于 return undefined
```
function fn(){
    console.log('hi')
}

let a=fn()
console.log(a) // undefined
```
等价于 
```
function fn(){
    console.log('hi')
    return undefined
}

let a=fn()
console.log(a) // undefined
```
* return 只认识与它同行的字符
```
function fn(){
    return
    `str`
}

let a=fn()
console.log(a) // undefined
```
等价于
```
function fn(){
    return undefined
}

let a=fn()
console.log(a) // undefined
```
解决方法
```
function fn(){
    return(
    `str`
    )
}

let a=fn()
console.log(a) // `str`
```




#### 几道关于函数和对象的面试题目
```
let obj={}
obj.age=undefined

function ensureObject(prop){
    if(typeof prop != 'Object'){
        prop={}
    }
}

ensureObject(obj.age)
console.log(obj)
```
> 打印出来的结果？为什么？
```
undefined
```
* 这个问题牵涉到两个知识点
    * [函数参数是局部变量](https://github.com/Hanqing1996/JavaScript-advance/tree/master/%E4%BD%A0%E7%9C%9F%E7%9A%84%E6%87%82%E5%87%BD%E6%95%B0%E5%90%97)
    * [object的存储](https://github.com/Hanqing1996/JavaScript-advance/tree/master/%E9%9D%A2%E5%90%91%E5%AF%B9%E8%B1%A1)
> 所以上面代码等效于
```
let obj={}
obj.age=undefined
let pro =obj.age
pro={}
console.log(obj.age);
```
内存变化过程为
```
let obj={}
obj.age=undefined

//栈内存：
obj:A1

//堆内存A1处
{age:undefined}
```
```
let pro =obj.age

//栈内存
pro:undefined
```
```
pro={}

//栈内存
pro:A2

//堆内存A2处
{}
```
综上,堆内存A1处没有被修改
---
```
let obj={}
obj.age=undefined

function ensureObject(prop){
    if(typeof prop.age != 'Object'){
        prop.age={}
    }
}

ensureObject(obj)
console.log(obj)
```
> 打印出来的结果是什么？为什么？
```
{ age: {} }
```
原因同上题，上面代码等效于
```
let obj={}
obj.age=undefined
let pro =obj
pro.age={}
console.log(obj.age);
```
内存变化如下
```
let obj={}
obj.age=undefined

//栈内存：
obj:A1

//堆内存A1处
{age:undefined}
```
```
let pro =obj

//栈内存：
pro:A1
```
```
pro.age={}

//堆内存A1处
{age:A3}

//堆内存A3处
{}
```
综上,堆内存A1处被修改了

#### if(temp=1+2) 不是判断temp是否等于3
```
let temp;

if(temp=1+2)
console.log('end'); // end
```
等价于
```
let temp=1+2;

if(temp)
console.log('end'); // end
```

#### 函数不一定总有返回值
```
function fn(n){
    if(n==1)
    return n;
    else
    console.log(n);
}
```

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
![image](https://github.com/Hanqing1996/JavaScript-advance/blob/master/%E4%BD%A0%E7%9C%9F%E7%9A%84%E6%87%82%E5%87%BD%E6%95%B0%E5%90%97/images/tree.jpg)
1. 一个函数所能访问的变量在函数定义时就已经决定了 
2. 一个函数所能访问的变量的值不是在函数定义时就能决定的 
* [介绍](https://xiedaimala.com/tasks/f3b7885d-ac51-4c41-a498-d01d532cc651/video_tutorials/76247167-7764-4c49-bf78-53b4d126da7a)
* 作用
> 确定当前函数能访问哪些变量
```
{
    let a = 2
    function fn() {
        console.log(a)
    }
    {
        a=3 // a 的值被修改为3
        fn() // 3
    }
}
```
```
{
    let a = 2
    function fn() {
        console.log(a)
    }
    {
        let a=3
        fn() // 2 
    }
}
```
* special
> 这次声明的 fn,只能找这次声明的 x;
```
let sum=0
function haha() {
    let x = sum
    // fn 声明了多次，每次声明的 fn 可以访问该次声明时块级作用域内声明的 x
    function fn() {
        console.log(x)
        console.log(sum)
    }
    sum++
    return fn
}

haha()() // 0 1
haha()() // 1 2
haha()() // 2 3




/* 
// 预编译(声明)和解释执行(运行)过程如下

// 全局声明
let sum
function haha(){}

// 全局运行
sum=0
haha()()

// 第一个 haha 声明
let x
function fn(){}

// 第一个 haha 运行
sum++
x=20
return fn

// 第一个 haha()/fn 声明

// 第一个 haha()/fn 运行
console.log(x)
console.log(sum)
*/
```


#### 变量提升
1. 所有的声明都会被提升到当前作用域的最顶端
2. 编译器在遇到var a的时候，会询问作用域是否已经有一个该名称的变量存在于同一个作用域，如果有，编译器会忽略该声明，继续进行编译；否则它会要求作用域在当前作用域的集合中声明一个新的变量，并命名为 a
3. 编译器在遇到function a{}的时候，不会有类似2的现象,而是直接覆盖
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

#### 对象内部的 this 和 Class 内部的 this
* 对象内部的 this
```
window.a=1000

let obj={
    a:12,
    b:this.a+1
}

console.log(obj) //{a:12,b:1001} 说明对象内部的 this 为 window（浏览器中如此,Node.js 环境可能不同）
```
* Class 内部的 this
```
class Obj{
    a=12
    b=this.a+1
}

let obj2=new Obj()
console.log(obj2.b) // 13 说明 Class 内部的 this 就是 Obj
```
#### Class 内部的箭头函数可以用来保存该类
* 普通函数无法保存 Obj
```
class Obj{
    a=12
    fn=function(){
        console.log(this.a)
    }
}

let o=new Obj()

class Obj2{
    a=15
    fn2=o.fn
}

let o2=new Obj2
o2.fn2() // 15 ,等价于 o2.fn2.call(o2),所以 this 为 o2
```
* 箭头函数可以保存 Obj
```
class Obj{
    a=12
    fn=()=>{
        console.log(this.a) // 箭头函数认为 this 是一个变量，按照上述 Class 内部 this 的特点,this={a:12...},就此亘古不变
    }
}

let o=new Obj()

class Obj2{
    a=15
    fn2=o.fn
}

let o2=new Obj2
o2.fn2() // 12,读取 this 这个变量，其值为 {a:12...}
```


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
3. +=
```
var fn=(i,j)=> i+=j;

console.log(fn(2,3)); // 5
```
等效于
```
var fn=(i,j)=> return i+j;

console.log(fn(2,3)); // 5
```
如果箭头函数返回一个对象，必须加 return 及{}
```
let fn=(age)=>{return {currentAge:age+1}}
console.log(fn(14)) //{currentAge:15}
```

* 箭头函数没有 this
> 在箭头函数内部出现的 this 被箭头函数认为是一个叫做 this 的普通变量
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
* 在A对象中的箭头函数，其内部 this 值为



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

#### DOM树的解析和渲染
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
