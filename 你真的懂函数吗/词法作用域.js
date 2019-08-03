

/**
 * 编译器在遇到var a的时候，会询问作用域是否已经有一个该名称的变量存在于同一个作用域，如果有，编译器会忽略该声明，继续进行编译；
 * 否则它会要求作用域在当前作用域的集合中声明一个新的变量，并命名为 a。
 */

// console.log(a);//function a(){}
// var a = 10;
// function a(){

// }
// console.log(a);//10

// 实际编译顺序为

// function a(){

// }
// var a 

// console.log(a);
// a=10;
// console.log(a);




// 原代码
var num=10;
fun();
function fun(){
    console.log(num);
    var num=20;
}


// 全局词法解析(发现有哪些声明)
function fun(){} // 声明一个函数

var num; // 声明一个全局变量

// 全局运行代码
num=10; // 这句代码是第1句运行的代码
fun(); // 这句代码是第2句运行的代码

// fun词法解析
var num;

// fun运行代码
function fun(){ // 这句代码是第3句运行的代码
    console.log(num); // 这句代码是第4句运行的代码
    num=20; // 这句代码是第5句运行的代码
} // 这句代码是第6句运行的代码

