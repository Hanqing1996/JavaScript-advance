# 异步


#### Promise
* Promise 的 then 函数的第二个参数<strong>不建议</strong>添加，因为 reject 意味着发生了错误，应该直接由 catch 来处理
```
const p1=new Promise((resolve,reject)=>setTimeout(()=>reject(1),1000))

p1.then(()=>{}).catch(err=>console.log(err))
```
* catch 之后 Promise 实例的状态会重新变为 resolved
```
const p1=new Promise((resolve,reject)=>setTimeout(()=>reject(1),1000))

p1.catch(err=>console.log(err)).then((res)=>{console.log('resolved after catch')})
```
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

---
#### promise 的 then 方法
* Promise 实例化时，同步执行函数

>描述的是这样一种现象：在一个 Promise 实例创建的同时，传入的函数也被执行了

```javascript
// 既创建了 Promsie 实例 p，又执行了函数 resolve=>{console.log('hh');resolve(1)}
let p=new Promise(resolve=>{console.log('hh');resolve(1)})
console.log(p)

// 输出：
hh 
Promise {<resolved>: 1}
```

* Promise 传入的函数，resolve 方法，then 方法都是同步执行的。但是 then  的回调函数会在 then 方法之前的 Promise 实例被 resolve 后被放入微任务队列，在此之前，回调函数存于then 方法之前的 Promise 实例内部

```javascript
let p=new Promise((resolve,reject)=>setTimeout(resolve,1000))

    p.then(()=>{
    	console.log(1)
})

/**
 * 1. 函数 (resolve,reject)=>setTimeout(resolve,1000) 执行。setTimeout 执行，其回调函数 resolve 被放入微任务队列。
 * 2. then 方法执行，其回调函数存储于 p 内部。
 * 3. 目前所有同步代码执行完毕，执行微任务队列中任务。resolve 方法执行，导致 then 方法的回调函数被放入微任务队列。
 * 4. 目前所有同步代码执行完毕，执行微任务队列中任务。then 方法的回调函数执行。
 */
```

* then 方法会返回一个 Promise 对象。且返回一个Promsie 对象这个任务是同步的。只是该 Promsie 的状态，需要在执行 then 方法的回调函数后，才能**最终**确定。

  > 注意辨析：then 方法返回的 Promsie，then 方法的回调函数返回的 Promise

   * 如果 then 方法的回调函数返回一个 Promise（记为 inPromsie），当 inPromsie 被 resolve 后，**微任务队列会推入一个任务，而这个任务的作用是 resolve then 方法返回的promise**。而在此之前， then 方法返回的 promise 处于 pending 状态。
   * 否则，then 方法的回调函数执行完毕后，then 方法返回的 Promsie 直接变为 resolved。没有微任务队列这一步

  > 也就是说，当 then 方法执行完毕时，一定会返回一个 promsie。且其返回的 promsie 只有一种状态：pending。当 then 方法的回调函数完毕后，该 promsie 的状态可能立即变为 resolved，也可能之后再变成 resolved（等到微任务队列中，修改 Promise 状态的任务被执行后）





函数 resolve => {resolve();} 执行，导致 Promise 被 resolve



执行 then 方法，由于 Promise 已被 resolve，所以回调函数

```javascript
// task1
() => {
    new Promise(resolve => {
      resolve();
    })
      .then(() => {
        console.log("log: 内部第一个then");
        return Promise.resolve();
      })
      .then(() => console.log("log: 内部第二个then"));
  }
```

被放入微任务队列。该then 方法返回一个处于 pending 状态的 promise**（记为 Promsie1）**。



// 微任务队列：task1



执行下一个 then 方法，由于promise1 目前没有 resolve ，所以这个 then 方法的回调函数

```javascript
// tempSave1
() => console.log("log: 外部第二个then")
```

暂存于 上一个 then 方法返回的 promise 内部。这个 then 方法返回一个处于 pending 状态的 promsie**（记为 Promsie2）**。



