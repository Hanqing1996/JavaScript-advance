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
            resolve('apple')
        },10000)
    })
}

var res=await fn();

/**
 * 如果不断输入console.log(res);
 * 10秒内,输出res is not defined
 * 10秒后,输出apple
 *
 */



console.log('1');
let p1=new Promise((resolve,reject)=>{
    console.log('2');
    setTimeout(()=>{
        console.log('3');
        resolve('p1 rsv')
    },1000);
})

let p2=new Promise((resolve,reject)=>{
    setTimeout(()=>{
        console.log('4');
        resolve('p2 rsv')
    },500);
})

console.log('5');

p1.then(r=>{
    console.log('6');
})

p2.then(r=>{
    console.log('7');
})

/**
 * 输出：
 * 1
 * 2
 * 5
 * 4
 * 7
 * 3
 * 6
 */


/**
 * resolve是同步的
 * then()是异步的,会被放入eventloop中，按照eventloop中异步函数顺序执行
 */
console.log('1');
let p1=new Promise((resolve,reject)=>{
    console.log('2');
    setTimeout(()=>{
        console.log('3');
        resolve('p1 rsv');
        console.log(p1);
        console.log('4');
    },1000);
    console.log('5');
})

console.log('6');

p1.then(r=>{
    console.log('7');
})

console.log('8');

 /**
 * 输出：
 * 1
 * 2
 * 5
 * 6
 * 8
 * 3
 * Promise { 'p1 rsv' }
 * 7
 * 4
 */


/**
 * then()一定在resolve()之后执行,但不一定是立即执行。因为then()是异步的，必须按照eventloop中异步函数顺序执行
 * eventloop中异步函数的顺序可以理解为异步函数的代码顺序
 */
 setTimeout(()=>{
    console.log('4');
},0)

console.log('1');
let p1=new Promise((resolve,reject)=>{
    console.log('2');
    setTimeout(()=>{
        console.log('3');
        resolve('p1 rsv');
    },0);
})

p1.then(r=>{
    console.log('5');
})

console.log('6');
/**
 * 输出：
 * 1
 * 2
 * 6
 * 4
 * 3
 * 5
 */