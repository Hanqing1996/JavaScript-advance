/**
 * 匿名函数
 */
var fn=function()
{
    console.log('1')
}

fn2=fn; // 指向同一个函数
console.log(fn2.name); // 是匿名函数，但有name


/**
 * 具名函数
 */
var fn1=function fn()
{
    console.log('1')
}

fn1() //1
fn() //undefined