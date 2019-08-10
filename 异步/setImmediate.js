let p1=new Promise((resolve,reject)=>{
    setTimeout(()=>{
        console.log('1');
        resolve('p1 rsv');
    },0);
})


setImmediate(()=>{
    console.log('2');
})

p1.then(r=>{
    console.log('3');
})

/**
 * 输出:
 * 2
 * 1
 * 3
 */