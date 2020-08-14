# 其它
#### 类型转换
* [参考](https://github.com/mqyqingfeng/Blog/issues/159)
#### 原始值转布尔
我们使用 Boolean 函数将类型转换成布尔类型，在 JavaScript 中，只有 6 种值可以被转换成 false，其他都会被转换成 true。
```
console.log(Boolean()) // false

console.log(Boolean(false)) // false

console.log(Boolean(undefined)) // false
console.log(Boolean(null)) // false
console.log(Boolean(+0)) // false
console.log(Boolean(-0)) // false
console.log(Boolean(NaN)) // false
console.log(Boolean("")) // false
```
注意 <code>Boolean(-2)</code> 的结果是 true

#### 原始值转数字
我们可以使用 Number 函数将类型转换成数字类型，如果参数无法被转换为数字，则返回 NaN。根据 ES5 规范，如果 Number 函数不传参数，返回 +0，如果有参数，调用 ToNumber(value)。而 ToNumber 则直接给了一个对应的结果表。
| 参数类型  |                      结果                      |
| :-------: | :--------------------------------------------: |
| Undefined |                      NaN                       |
|   Null    |                       +0                       |
|  Boolean  | 如果参数是 true，返回 1。参数为 false，返回 +0 |
|  Number   |                返回与之相等的值                |
|  String   |              这段比较复杂，看例子              |
```
console.log(Number()) // +0

console.log(Number(undefined)) // NaN
console.log(Number(null)) // +0

console.log(Number(false)) // +0
console.log(Number(true)) // 1

console.log(Number("123")) // 123
console.log(Number("-123")) // -123
console.log(Number("1.2")) // 1.2
console.log(Number("000123")) // 123
console.log(Number("-000123")) // -123

console.log(Number("0x11")) // 17

console.log(Number("")) // 0
console.log(Number(" ")) // 0

console.log(Number("123 123")) // NaN
console.log(Number("foo")) // NaN
console.log(Number("100a")) // NaN
```
> 如果通过 Number 转换函数传入一个字符串，它会试图将其转换成一个整数或浮点数，而且会忽略所有前导的 0，如果有一个字符不是数字，结果都会返回 NaN，鉴于这种严格的判断，我们一般还会使用更加灵活的 parseInt 和 parseFloat 进行转换。

> parseInt 只解析整数，parseFloat 则可以解析整数和浮点数，如果字符串前缀是 "0x" 或者"0X"，parseInt 将其解释为十六进制数，parseInt 和 parseFloat 都会跳过任意数量的前导空格，尽可能解析更多数值字符，并忽略后面的内容。如果第一个非空格字符是非法的数字直接量，将最终返回 NaN：
```
console.log(parseInt("3 abc")) // 3
console.log(parseFloat("3.14 abc")) // 3.14
console.log(parseInt("-12.34")) // -12
console.log(parseInt("0xFF")) // 255
console.log(parseFloat(".1")) // 0.1
console.log(parseInt("0.1")) // 0
```
#### 原始值转字符
我们使用 String 函数将类型转换成字符串类型。如果 String 函数不传参数，返回空字符串，如果有参数，调用 ToString(value)，而 ToString 也给了一个对应的结果表。表如下：
| 参数类型  | 结果                                                     |
| --------- | -------------------------------------------------------- |
| Undefined | "undefined"                                              |
| Null      | "null"                                                   |
| Boolean   | 如果参数是 true，返回 "true"。参数为 false，返回 "false" |
| Number    | 又是比较复杂，可以看例子                                 |
| String    | 返回与之相等的值                                         |
```
console.log(String()) // 空字符串

console.log(String(undefined)) // undefined
console.log(String(null)) // null

console.log(String(false)) // false
console.log(String(true)) // true

console.log(String(0)) // 0
console.log(String(-0)) // 0
console.log(String(NaN)) // NaN
console.log(String(Infinity)) // Infinity
console.log(String(-Infinity)) // -Infinity
console.log(String(1)) // 1
```
#### 原始值转对象
> 原始值到对象的转换非常简单，原始值通过调用 String()、Number() 或者 Boolean() 构造函数，转换为它们各自的包装对象。

> null 和 undefined 属于例外，当将它们用在期望是一个对象的地方都会造成一个类型错误 (TypeError) 异常，而不会执行正常的转换。
```
var a = 1;
console.log(typeof a); // number
var b = new Number(a);
console.log(typeof b); // object
```
#### 对象转布尔值
对象到布尔值的转换非常简单：所有对象(包括数组和函数)都转换为 true。
```
console.log(Boolean([])) // true
console.log(Boolean(new Boolean(false))) // true
```
---
#### ==和===
#### ==
* [参考](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/%E7%9B%B8%E7%AD%89)
```
如果两个操作数都是对象，则仅当两个操作数都引用同一个对象时才返回true。
如果一个操作数是null，另一个操作数是undefined，则返回true。
如果两个操作数是不同类型的，就会尝试在比较之前将它们转换为相同类型：
	当数字与字符串进行比较时，会尝试将字符串转换为数字值。
	如果操作数之一是Boolean，则将布尔操作数转换为1或0。
		如果是true，则转换为1。
		如果是 false，则转换为0。
	如果操作数之一是对象，另一个是数字或字符串，会尝试使用对象的valueOf()和toString()方法将对象转换为字符串。
如果操作数具有相同的类型，则将它们进行如下比较：
	String：true仅当两个操作数具有相同顺序的相同字符时才返回。
	Number：true仅当两个操作数具有相同的值时才返回。+0并被-0视为相同的值。如果任一操作数为NaN，则返回false。
	Boolean：true仅当操作数为两个true或两个时才返回false。
```

#### ===
* [参考](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Strict_equality)
```
If the operands are of different types, return false.
If both operands are objects, return true only if they refer to the same object.
If both operands are null or both operands are undefined, return true.
If either operand is NaN, return false.
Otherwise, compare the two operand's values:
	Numbers must have the same numeric values. +0 and -0 are considered to be the same value.
	Strings must have the same characters in the same order.
	Booleans must be both true or both false.
```
---
#### == 与 === 的不同
> 最显着的区别在于，严格等于运算符不尝试类型转换。相反，严格相等运算符始终将不同类型的操作数视为不同。

#### 清除页面定时器:window.clearInterval(timerId)
```
let timerId=setInterval(() => {
    n += 10
    this.setState({
    style: {
        transform: `translateX(${n}%)`
    }
    })
    if(n>=100){
    window.clearInterval(timerId)
    }
}, 1000)
```
#### 用setTimeout模拟setInterval
setInterval会不停执行，浪费内存，所以要改用setTimeout
```
let index = 0
let run = () => {
    console.log(index);
    index++
    setTimeout(run, 3000)
}
run()
```
等价于
```
let index = 0
let run = () => {
    setInterval(() => {
        console.log(index);
        index++
    }, 3000)
}
run()
```

#### export
1. 常见用法
```
// a.js
export default "some data";
```
```
// b.js
import PrivateKey from "./a.js";
```
这段代码是（且仅仅是）以下代码的缩写：
```
// a.js
export const someValue = "some data";
```
```
// b.js
import { someValue as PrivateKey } from "./a.js";
```
2. 将 import 和 export 放在一句话里
```
export {default as GIcon} from './components/button/icon'
```
等价于
```
import {GIcon} from './components/button/icon'
export GIcon
```
2. “只执行一次”
在一个应用（比如 create-react-app）里
```
// useTags.tsx
import {useState} from 'react';
import createId from "../lib/idCreator";

console.log('file do');

const useTags = () => {
    console.log('useTags do')
    return {tags, createTag}
}

export default useTags
```
如果有两个页面（组件）import 了 useTags.tsx 的 useTags 方法
```
// Tags.tsx
import useTags from "../../store/useTags";
```
```
//MoneyTags.tsx
import useTags from "../../store/useTags";
```
> 从 Tags 页面切换到 MoneyTags 页面，'useTags do'会输出两次，但是'file do'只会输出一次（Tags 页面mounted的那次）。也就是说尽管被引用的方法会多次被调用，但原js文件只执行一次


#### 默认值设置 num=num||1
设置num的默认值为1
```
let num=null
num=num||1
```

#### 7/3结果为小数
```
console.log(7/3); // 2.3333333333333335
```

#### 6种数据类型(大小写无所谓ie)
* number
* string
* bool
* undefined
* null
* object

#### if(a=b)
```
let temp;

if(temp=1+2)
console.log('end'); // end
```
等价于
```
let temp=1+2;

if(temp)
console.log('end'); // end
```

#### 6个假值
```
let value=0

if(value) {
    console.log('yes');
}

if(!value){
    console.log('no');
}

// no
```
1. false (布尔型)
2. null (用于定义空的或者不存在的引用)
3. undefined (未定义值)
4. 0 (数值型)
5. '' (空字符串) (字符型)
6. NaN

#### a=1不一定是声明了一个全局变量
```
function fn(){
    var a;
    function fn2(){
        a=1;
        console.log(window.a);
    }
    fn2();
}

fn(); // undefined
```

#### var可以重复声明 
```
var a=1

var a=2
```

#### var服从函数作用域，不服从块级作用域
* var服从函数作用域
```
function fn(){
    var a=2
}

console.log(a) // a is not defined
```
* var 不服从块级作用域
```
{
    var a=2
}
console.log(a) // 2
```

#### let不存在变量提升
```
let a=1
{
    let a=2
    {
        /**
         * Temp Dead Zone
         */ 

        console.log(a) // 报错：Cannot access 'a' before initialization
        
        let a=3
        {

        }
    }
}
```

#### let不可以重复声明
```
let a;
let a=2; // 报错：Identifier 'a' has already been declared
```

#### const在声明时就必须赋值
```
const a; // 报错：Missing initializer in const declaration
```

#### const不可以重复声明
```
const a=2;
const a; // 报错：Identifier 'a' has already been declared
```
#### const不可以重复赋值
```
const a=2;
a=3; // 报错：Assignment to constant variable.
```
* but这样是允许的
```
const user={
    name:'liming',
    age:12
}

user.age=13

console.log(user);
```
#### const服从块级作用域
```
{
    const num=1
    console.log(num) //1
}
{
    const num=2
    console.log(num) //2
}
```
#### for循环细节
```
for(语句1;语句2;语句4) {
    语句3;
}

语句1, 先执行,且只执行1次.

然后 语句2 判断,如为真,则执行语句3,然后执行语句4;如为假,则for结束

再

语句2判断..... 循环

直到语句2为假,for结束
```
#### for循环与var
```

for(var i=0;i<6;i++){
    setTimeout(()=>{console.log(i);},0) 
}

// 访问同一个 i 6次
```

#### for循环与let
```
setTimeout(()=>{console.log('end');},0)  
for(var i=0;i<6;i++){
    let j=i;
    setTimeout(()=>{console.log(j);},0) // setTime1
}

console.log('start');
/**
 * 输出:
 * start
 * end
 * 0
 * 1
 * 2
 * 3
 * 4
 * 5
 * 
 */

 
/** 
1. setTime1会打印0~5;这说明函数setTime1在执行时访问到的是6个不同的变量j
2. let是不允许重复声明的，但上述代码没有报错，说明声明的是6个不同的变量
3. let的魔力在于，它使得函数在每次执行时能访问到不同的,特定的变量
*/
```
上面代码等价于
```
setTimeout(()=>{console.log('end');},0)  

// 这里的i作用域为for的()，这里的let为我们实现了上面的j
for(let i=0;i<6;i++){
    setTimeout(()=>{console.log(i);},0) 
}

console.log('start');
```
#### 处理默认参数(ES6之前)
```
function sum(a,b){
    
    a=a||0;
    b=b||0;

    /*
    if(b){
        b=b; // 没有什么意义，只是为了好看
    }
    else{
        b=0;
    }
    */

    return a+b;
}

sum(1);
```
#### 处理默认参数(ES6)
```
function sum(a=0,b=0){
    return a+b;
}

sum(1);
```
#### python与js在处理默认参数上的不同
* js:默认参数不共用(每次都初始化)
```
function sum(item,array=[]){
    array.push(item);
    return array;
}

sum(1); // [1]

sum(2); // [2]
```
* python:默认参数共用(只初始化一次)
```
def sum(item,array=[]):
	array.append(item)
	return array
	
	
print(sum(1)) // [1]	

print(sum(2)) // [1,2]
```
#### 剩余参数(ES5)
```
function sum(message){
    let result=0;

    for(let i=1;i<arguments.length;i++){
        result+=arguments[i];
    }

    return message+result;
}

sum('结果是',1,2,3,4,5); // 结果是15
```
#### 剩余参数(ES6)
```
function sum(message,...numbers){
    let result=0;

    for(let i=0;i<numbers.length;i++){
        result+=numbers[i];
    }

    return message+result;
}

sum('结果是',1,2,3,4,5); // 结果是15
```
#### ...
1. 数组操作(模式匹配)
* 获取数组的若干连续项
```
var arr1=[1,2,3,4,5,6];
var [a,b,c,...arr2]=arr1;

console.log(arr2) // [4,5,6]
```
* 向数组头尾插入元素
```
var arr1=[1,2,3,4,5,6];
var arr2=[0,...arr1,7];

console.log(arr2) // [0,1,2,3,4,5,6,7]
```
2. 处理函数剩余参数（见上面）
3. [将伪数组转换为数组](https://github.com/Hanqing1996/JavaScript-advance/tree/master/%E6%95%B0%E7%BB%84%E6%93%8D%E4%BD%9C)
4. 深度拷贝
```
let obj1={
    name:'Jack',
}

let obj2={...obj1};


obj1.gender='male'

console.log(obj2) // { name: 'Jack'}
```
5. {...obj1,...obj2}
* 合并对象
```
let obj1={
    name:'Jack',
}

let obj2={
    age:12
};

let obj3={...obj1,...obj2};

console.log(obj2) // { age: 12 }
```

#### obj={name:'liabi',age:12} obj2={...obj,age:13} 
```
let obj={name:'liabi',age:12}
let obj2={...obj,age:13} 
console.log(obj2) // {name:'liabi',age:13} ,即age 被覆盖了
```

#### {name,age,male}
* 解构赋值
```
var per={
    name:'liming',
    age:12,
    gender:'male'
}

var {name,age,gender}=per;

console.log(name); // liming
```
等价于
```
var per={
    name:'liming',
    age:12,
    gender:'male'
}

var name=per.name;
var age=per.age;
var gender=per.gender;

console.log(name); // liming
```
#### var {name}={name:'libai'}
```
var {name}={name:'libai'}
console.log(name) // libai
console.log(name)//{ name: 'libai' }
```
#### function createToast({propsData}){}  和 createToast( {propsData: toastOptions})
* 定义
```
function createToast({propsData})
{
    let toast = new Constructor({
        propsData
    })
}
```
* 调用
```
toastOptions={columns:[],selected:'news'}
createToast( {propsData: toastOptions})
```

#### {name:xingming}
* 重命名
```
var per={
    name:'liming',
}

var {name:xingming}=per;

console.log(xingming); // liming
```
#### {child:{name}}
* 取属性的属性
```
var per={
    name:'liming',
    child:{
        name:'libai'
    }
}

var {child:{name}}=per;

console.log(name);
```
等价于
```
var per={
    name:'liming',
    child:{
        name:'libai'
    }
}

var {child}=per

var {name}=child

console.log(name);
```
#### {name='libai'}
* 设置属性默认值
```
var per={
    age:19
}

var {name='libai'}=per;

console.log(name); // libai
```

#### [a=0,b=9]=[1]
```
var [a=0,b=9]=[1]

console.log(a)  // 1
console.log(b)  // 9 
```
意思是:a的默认参数为0,b的默认参数为9

#### [a, ,b]=[1,2,3]
```
var [a, ,b]=[1,2,3]

console.log(a) // 1
console.log(b) // 3
```
#### const newFormValue = {...props.value, [name]: value}
> 用于合并属性
```
const props={
    value:{
        username:'',
        password:''
    }
}

const name='username'
const value='libai'

const newFormValue = {...props.value, [name]: value}

console.log(newFormValue)//{username: "libai", password: ""}
```

#### 深度拷贝 
> 另外开辟一片内存空间，两个对象，分别置于两片空间

#### 浅拷贝
> 两个对象指针指向同一片内存空间

#### obj1=obj2属于浅拷贝
```
let obj1={
    name:'Jack',
}
let obj2=obj1

obj1.age=12

console.log(obj2) // { name: 'Jack', age: 12 }
```

#### Object.assign(obj1,obj2)属于深度拷贝
* 作用:将source的属性复制至target中,并返回target,属于深度拷贝
* obj1必须之前已经被赋值为对象
```
let obj1
let obj2={name:'Jack'}
Object.assign(obj1,obj2)
// 报错：Cannot convert undefined or null to object
```


#### Object.assign({}, obj1)属于深度拷贝
```
let obj1={name:'Jack'}
let obj2=Object.assign({}, obj1)
obj1["age"]=12

console.log(obj2) // { name: 'Jack' }
```

#### Object.assign(obj1)属于浅拷贝
```
let obj1={name:'Jack'}
let obj2=Object.assign(obj1) // 等价于obj2=obj1
obj1["age"]=12

console.log(obj2) // { name: 'Jack', age: 12 }
```

#### 特殊：Object.assign(obj1,obj2)中obj2存在子对象的情况
* 由于复制的是属性，obj1被赋与的属性值是一个地址，指向内存中子对象所在空间,即：原对象深度拷贝,子对象浅拷贝
```
let obj1={
    name:'Jack',
    child:{
    name:'len'
    }
}

let obj2={};

Object.assign(obj2,obj1)

obj1.gender='male'
obj1.child.gender='female'

console.log(obj2) // { name: 'Jack', child: { name: 'len', gender: 'female' } }
```
#### JSON.parse(JSON.stringify(data))
* data不可以是复杂对象(复杂对象定义如下)
1. data不包含日期,正则，函数，循环引用属性
2. data不包含undefined属性
```
let obj1={
    name:'liming'
}

let obj2=JSON.parse(JSON.stringify(obj1))

obj1.age=12

console.log(obj2); // {name: "liming"}
```

#### 如何实现复杂对象的深度拷贝
递归
