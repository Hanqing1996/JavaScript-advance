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
 * 注意下面代码中fn与fm都是具名函数
 * 但是，fn是一个局部变量,作用域为函数fn内部;而fm是一个全局变量,作用域为全局
 */

function fm()
{
    console.log('I am fm');
}


var fn1=function fn()
{
    console.log(fn); //在函数内部可以访问到函数fn
}

fn1() // [Function: fn]
console.log(fm); // // [Function: fm]
console.log(fn); // fn is not defined,说明在在函数外部不可以访问到函数fn


/**
 * 箭头函数
 */
var fn3=(i,j)=>i+j;

fn3(1,2) // 3