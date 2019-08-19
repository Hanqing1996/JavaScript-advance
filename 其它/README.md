# 其它

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
if(0){
    console.log('yes');
}
else{
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
5. [...obj1,...obj2]
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
#### JSON.parse(JSON.stringif(data))
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