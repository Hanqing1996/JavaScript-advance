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



#### Promise
* Promise 的 then 函数的第二个参数<strong>不建议</strong>添加，因为 reject 意味着发生了错误，应该直接由 catch 来处理
```
const p1=new Promise((resolve,reject)=>setTimeout(()=>reject(1),1000))

p1.then(()=>{}).catch(err=>console.log(err))
```
* Promise 的 resolve(),reject() 不是异步（resolve,regect 被放入异步任务中自然另当别论）的。但是,then()是异步的，会在resolve()或reject()执行完毕才后执行
* new Promise(resolve=>setTimeout(()=>{console.log('hh');resolve(1)}) 是执行了一个函数
```
let p=new Promise(resolve=>{console.log('hh');resolve(1)})
console.log(p)

// 输出：
hh 
Promise {<resolved>: 1}
```

* promise的局限
promise的作用只是规范了回调,使[回调变得可控](https://zhuanlan.zhihu.com/p/22782675),避免了回调地狱的出现，但并没有消除回调

* 自己实现的promise
```
function buyFruit(){
    return new Promise((resolve,reject)=>{
        setTimeout(()=>{
            reject('apple')
        },10000)
    })
}

var promise=buyFruit()

promise.then(()=>{ 
    console.log('成功')
},()=>{
    console.log('失败')
})
```

[理解 JavaScript 的 async/await](https://segmentfault.com/a/1190000007535316)
#### await 和 await 的等价（看懂这个，接下去的就都不用看了）


* 注意！！！
```
async function foo(){
    setTimeout(()=>'libai',5000)
}
```
不等价于
```
function foo(){
    return new Promise(resolve=>{
        setTimeout(()=>{
            resolve('libai')
        },5000)
    })
}
```
因为
```
async function foo(){
    setTimeout(()=>'libai',5000)
}

// 等价于

/*函数的完整执行特性*/
async function foo(){
    setTimeout(()=>'libai',5000)
    return undefined
}

// 等价于

function foo(){
    return new Promise(resolve=>{
        setTimeout(()=>{
            resolve('libai')
        },5000)
        resolve(undefined)
    })
}
```




* await 的等价
```
await foo();
console.log(1);
```
等价于
```
Promise.resolve(foo()).then(()=>console.log(1))
```
* async 的等价
```
async function foo() {
    console.log(1)
}
```
等价于
```
function foo(){
    return new Promise((resolve,reject)=>{
        console.log(1)
        resolve(undefined)
    })
}
```
* 例1
```
async function foo() {
  console.log(1);
  await foo1();
  console.log(2);
}
```
等价于
```
function foo() {
    return new Promise(resolve, reject => {
        console.log(1);
        Promise.resolve(foo1()).then(() => {
            console.log(2);
        })
    })
}
```
* 例2
```
function wait() {
  return new Promise(resolve => setTimeout(resolve, 10 * 1000));
}

async function main() {
  console.time();
  await wait();
  await wait();
  await wait();
  console.timeEnd();
}
main();
```
等价于
```
function main() {
    return new Promise((resolve, reject) => {
        console.time();
        Promise.resolve(
            new Promise(resolve => setTimeout(resolve, 10 * 1000))
        ).then(() => {
            Promise.resolve(
                new Promise(resolve => setTimeout(resolve, 10 * 1000))
            ).then(() => {
                Promise.resolve(
                    new Promise(resolve => setTimeout(resolve, 10 * 1000))
                ).then(() => {
                    console.timeEnd();
                });
            });
        });
    });
}
main()
```
* 例3 
```
function wait() {
  return new Promise(resolve =>
    setTimeout(resolve, 10 * 1000)
  )
}

async function main() {
  console.time();
  const x = wait();
  const y = wait();
  const z = wait();
  await x;
  await y;
  await z;
  console.timeEnd();
}
main();
```
等价于
```

function main() {
    return new Promise((resolve, reject) => {
        console.time();
        const x = new Promise(resolve =>
            setTimeout(resolve, 10 * 1000)
        )
        const y = new Promise(resolve =>
            setTimeout(resolve, 10 * 1000)
        )
        const z = new Promise(resolve =>
            setTimeout(resolve, 10 * 1000)
        )

        Promise.resolve(x).then(() => {
            Promise.resolve(y).then(() => {
                Promise.resolve(z).then(() => {
                    console.timeEnd();
                })
            })
        })
    })
}
main()
```

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
function fn()
{
    // 等价于Promise.resolve('小明');
    return new Promise((resolve，reject)=>resolve('小明'));
}

fn().then(s => console.log(s))
```
* async函数不返回值
```
async function fn() {
}


/**
 * 输出:
 * Promise {<resolved>: undefined}
 * __proto__: Promise
 * [[PromiseStatus]]: "resolved"
 * [[PromiseValue]]: undefined // resolve 的值是 undefined
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
```
await new Promise(resolve=>resolve("hh")) // "hh"
```
* await的作用在于我们不用写then()了
```
function test() {
    return Promise.resolve('hh');
}

test().then(s=>console.log(s))
```
等价于
```
async function test() {
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
* await 命令后面的 Promise 对象，运行结果可能是 rejected，所以最好这么写。
```
async function myFunction() {
  await somethingThatReturnsAPromise().catch(err=>console.log(err))
}

// 等价于

async function myFunction() {
  await somethingThatReturnsAPromise().catch(function (err){
    console.log(err);
  });
}
```
* 注意 promise 的 resolve 不是必须等到 await 执行才被调用!!!
> 以下代码中，resolve 是在同步代码全部执行完毕后等待10s被调用的，然后又过了10s，打印此时的 p,然后获取 resolve 的结果并赋值给 res 
```
let p=new Promise(resolve=>setTimeout( ()=>{resolve(1)},10000 ))
setTimeout(async()=>{
    console.log(p) // Promise {<resolved>: 1}
    const res=await 
    console.log(res) // 1    
},20000)
console.log('let us wait 10s')
```
* await 会阻塞自己后面的代码，直到自己获取到 promise 的 resolve 结果

详见[这道面试题](https://github.com/Hanqing1996/-summary#no129-%E8%BE%93%E5%87%BA%E4%BB%A5%E4%B8%8B%E4%BB%A3%E7%A0%81%E6%89%A7%E8%A1%8C%E7%BB%93%E6%9E%9C)

#### await 用法
* 用 promise 封装 readFile
```
read: () => {
    let list;
    return new Promise((resolve, reject) => {
        fs.readFile(dbPath, {flag: 'a+'}, (err, data) => {
            if (err) {
                reject(err);
            }else{
                resolve(list)
            }
        })
    })
}
```
```
let list=await read();
console.log(list);
```
* 用 promise 封装 writeFile
```
    write: (list) => {
        const result = JSON.stringify(list)
        return new Promise((resolve, reject) => {
            fs.writeFile(dbPath, result, (err) => {
                if (err) {
                    return reject(err);
                }
                resolve('write successfully')
            });

        })
    }
```
```
// 对 list 的操作
let information=await db.write(list);
if(information==='write successfully'){
    console.log('update state successfully');
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

#### 一道关于 setTimeout 和 for 循环的面试题
下面代码执行结果是什么?
```
for(var i=0;i<2;i++){
setTimeout(()=>{console.log(i)},0)
}
```
答案
```
2
2
```
* 原因
1. var i=0,相当于定义了一个全局变量i
2. 对于setTimeout(fn,time),要意识到fn是一个回调函数，在time时间间隔后执行;but,setTimeout(fn,time)是立即执行的!!!也就是说,setTimeout立即执行了两次,但是两个回调函数是延迟执行的．
3. 收到2启发
```
el.addEventListener('click',fn)
```
上面这句话其实也是立即执行的,只是其中回调函数fn是在el被点击后才执行的
