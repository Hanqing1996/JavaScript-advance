* [从浏览器多进程到JS单线程，JS运行机制以及浏览器渲染过程最全面的一次梳理](https://zhuanlan.zhihu.com/p/33230026)
* [Chrome performance](https://zhuanlan.zhihu.com/p/29879682)

# 函数

#### 函数体内部的变量是什么时候被创建的？

是函数上下文环境创建完毕前被创建的，而不是 parse 阶段被创建的。

parse 阶段只是【声明】某些变量，而上下文环境创建阶段，会根据之前【声明】的记录去创建那些变量


#### a 和 window.a
```
console.log(a)
// a is not defined
```
我们访问一个没有被声明过的变量，所以返回undefined


```
var a
console.log(a)
// undefined
```
用var声明的变量，会在上下文环境创建时被绑定初值undefined

```
console.log(window.a)
// undefined
```
访问一个对象的不存在的属性，当然是undefined 

---
#### 在块级作用域里声明变量/函数
* 变量
> 块级作用域里用var声明的变量，会提升到函数（全局）作用域顶部
```
console.log(a)
{
   var a
   a=2
}
```
等价于
```
var a
console.log(a) // undefined
{
    a=2
}
```
```
var myname = "极客时间"
function showName(){
  console.log(myname); // undefined 
  if(0){
   var myname = "极客邦"
  }
  console.log(myname); // 极客邦
}
showName()
```
if里面的变量 myname 的声明，将被提升到函数 showName 顶部。

所以上面代码等价于
```
var myname = "极客时间"
function showName(){
  var myname
  console.log(myname); // undefined 
  if(0){
   myname = "极客邦"
  }
  console.log(myname); // 极客邦
}
showName()
```
* 函数

ES6 在附录B里面规定：

1.允许在块级作用域内声明函数。

2.函数声明类似于var，即会提升到全局作用域或函数作用域的头部。

3.同时，函数声明还会提升到所在的块级作用域的头部。

而且，**在块级作用域中定义的函数，在全局上下文中只是进行函数名变量进行提升，但是不执行赋值操作**。所以
```
console.log(a)
{
    console.log(a)
    function a(){}
}
```
等价于
```
console.log(a) // undefined 
{
    // function 声明会在代码执行之前就「创建、初始化并赋值」,也就是说 a 在上下文创建完毕时就已经被赋值为 dunction(){}
    var a
    a=function(){}
    
    console.log(a)
}
```
又由于
1. 块级作用域中的函数声明，类似于var，即会提升到全局作用域或函数作用域的头部。
2. 在块级作用域中定义的函数，在全局上下文中只是进行函数名变量进行提升，但是不执行赋值操作

所以上面代码等价于
```
var a
console.log(a) // undefined 
{
    a=function(){}
    console.log(a) // [Function: a]
}
```
#### let 的暂时性死区
在块作用域内，let声明的变量被提升，但变量只是创建被提升，初始化并没有被提升，在初始化之前使用变量，就会形成一个暂时性死区
```
let myname= '极客时间'
{
  console.log(myname) // VM6277:3 Uncaught ReferenceError: Cannot access 'myname' before initialization
  let myname= '极客邦'
}
在执行{}内代码前，就已经存在用let声明的变量myname了，只是无法访问。
```

#### function fn2(){console.log(2)} 做了什么
``` 
fn2()
function fn2(){
  console.log(2)
}
```
JS 引擎会有以下过程：

1. 找到所有用 function 声明的变量，在环境中「创建」这些变量。注意这发生在上下文环境创建完毕前，不是 parse 阶段
2. 将这些变量「初始化」并「赋值」为 function(){ console.log(2) }。
> 注意这是非常特殊的！因为用 var 声明的变量，在执行代码（上下文）前会被初始化为 undefined 但不会被赋值；用 let,const 声明的变量，在执行代码（上下文）前不会被初始化；只有用 function 声明的变量，在代码执行会完成赋值操作，amazing!!
3. 开始执行代码 fn2()

即，上面代码等价于
```
var fn2
fn2=function(){
  console.log(2)
}
// 现在开始执行上下文
fn2()
```
---
#### 函数是什么时候被编译的？
parser 在遇到非立即执行函数时，只会对其进行pre-parse（确定作用域，不生成ast）。直到该函数执行前，才对其进行parse，确定ast。

—为什么这样设计呢？因为js认为，“编译没执行的函数，是一种浪费”。

---


#### with 和 eval

参考自《你不知道的js》 

如果词法作用域完全由写代码期间函数所声明的位置来定义，怎样才能在运行时来“修改”（也可以说欺骗）词法作用域呢？JavaScript 中有两种机制来实现这个目的。

* eval
1. 它的功能是把对应的字符串解析成JS代码并运行
2. 应该避免使用eval，不安全，非常耗性能（2次，一次解析成js语句，一次执行）
```
function foo(str, a) {
eval( str ); // 欺骗！
console.log( a, b );
}
var b = 2;
foo( "var b = 3;", 1 ); // 1, 3
```
eval(..) 调用中的 "var b = 3;" 这段代码会被当作本来就在那里一样来处理。由于那段代码声明了一个新的变量 b ，因此它对已经存在的 foo(..) 的词法作用域进行了修改。事实上，和前面提到的原理一样，这段代码实际上在 foo(..) 内部创建了一个变量 b ，并遮蔽了外部（全局）作用域中的同名变量。当 console.log(..) 被执行时，会在 foo(..) 的内部同时找到 a 和 b ，但是永远也无法找到外部的 b 。因此会输出“1, 3”而不是正常情况下会输出的“1, 2”。

* with


---
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
#### let 的暂时死区
> 就是用 let 声明的变量，不能在初始化之前访问它。
```
{
    console.log(x);// 报错：x is not defined
    let x;
    x=2;
}
```
[let 的创建，初始化，赋值过程](https://github.com/Hanqing1996/-JavaScript-core-principles-parsing/blob/master/README.md#let-%E5%A3%B0%E6%98%8E%E7%9A%84%E5%88%9B%E5%BB%BA%E5%88%9D%E5%A7%8B%E5%8C%96%E5%92%8C%E8%B5%8B%E5%80%BC%E8%BF%87%E7%A8%8B)


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
3. 想要知道一个函数能访问哪些变量，要根据词法分析树。找到函数创建（定义，声明，怎么叫随便）前，最近声明（let,const）的变量。
4. 想要知道一个函数在执行时，访问的某个变量值是多少，要根据预编译(声明)和解释执行(运行)过程，找函数执行前，最近出现的该变量（注意不要找错，新声明的不是!!!）的值
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
* 案例一
```
/* 
// 预编译(声明)和解释执行(运行)过程如下

// 全局声明
let sum
function haha(){}

// 全局运行
sum=0
haha()

// 第一个 haha 声明
let x
function fn(){}

// 第一个 haha 运行
x=sum
sum++ // sum 的值变为1
return fn

// 全局运行
haha()()

// 第一个 haha()/fn 声明

// 第一个 haha()/fn 运行
console.log(x)
console.log(sum) // 往上瞅，最近处 sum 的值为1，所以打印1

// 全局运行
haha()

// 第二个 haha 声明
let x
function fn(){}

// 第二个 haha 运行
x=sum
sum++ // sum 的值变为2
return fn

// 第二个 haha()/fn 声明

// 第二个 haha()/fn 运行
console.log(x)
console.log(sum) // 往上瞅，最近处 sum 的值为2，所以打印2
*/
```
* 案例2
```
const taker=()=>{
    let money=100
    return (n)=>{
        money-=n
        console.log(money)
    }
}

taker()(10)
taker()(20)

/*
// 全局声明
const taker

// 全局运行
taker=()=>{...}
taker()

// taker 声明
let money

// taker 运行
money=100
return (n)=>{}

// 全局运行
taker()(10)

// (n)=>{} 声明
let n

// (n)=>{} 运行
n=10
money-=n // 往上瞅，最近处 money 的值为100,因此 money 的值变为90
console.log(money)

// 全局运行
taker()

// taker 声明
let money

// taker 运行
money=100
return (n)=>{}

// 全局运行
taker()(20)

// (n)=>{} 声明
let n

// (n)=>{} 运行
n=20
money-=n // 往上瞅，最近处 money 的值为100,因此 money 的值变为80
console.log(money)
*/
```
* 案例三（闭包）
```
const taker=function(){
    console.log('f 执行')
    let money=100
    return (n)=>{
        money-=n
        console.log(money)
    }
}()

taker(10)
taker(20)


/*
// 全局声明 
const taker

// 全局运行
function(){...}()

// function(){...} 声明
let money 

// function(){...} 运行
money=100 // A1
return (n)=>{
    money-=n
    console.log(money)
}

// 全局运行
taker=(n)=>{
    money-=n
    console.log(money)
}

taker(10)

// taker 声明

// taker运行
money-=10 // 往上瞅，最近处 money 的值为100,因此 money 的值变为90
console.log(money)

// 全局声明
taker(20)

// taker 声明

// taker运行
money-=10 // 往上，最近处 money 的值为90,因此 money 的值变为80
console.log(money)
*/
```
* 案例4（函数保存 money 状态）
```
let makeAccount=(n)=>{
    let money=n
    return (instruction)=>{
        return (amount)=>{
            money-=amount
            console.log(money)
        }
    }
}


let account=makeAccount(100)
account('take')(25)
account('take')(25)

// 全局声明
let makeAccount
let account

// 全局运行
makeAccount=()=>{...}
makeAccount(100)

// makeAccount 声明
let n
let money

// makeAccount 运行
n=100
money=n // money=100
return ()=>{...}

// 全局运行
account=(instruction)=>{
    return (amount)=>{
        money-=amount
        console.log(money)
    }
}

account('take')

// account 声明
let instruction

// acount 运行
instruction='take'
return (amount)=>{
    money-=amount
    console.log(money)
}

// 全局运行
account('take')(25)

// account('take') 声明
let amount

// account('take') 运行
amount=25
money-=amount // 往上瞅，money为100，所以这里变为 75


// 全局运行
account('take')(25)

// account 声明
let instruction

// acount 运行
instruction='take'
return (amount)=>{
    money-=amount
    console.log(money)
}

// account('take') 声明
let amount

// account('take') 运行
amount=25
money-=amount // 往上瞅，money为75，所以这里变为50
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
---
```
a={age:1+1}
// 该赋值操作执行多次,每次1+1都被计算
```
```
a=()=>{{age:1+1}}
// 该赋值操作执行多次，但除非 a()，否则1+1永远不会被计算
// 事实上上述赋值操作等效于声明一个函数 function a(){return{age:1+1} }
```

#### call stack
call stack存放的是函数调用的入口(当前位置)

#### 箭头函数中的this，是在定义函数的时候就确定是哪个变量的，而不是在执行函数的时候确定的!!!

> 相反，普通函数（以 function 开头）中的 this 是在执行函数时才确定是哪个变量的。

```
// 在执行 obj.getThis 的时候，才确定了 this 是 obj

let obj={
  name:'libai',
  getThis:function(){
  	console.log(this)
  }
}

obj.name='dufu'

obj.getThis() //  { name: "dufu", getThis: function(){console.log(this)}
```
    
```
// 在定义 obj.getThis 的时候，就确定了 this 是 window

let obj={
  name:'libai',
  getThis:()=>{
  	console.log(this)
  }
}

obj.name='dufu'

obj.getThis() //  window
```


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
> 在箭头函数内部出现的 this 被箭头函数认为是一个叫做 this 的普通变量，其值取决于上下文环境。
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
* class 内的箭头函数
```
class A{
    constructor(){
        this.n=1
        this.fn=()=>{
            console.log(this) // 这个 this 的值与 this.fn 的 this 一致，即 A
        }
    }
}

const a=new A()
a.fn() // A {n: 1, fn: }
```

#### 柯里化函数
* 什么是柯里化？
> 将[接受N个参数的函数]改写为[N个接受单参数的函数]

> 柯里化是为了部分调用

```js
let multiply=(a,b,c)=>a*b*c

let multiplyCurried=(a)=>(b)=>(c)=>a*b*c

multiplyCurried(10) // 得到一个函数 (b)=>(c)=>10*b*c

multiplyCurried(20) // 得到另一个函数 (b)=>(c)=>20*b*c
```
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
