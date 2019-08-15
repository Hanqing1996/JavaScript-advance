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