当前所有同步代码执行完毕，现在执行微任务队列中任务。



task1 执行，函数 resolve => {resolve();} 执行，导致 Promise 被 resolve

执行 then 方法，由于 Promise 已被 resolve，所以回调函数

```javascript
// task2
() => {
        console.log("log: 内部第一个then");
        return Promise.resolve();
      }
```

被放入微任务队列。该 then 方法返回一个未被 resolve（处于 pending 状态） 的 promise**（记为 Promsie3）**。



// 微任务队列：task2 



执行下一个 then 方法，promise3 目前没有 resolve，所以回调函数

```javascript
// tempSave2
() => console.log("log: 内部第二个then")
```

暂存于上一个 then 方法返回的 promsie 内部。该then 方法执行完毕，返回一个处于 pending 状态的 promise**（记为 Promsie4）**。



至此，task1 执行完毕，由于task1 没有返回值，则 Promsie1 状态由 pending 直接变为 resolved。这导致 tempSave1 被放入微任务队列。



// 微任务队列：task2 ,tempSave1 



继续执行微任务队列中的任务。执行 task2，输出“log: 内部第一个then”，返回一个被 resolve 的 Promise。



至此，task2 执行完毕，由于task2 返回了 一个 Promise 且 resolve 了，所以  一个用于将 Promsie3 的状态修改为 resolved 的任务被放入微任务队列。

```javascript
// resolvePromise3
将 Promsie3 的状态修改为 resolved
```

// 微任务队列：tempSave1,resolvePromise3



继续执行微任务队列中的任务。执行 tempSave1，输出“log: 外部第二个then”，由于tempSave1没有返回值，则 Promsie2 状态由 pending 直接变为 resolved。



至此，tempSave1 执行完毕。



// 微任务队列：resolvePromise3



接下来执行 resolvePromise3，将 Promsie3 的状态修改为 resolved，这导致 tempSave2 被放入微任务队列



// 微任务队列：tempSave2 



接下来执行 tempSave2 ，输出“内部第二个then”。由于tempSave2 没有返回值，则 Promsie4 状态由 pending 直接变为 resolved。

（妈呀，绕死我了）

---

####  [Promise.all()](https://es6.ruanyifeng.com/#docs/promise#Promise-all)

对于 

```javascript
const p = Promise.all([p1, p2, p3]);
```

* 只有`p1`、`p2`、`p3`的状态都变成 resolved，`p`的状态才会变成resolved，此时`p1`、`p2`、`p3`的返回值组成一个数组，传递给`p`的回调函数。

```javascript
const p1=new Promise(resolve=>setTimeout(()=>resolve(1),5000))
const p2=new Promise(resolve=>setTimeout(()=>resolve(2),5000))
const p3=new Promise(resolve=>setTimeout(()=>resolve(3),5000))

const p = Promise.all([p1, p2, p3]);
p.then(args=>console.log(args)) // 5s 后打印 [1,2,3]
```

* 只要`p1`、`p2`、`p3`之中有一个被`rejected`，`p`的状态就变成`rejected`，此时第一个被`reject`的实例的返回值，会传递给`p`的回调函数。

```javascript
const p1=new Promise((resolve,reject)=>setTimeout(()=>reject(1),2000))
const p2=new Promise(resolve=>setTimeout(()=>resolve(2),5000))
const p3=new Promise(resolve=>setTimeout(()=>resolve(3),5000))

const p = Promise.all([p1, p2, p3]);
p.catch(err=>console.log(err)) // 2s 后打印 1
```

