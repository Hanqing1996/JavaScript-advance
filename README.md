
```
-1 == 1; // false
-1 == 0; // false
true ? true : false; // true
```
* 参考1：https://stackoverflow.com/questions/3619797/why-are-javascript-negative-numbers-not-always-true-or-false
* 参考2：https://javascriptweblog.wordpress.com/2011/02/07/truth-equality-and-javascript/

---
参考：[JavaScript 引擎（V8）是如何工作的](https://github.com/jejuin/Blog/issues/6)
#### Parser
* Parser 是V8引擎的一部分。 V8 引擎会扫描所有的源代码，进行<strong>词法分析</strong>，生成 Tokens。然后，Parser 做了以下工作（所谓“语法分析”）
1. 分析语法错误：遇到错误的语法会抛出异常
```
function fn(){
    let a='ss;
    console.log('hh')
}

console.log('1')
setTimeout(()=>{
    fn()
},5000)

// 浏览器 直接报错：Uncaught SyntaxError: Invalid or unexpected token
```
2. 生成AST，查看代码对应AST的网站:https://esprima.org/demo/parse.html#
3. 确定词法作用域；
* Parser 是一个单纯的前置操作，所有代码通过 Parser 解析完毕后，再执行代码，创建各种执行上下文环境。

#### Pre-Parser
* Parser 解析器又称为 full parser（全量解析） 或者 eager parser（饥饿解析）。它会解析所有立即执行的代码，包括语法检查，生成 AST，以及确定词法作用域。
* Pre-Parser 又称为惰性解析，它只解析未被立即执行的代码（如函数），不生成 AST ，只确定作用域，以此来提高性能。当预解析后的代码开始执行时，才进行 Parser 解析。
```
function foo() {
    console.log('a');
    function inline() {
        console.log('b')
    }
}

(function bar() {
    console.log('c')
})()；

foo();
```
1. 当 V8 引擎遇到 foo 函数声明时，发现它未被立即执行，就会采用 Pre-Parser 对其进行解析。
2. 当 V8 遇到(function bar() {console.log(c)})()时，它会知道这是一个立即执行表达式（IIFE），会立即被执行，所以会使用 Parser 对其解析。
3. 当 foo 函数被调用时，会使用 Parser 对 foo 函数进行解析。

#### Ignition
* 作用
1. Ignition 负责将 AST 转换为字节码，字节码可以直接操作寄存器，具体参考[【译】Ignition：V8解释器](https://zhuanlan.zhihu.com/p/41496446)。这个过程通常被称为预编译阶段。执行上下文生命周期的创建阶段就是在该阶段进行的。
2. 由于 Pre-parse 的存在，某些函数没有AST，那么在运行前就需要被再次解析以确定 AST
3. 准确来说，V8 有两种方式执行代码：一种是 Ignition  解释器直接解释字节码执行；另一种是执行TurboFan优化编译后的机器代码。所以执行上下文生命周期的执行阶段，是由Ignition  或者TurboFan进行的。
* 解释执行，说的就是 Ignition 的工作
> 逐行解释执行字节码：在该阶段，就已经开始执行 JavaScript 代码了。


#### Ignition 和 TurboFan 的交互
当 Ignition 开始执行 JavaScript 代码后，V8 会一直观察 JavaScript 代码的执行情况，并记录执行信息，如每个函数的执行次数、每次调用函数时，传递的参数类型等。

如果一个函数被调用的次数超过了内设的阈值，监视器就会将当前函数标记为热点函数（Hot Function），并将该函数的字节码以及执行的相关信息发送给 TurboFan。TurboFan 会根据执行信息做出一些进一步优化此代码的假设，在假设的基础上将字节码编译为优化的机器代码。如果假设成立，那么当下一次调用该函数时，就会执行优化编译后的机器代码，以提高代码的执行性能。

那如果假设不成立呢？不知道你们有没有注意到上图中有一条由 optimized code 指向 bytecode 的红色指向线。此过程叫做 deoptimize（优化回退），将优化编译后的机器代码还原为字节码。

读到这里，你可能有些疑惑：这个假设是什么假设呢？以及为什么要优化回退？我们来看下面的例子。
```
function sum (a, b) {
    return a + b;
}
```
我们都知道 JavaScript 是基于动态类型的，a 和 b 可以是任意类型数据，当执行 sum 函数时，Ignition 解释器会检查 a 和 b 的数据类型，并相应地执行加法或者连接字符串的操作。

如果 sum 函数被调用多次，每次执行时都要检查参数的数据类型是很浪费时间的。此时 TurboFan 就出场了。它会分析监视器收集的信息，如果以前每次调用 sum 函数时传递的参数类型都是数字，那么 TurboFan 就预设 sum 的参数类型是数字类型，然后将其编译为机器指令。

但是当某一次的调用传入的参数不再是数字时，表示 TurboFan 的假设是错误的，此时优化编译生成的机器代码就不能再使用了，于是就需要进行优化回退。


#### 函数创建
1. 一个函数要被运行前，准确地说是需要创建函数上下文时，才需要创建函数（“创建”函数这个说法不准确，应该是创建函数的上下文环境）
2. parser 阶段会解析函数，但不会“创建”
```
// parser 阶段会解析 fn，但没有创建 fn
function fn(){
	
}
```


---
#### 关于声明
所有的“声明”：
1. 都意味着 JavaScript 将可以通过语法分析（就是上面提到的 Parser 工作）发现那些声明的标识符。
2. 标识符对应的变量 / 常量“一定”会在代码执行前就已经被创建在作用域中。
---
## 继承与组合
#### 继承vs组合
1. 组合：“继承，类都是垃圾玩意，不要用。”
2. 组合认为对象是“功能”的组合。
3. 如果我们的代码是继承实现的，那么有扩展需求时可能难以实现。而如果我们的代码是用组合实现的，那么有扩展需求时会容易实现
> 比如我们用继承写了很多类
```
robot
    .run()
    murderRobot
        .kill()
    cleanRobot
        .clean()


animal
    .poop()
    dog
        .wang()
    cat
        .miao()
```
现在需要构造狗型杀人机器人
* 继承：‘...wtf’
* 组合："可以做到，但是继承和类是垃圾，所以我先重构原先的代码"
```
const run=()=>{
}

const kill=()=>{
}

const clean=()=>{
}

const robot=(run)=>{
    return{
       run
    }
}

// murderRobot 是 run,kill 的功能组合
const murderRobot=(run,kill)=>{
    return{
        run,kill
    }
}

// cleanRobot 是 run,clean 的功能组合
const cleanRobot=(run,clean)=>{
    return{
        run,clean
    }
}

// animal,dog,cat 同理
```
现在构造狗型杀人机器人
```
// 分析：狗型杀人机器人，是 run,kill,wang 的功能组合
const murderRobotDog=(run,kill,wang)=>{
    return{
        run,kill,wang
    }
}
```

#### 什么时候用组合
* vue 的 mixin
* vue 开发插件（添加到全局）
```
Vue.use(...)
```
---
## Eventloop

#### 【面试】
> 是一个变化的状态

#### Node.js 中的 Eventloop
> 注意进入 Timers/checkout 阶段后，会把该阶段已有队列中所有任务清空，然后立即进入下个阶段。如果清空过程中又有任务入队，不在本轮做处理，等到下次进入该阶段时再做处理。
* 阶段划分
```
Timers->Poll（停留一段时间）->Checkout->Timers...
```
* API 与对应阶段
1. seTimeout
> 被放入 Timers 阶段的任务队列。
2. setImmediate
> 被放入 checkout阶段的任务队列。
3. process.nextTick
> 会被放入指针所指阶段，并立即被执行（在执行完毕所有同步任务后，优先于该阶段所有异步任务执行，可以认为是被放在队列头部）。
4. then
> Node.js 的 Promise 的 then 实现是基于以上API的，比如如果是基于 nextTrick,那就按照 nextTrick 思考。
* poll 的特点
1. 会停留一段时间，期间不断询问有无异步任务需被处理。
2. 若在 poll 阶段，此时 Timer/Checkout 有异步任务到了需要被处理的时候，则停止等待，立即进入下个阶段
* "入队"与"执行"
> 指针指在A阶段，事件可能同时被放入 B 阶段队列，但是事件（回调函数）执行必须要等到指针指向B阶段

#### Chrome 的 Eventloop
* 组成
> Chrome 的 Eventloop 包含 宏任务（一会儿再做）和微任务（马上做）

> 微任务全部执行完毕后，才开始执行宏任务
* 对应API
1. setTimeout=>宏任务
2. .then(fn)=>微任务
3. 有关 await 的面试题,转化成 promise 再做。注意 new Promise(fn) 是同步的。

#### 更广范围上的宏任务/微任务
* 微任务
```
Promise.then
process.nextTick(Node.js 环境)
```
* 宏任务
```
script
setTimeout
setInterval
I/O
UI交互事件
setImmediate(Node.js 环境)
```

#### 面试题目怎么区分是 node.js 还是 浏览器
> 没有 Node.js API(nextTick,setImmediate),一律视为浏览器环境


#### Node.js 的 Eventloop 面试题
1. 画图（三个阶段）
2. 默认规则：题目如果没有用 setTimeout 包裹，则一开始为 Timers 阶段。否则 setTimeout 内一开始为 poll 阶段。
* 例1
```
// f1
setTimeout(()=>{
    console.log(`1`)   
},3000)

// f2
setTimeout(()=>{
    console.log(`2`)   
},3000)
```
> 1 2

f1 被放入 Timers 队列，f2 被放入 Timers 队列。按照队列的先进先出特点，一定会先执行 f1,再执行 f2。
* 例2
```
// f1
setTimeout(()=>{
    console.log(0)  
    // f2
    setTimeout(()=>{
        console.log(1)
    },0)
    // f3
    setImmediate(()=>{
        console.log(2)
    })  
},3000)
```
> 0 2 1

f1 被放入 Timers 队列。进入 Timers 阶段时，f1被执行，然后进入 poll 阶段。 f2 被放入 Timers 阶段，f3 被放入 checkout 阶段。然后进入 checkout 阶段，f3 被执行，然后进入 Timers 阶段，f1 被执行。
* 例3
```
// f1
setTimeout(()=>{
    console.log(0) 
    // f2
    setTimeout(()=>{
        console.log(1)
        // f3
        process.nextTick(()=>{
            console.log(2)
        },0)
    },0)
    // f4
    setImmediate(()=>{
        console.log(3)
    }) 
    // f5
    process.nextTick(()=>{
        console.log(4)
    },0)
},3000)

```
> 0 4 3 1 2 

f1 被放入 Timers 队列。进入 Timers 阶段时，f1被执行，然后队列。进入 poll 阶段。f2 被放入 Timers 阶段，f4 被放入 checkout 阶段，f5 被放入目前所在的 poll 阶段，且立即被执行。然后进入 checkout 阶段，f4 被执行。然后进入 Timers 阶段，f2 被执行。
* 例4
```
// f1
setTimeout(()=>{
    console.log(1)
    // f2
    setImmediate(()=>{
        console.log(2)
        // f3
        setTimeout(()=>{
            console.log(3)
        },0)
    })

    // f4
    setTimeout(()=>{
        console.log(4)
        // f5
        setImmediate(()=>{
            console.log(5)
        })
    },0)

},3000)
```
> 1 2 4 3 5

f1 被放入 Timers 队列。进入 Timers 阶段时，f1被执行，然后进入 poll 阶段。f2 被放入 checkout 阶段，f4 被放入 Timers 阶段。然后进入 checkout 阶段，f2被执行，f3 被放入 Timers 阶段。然后进入 Timers 阶段，f4 被执行，f5 被放入 checkout 阶段。然后f3 被执行。然后进入poll 阶段，然后进入 checkout 阶段，f5 被执行。
* 例5
```
// f1
setTimeout(()=>{
    console.log(1)
    // f2
    process.nextTick(()=>{
        console.log(2)
      })
  })
// f3
setImmediate(()=>{
    console.log(3)
})
//f4
process.nextTick(()=>{
    console.log(4)
})
```
> 4 1 2 3 

f1 被放入 Timers 队列，f3 被放入 checkout 阶段， f4 被放入当前的 Timers 阶段并被立即执行。然后 f1 被执行，进入 poll 阶段。f2 被放入 poll 阶段并立即被执行。然后进入 checkout 阶段，f3 被执行。




#### Chrome 的 Eventloop 面试题
1. 画图（两个任务队列，宏任务队列，微任务队列）
2. 抓住关键：微任务队列清空后，才执行宏任务队列
3. 对于 await 的等价转化
```
async function fn(){
    console.log(1)
}

await fn()
console.log(2)
```
等价于
```
async function fn(){
    console.log(1)
}

fn().then(()=>{
    console.log(2)
})
```
4. 记住 new Promise(xxx) 是同步的，且应该视为是普普通通地执行了一个函数
5. 记住微任务队列清空后才开始执行宏任务队列
* 例1
```
async function async1(){
    console.log(1)
    await async2()
    // f1
    console.log(2)
}

async function async2(){
    console.log(3)
}

async1()
// f3
new Promise((resolve)=>{
    console.log(4)
    resolve();
}).then(
    // f2
    ()=>{
        console.log(5)}
    )
```
> 1 3 4 2 5 

async1执行。async2执行。f1 入微任务队列。f3（new Promise） 执行。f2 入微任务队列。然后 f1执行，f2 执行。
* 例2
```
console.log(1);

// f1
setTimeout(function() {
  console.log(2);
}, 0);

              // f2
let promise = new Promise((resolve, reject)=>{
    console.log(3)
    resolve()
})

promise.then(
    // f3
    ()=>{
        console.log(4);
    }
    ).then(
    // f4    
    ()=>{
        console.log(5);
});
```
> 1 3 4 5 2

f1 放入宏任务队列。f2 执行。f3 入微任务队列。f4 入微任务队列。f3 执行，f4 执行。微任务队列清空，因此 f1 执行。
* 例3
```
async function async1(){
	console.log(1)
    await async2()
    // f2
	console.log(2)
}
async function async2(){
	console.log(3)
}
console.log(4)
// f1
setTimeout(()=>{
	console.log(5)
})
async1()
// f3
new Promise((resolve)=>{
	console.log(6)
	resolve()
}).then( 
    // f4 
    ()=>{
	console.log(7)
    }
)
console.log(8)
```
> 4 1 3 6 8 2 7 5

f1 放入宏任务队列。async1执行。f2 入微任务队列。f3 执行，f4 入微任务队列。f2 执行，f4 执行，f1 执行。
#### [函数](https://github.com/Hanqing1996/JavaScript-advance/tree/master/%E4%BD%A0%E7%9C%9F%E7%9A%84%E6%87%82%E5%87%BD%E6%95%B0%E5%90%97)
* return 的坑
* 几道关于函数和对象的面试题目
* if(temp=1+2) 不是判断temp是否等于3
* 函数不一定总有返回值
* var和let
* let 的暂时死区
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
* Object.entries(object1))
* delete 删除对象的某个属性
* 对象转字符串（序列化）
* 字符串转对象（反序列化）
* 为什么后端给前端传的是字符串而非对象
* 'age' in obj
* person2 = {name:"rick"};重新开辟内存空间给 person2
* arr.indexOf(obj)
* let obj={} obj.age={} 内存变化
* obj.age.type/undefined 与 obj.age.type.required/error
* {sayHi(){console.log('h1')}}
* Object.freeze()
* Object.defineProperty()与get/set的区别
* 关键字的概念
* Object的属性遍历
* enumerable:设置某个属性是否可被遍历到
* undefined的本质是window的只读属性
* 设置对象的只读属性
* configurable
* a===1&&a===2&&a===3
* obj['name']=12   obj[name]=12/为对象添加键值对   obj={[name]:12}  obj={name:12}/为空对象添加键值对 
* var obj={a,b,c}
* var obj={sayHi(){}}
* 如何生成一个空对象
* Object.keys(obj)
* [object的存储](https://xiedaimala.com/tasks/5833c9d4-ebd5-44e4-91b5-661f476f9cad/video_tutorials/ccd79503-4f54-4b31-9f91-6f76f6073722)
* 函数是一个对象
* let a=Object.create(b):等价于a.__proto__=b
* 对构造函数中的this的理解
* 函数Human的两种调用方法
* 为已有的类添加公共属性
* 构造函数规则
* __proto__和prototype的区别
* [__proto__ 的优点：省内存](https://xiedaimala.com/tasks/5833c9d4-ebd5-44e4-91b5-661f476f9cad/video_tutorials/ccd79503-4f54-4b31-9f91-6f76f6073722)
* 访问 __proto__ 
* 为什么是原型"链"
* class 中的 __proto__
* constructor 
* 下面写法会覆盖Solider.prototype，导致constructor丢失
* new
* 私有属性与共有属性
* 用js模拟继承(__proto__/new/create/class)
* class
* super
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
* filter 实现 updateNameById:this.data.filter(tag=>tag.id===targetId)[0].name=targetName
* 对象数组移除某个元素：copy = copy.filter(item => item.id !== targetId)
* 用redue实现map
* 用reduce实现filter
* flat:拍平数组
* zip:拉拉链（数组变为对象）
* entries（对象变为数组）
* 去除数组中的 undefiend 元素
 

#### [字符串](https://github.com/Hanqing1996/JavaScript-advance/tree/master/%E5%AD%97%E7%AC%A6%E4%B8%B2)
[教程](https://xiedaimala.com/tasks/05ad6931-9101-4c43-8810-893e787efb5f/video_tutorials/dafabdb1-724f-43c7-8b66-3b8037d3363e)
* 包含空格和回车的字符串
* 模板字符串`${str}`
* 函数接字符串
* 为什么字符串不应该作为函数参数
* split()


#### [其它1](https://github.com/Hanqing1996/JavaScript-advance/tree/master/%E5%85%B6%E5%AE%831)
* ==和===
* const arr,只能保证 arr 对应地址不变，如果想禁止 push等操作，应该配合 Object.freeze() 使用
```
const arr=[1,2,3]

arr=[4,5,6] // 报错
arr.push(5) // 可以添加
```
* charCodeAt(0) 获取字母对应 ASCII 码
```
console.log('b'.charCodeAt(0)) // 98
```
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
* var服从函数作用域，不服从块级作用域
* let不存在变量提升
* let不可以重复声明
* const在声明时就必须赋值,不可以重复声明,不可以重复赋值
* const服从块级作用域
* for循环细节
* for循环与let
* 处理默认参数
* 剩余参数
* ...
* obj={name:'liabi',age:12} obj2={...obj,age:13} 
* const newFormValue = {...props.value, [name]: value}
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
* symbol
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

#### JS 模块化
* 历史发展
	1. 代码和代码之间如何隔开-立即执行函数
	2. common.js（node.js 发明）
	```
	module.exports
	exports.a=...
	let fs=require('fs')
	```
	3. AMD（async module define，即 requre.js，node.js 发明）
	```
	require('vue',callback)
	```
	4. CMD（中国人发明，common module define）
	5. export/import（ES6）
	6. UMD（uniform module define）
	> 兼容 1-5 模块定义方法
 * [difference between default and named exports](https://stackoverflow.com/questions/36795819/when-should-i-use-curly-braces-for-es6-import/36796281#36796281)
 





#### 重定向
>  数组的引用传递，在 vue 中非常常见。所以有必要搞清楚。

> 为贴合实际开发，下面举的例子都是对象数组，随机应变

* 删除.错误姿势（深拷贝）
```
let data=[{id:1,name:'one'},{id:2,name:'two'},{id:3,name:'three'}]
let list=data
data=data.filter(tag=>tag.id!==1) // 想删除项的 id 为1,相当于给 data 重定向
console.log(list) // [{id: 1, name: "one"},{id: 2, name: "two"},{id: 3, name: "three"}]
console.log(data) // [{id: 2, name: "two"},{id: 3, name: "three"}]
```
* 只有一个需要删除
```
let data=[{id:1,name:'one'},{id:2,name:'two'},{id:3,name:'three'}]
let list=data
const idList = data.map(tag => tag.id)
const targetIndex=idList.indexOf(1)// 想删除项的 id 为1
data.splice(targetIndex,1)
console.log(list) // [{id: 2, name: "two"},{id: 3, name: "three"}]
console.log(data) // [{id: 2, name: "two"},{id: 3, name: "three"}]
```
* 有多个需要删除.用 filter
```

```
* 边遍历边删除是不可以的！！！！
```
// 以下做法是不行的！！！
this.giftSelected.forEach((gift: any,giftIndex:number) => {
    // 找到该商品对应的 gift
    if (gift.parent_goodsId == good.goodsId) {
	......	
	// 从 giftSelected 中剔除 gift
	this.giftSelected.splice(giftIndex,1)
    }
})
```
* 将所有待删除 index 放入数组中，再遍历之 也是不可以的！！！
```
// 以下做法是不行的！！！

// 待删除 Index 列表
let toSpliceIndex=[]
this.serviceSelected.forEach((service: any, serviceIndex: any) => {
	// 找到该商品对应的已选中服务
	if (service.parent_goodsId == good.goodsId) {
		// 待删除 Index 列表
		toSpliceIndex.push(serviceIndex)
		}
})

// 遍历待删除 Index 列表
toSpliceIndex.forEach((index:any)=>{
	this.serviceSelected.splice(index, 1)
})
```
* 删除
* 修改.正确姿势（浅拷贝）
```
let data=[{id:1,name:'one'},{id:2,name:'two'},{id:3,name:'three'}]
let list=data
let target=data.filter(tag=>tag.id===1)[0]
target.name='updatedOne'
console.log(list) // [{id: 1, name: "updatedOne"},{id: 2, name: "two"},{id: 3, name: "three"}]
console.log(data) // [{id: 1, name: "updatedOne"},{id: 2, name: "two"},{id: 3, name: "three"}]
```
* 增加.正确姿势（浅拷贝）
```
let data=[{id:1,name:'one'},{id:2,name:'two'},{id:3,name:'three'}]
let list=data
data.push({id:4,name:'four'})
console.log(list) // [{id: 1, name: "one"},{id: 2, name: "two"},{id: 3, name: "three"}，,{id: 4, name: "four"}]
console.log(data) // [{id: 1, name: "one"},{id: 2, name: "two"},{id: 3, name: "three"}，,{id: 4, name: "four"}]
```
* fetch 的坑
```
const TagListViewModel={
	data:[]
	fetch() {
		this.data = JSON.parse(window.localStorage.getItem(localStorageKeyName) || '[]');
		return this.data
	    }
}

window.taglist=TagListViewModel.fetch() // TagListViewModel.data 与 window.taglist 指向同一片内存空间
TagListViewModel.fetch() //!!!  TagListViewModel.data重定向，导致 TagListViewModel.data 与 window.taglist解绑
```

#### fetch 只执行一次
> fetch 只在为 person.data 赋值时执行一次
```
const fetch=()=>{
    console.log('fetch 执行了')
    return [1,2,3]
}

const person={
    data:fetch()
}
```
> 在调用 person.data 时，fetch 不执行
```
const fetch=()=>{
    console.log('fetch 执行了')
    return [1,2,3]
}

const person={
    data:fetch()
}

console.log(person.data)
```

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
