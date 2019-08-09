function buyFruit(){
    return new Promise((resolve,reject)=>{ // 注意resolve,reject不是回调函数
        setTimeout(()=>{
            resolve('apple') // s1执行,接下来将执行s2
        },10000)
    })
}

var promise=buyFruit()

console.log(promise);
/**
 * 如果不断在控制台输入console.log(promise)，会发现promise在变化，
 * 10秒前打印的promise的PromiseValue是undefined,10秒后是apple
 */



function fn(){
    return new Promise((resolve,reject)=>{
        setTimeout(() => {
        console.log('2');
    }, 10000);

        resolve('apple')
    })
}

console.log(fn());

/**
 * 输出
 * Promise {<resolved>: apple}
 * __proto__: Promise
 * [[PromiseStatus]]: "resolved"
 * [[PromiseValue]]: apple
 * 
 * 10秒后输出
 * 2
 *
 */



function fn(){
    return new Promise((resolve,reject)=>{ 
        setTimeout(()=>{
            console.log('1');
            resolve('apple')
        },10000)
    })
}

var res=fn();
console.log(res);

/**
 * 输出
 * Promise {<resolved>: undefined}
 * __proto__: Promise
 * [[PromiseStatus]]: "resolved"
 * [[PromiseValue]]: undefined
 * 
 * 10秒后输出
 * 1
 *
 */



function fn(){
    return new Promise((resolve,reject)=>{ 
        setTimeout(()=>{
            console.log('1');
            resolve('apple')
        },10000)
    })
}

var res=await fn();
console.log(res);

/**
 * 10秒后,输出
 * apple
 *
 */