* 如果作为 all 参数的 Promise 实例，自己定义了`catch`方法，那么它一旦被`rejected`，并不会触发`Promise.all()`的`catch`方法。

  > 下面代码中，`p1`会`resolved`，`p2`首先会`rejected`，但是`p2`有自己的`catch`方法，该方法返回的是一个新的 Promise 实例，`p2`指向的实际上是这个实例。该实例执行完`catch`方法后，也会变成`resolved`，导致`Promise.all()`方法参数里面的两个实例都会`resolved`，因此会调用`then`方法指定的回调函数，而不会调用`catch`方法指定的回调函数。

  ```javascript
  const p1 = new Promise((resolve, reject) => {
    resolve('hello');
  })
  .then(result => result)
  .catch(e => e);
  
  const p2 = new Promise((resolve, reject) => {
    throw new Error('报错了');
  })
  .then(result => result)
  .catch(e => e);
  
  Promise.all([p1, p2])
  .then(result => console.log(result))
  .catch(e => console.log(e));
  // ["hello", Error: 报错了]
  ```

  

---

#### [Promise.race()](https://es6.ruanyifeng.com/#docs/promise#Promise-race)

对于

```javascript
const p = Promise.race([p1, p2, p3]);
```

* 只要`p1`、`p2`、`p3`之中有一个实例率先改变状态，`p`的状态就跟着改变。那个率先改变的 Promise 实例的返回值，就传递给`p`的回调函数。即"竞态"。

  ```javascript
  const p1=new Promise(resolve=>setTimeout(()=>resolve(1),1000))
  const p2=new Promise(resolve=>setTimeout(()=>resolve(2),2000))
  const p3=new Promise(resolve=>setTimeout(()=>resolve(3),3000))
  
  const p = Promise.race([p1, p2, p3]);
  p.then(first=>console.log(first)) // 1s 后，打印 1
  ```

* 注意上面说的是”刷先改变状态“，所以率先 reject 也会改变 p 的状态。

```javascript
const p1=new Promise((resolve,reject)=>setTimeout(()=>reject(1),1000))
const p2=new Promise(resolve=>setTimeout(()=>resolve(2),2000))
const p3=new Promise(resolve=>setTimeout(()=>resolve(3),3000))

const p = Promise.race([p1, p2, p3]);
p.catch(first=>console.log(first)) // 1s 后，打印 1
```

---

#### Promise.allSettled()

* 有时候，我们不关心异步操作的结果，只关心这些操作有没有结束。这种场合下，Promise.all() 受制于“有异步操作 reject 就确定下 Promise 状态，并执行回调函数“的特点，不能满足需求。

```javascript
const p1=new Promise((resolve,reject)=>setTimeout(()=>reject(1),1000))
const p2=new Promise(resolve=>setTimeout(()=>resolve(2),2000))
const p3=new Promise(resolve=>setTimeout(()=>resolve(3),3000))

const p = Promise.all([p1, p2, p3]);
p.catch(err=>console.log('有一个参数 reject 了，其它参数情况未知')) //
```

* 而  Promise.allSettled 不同，只有所有参数 Promise 实例都有确定的状态（resolved 或 rejected）,p才会 resolved，并给回调函数传递具体的 status数组。



​		对于 resolved 的参数Promise，会给出 resolve 的值，对于 reject 的参数Promise，会给出 reject 的原因。

```javascript
const p1=new Promise((resolve,reject)=>setTimeout(()=>reject(1),1000))
const p2=new Promise(resolve=>setTimeout(()=>resolve(2),2000))
const p3=new Promise(resolve=>setTimeout(()=>resolve(3),3000))

const p = Promise.allSettled([p1, p2, p3]);
p.then(allResults=>console.log(allResults)) 
/**
 * 3s 后，打印
 * [{status: "rejected", reason: 1},{status: "fulfilled", value: 2},{status: "fulfilled", value: 3}]
 */

```

---

#### Promise.prototype.finally()

`finally()`方法用于指定不管 Promise 对象最后状态如何，都会执行的操作。



 注意 finally 只是不管成功还是失败都会执行而已，而不会永远最后执行

```javascript
new Promise((resolve, reject) => {
    resolve();
}).finally(() => {
    console.log('finally1');
}).then(() => {
    console.log('then');
}).finally(() => {
    console.log('finally2');
});
```
---
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
