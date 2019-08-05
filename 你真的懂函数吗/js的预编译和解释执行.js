
var a = 1;
console.log(a);
function test(a) {
  console.log(a);
  var a = 123;
  console.log(a);
  function a() {}
  console.log(a);
  var b = function() {}
  console.log(b);
  function d() {}
}
var c = function (){
console.log("I at C function");
}
console.log(c);
test(2);

/**
 * 以下为我对预编译(声明)和解释执行(运行)的理解
 */

 /*
// 全局声明
function test(){}
var a
var c

// 全局运行
a=1;
console.log(a); // 1
c = function (){
    console.log("I at C function");
    };
console.log(c); // [Function: c]
test(2);    


// test声明
function a() {} // 局部变量a的值被修改为一个函数
function d() {}
//var a // 此声明无效
var b

// test运行
console.log(a); // [Function: a]
a=123;
console.log(a); // 123
console.log(a); // 123
b = function() {}; 
console.log(b); // [Function: b]
*/


