# 面向对象

#### 封装
隐藏细节

#### 继承
复用代码

#### 多态
更灵活。一个东西拥有多种东西的属性

#### Object.entries(object1))
```
const object1 = {
  a: 'somestring',
  b: 42
};

console.log(Object.entries(object1)))// [['a','somestring'],['b',42]]
```


#### delete 删除对象的某个属性
```
let per={name:"libai",age:20}

delete per.name

console.log(per) // {age:20}
```
#### 对象转字符串（序列化）
```
let obj={name:'libai',age:20}
JSON.stringify(obj) // "{name:'libai',age:20}"
```
* 不可以直接 toString()
```
let person={age:12,name:'libai'}
person.toString() //"[object Object]"
```

#### 字符串转对象（反序列化）
```
JSON.parse('{"foo" : 1 }'); // {foo:1}
```

#### 为什么后端给前端传的是字符串而非对象
> 因为 HTTP 协议只支持字符串或二进制

#### 'age' in obj
```
let obj={name:'libai',age:20,gender:true}
'age' in obj // true
```

#### person2 = {name:"rick"};重新开辟内存空间给 person2
```
let setPerson = function(person2){
 person2.name = "kevin";
 person2 = {name:"rick"};
};
let person = {name:"alan"};
setPerson(person);

console.log(person.name) // "kevin"
```
等效于
```
let person = {name:"alan"};
let person2 =person // 浅拷贝
person2.name = "kevin";
person2 = {name:"rick"}; // 重定向，即重新开辟内存空间给person2
```
内存变化过程为
```
let person = {name:"alan"};

//栈内存：
person:A1

//堆内存A1处
{name:"alan"}
```
```
let person2 =person 

//栈内存：
person2:A1
```
```
person2.name = "kevin";

//堆内存A1处
{name:"kevin"}
```
```
person2 = {name:"rick"}; 

//栈内存：
person2:A2

//堆内存A2处
{name:"rick"}
```
所以堆内存A1处被修改了一次，变为"kevin"
#### arr.indexOf(obj)
```
let obj={name:'libai'}
let arr=[obj]
let copy = JSON.parse(JSON.stringify(obj))

arr.indexOf(copy) // -1
arr.indexOf(obj) // 0
```
原因：indexOf是按内存索引对象，而copy是obj的深拷贝，二者处于不同的内存空间中
* 但是浅拷贝是找得到的
```
let obj={name:'libai'}
let arr=[obj]
let copy = obj

arr.indexOf(copy) // 0
```
由此可以推测indexOf的索引依据是obj是否与arr元素中的某个元素指向同一个堆地址
> 如果我们想要判断数组中有无某个对象，应该用filter
```
let obj={name:'libai'}
let arr=[obj]
let copy = JSON.parse(JSON.stringify(obj))

// 接下来通过id查找
let targetId=obj.id
if(arr.filter(item=>item.id===targetId).length){
    console.log('找到了')
}
```


#### let obj={} obj.age={} 内存变化
```
let obj={} 
obj.age=undefined
obj.age={}
```
内存变化
```
let obj={}
obj.age=undefined

// 栈内存
obj:A1

// 堆内存A1处
age:undefined
```
```
obj.age={}

// 堆内存A1处
age:A2

// 堆内存A2处
{}
```

#### obj.age.type/undefined 与 obj.age.type.required/error
```
let obj={'age':12}
obj.age //12
obj.age.type // undefined
obj.age.type.required // error
```
undefined 与 error 的区别
```
errors.email=undefined
expect(errors.email).to.not.exist  // errors.email 为 undefined,测试通过
expect(errors.email.required).to.not.exist  // errors.email.required 为 error,测试不通过(会报错)
```

#### {sayHi(){console.log('h1')}}
```
const per={sayHi(){
    console.log('h1')
}}

console.log(per) //{sayHi:function(){console.log('h1')}}
```

#### Object.freeze()
1. 对象被冻结后,不能向这个对象添加新的属性，不能删除已有属性，不能修改该对象已有属性的可枚举性、可配置性、可写性，以及不能修改已有属性的值。此外，冻结一个对象后该对象的原型也不能被修改。
```
const obj = {
  prop: 42
};

Object.freeze(obj);

obj.prop = 33;

console.log(obj.prop); // 42
```
2. freeze() 返回和传入的参数相同的对象。
```
var obj = {
  prop: function() {},
  foo: 'bar'
};

var o = Object.freeze(obj);

o === obj; // true
```
3. obj被冻结，但obj的对象类型属性不会被冻结
```
const obj={
    child:{
        name:'nezha'
    }
}

Object.freeze(obj)

obj.child.age=12 

console.log(obj.child.age) // 12
```

#### Object.defineProperty()与get/set的区别
1. get/set用于读写一个新创建的对象的属性
```
let age=18

let per={
    get age(){return age},
    set age(value){if(value<100)age=value;else age=100}
}

per.age=12
console.log(per.age) // 12
```
2. Object.defineProperty()用于读写一个已经创建的对象的属性(比如项目更新，要求不得改动旧代码)
```
let a=1,b=2
let oldObj={a,b}


Object.defineProperty(oldObj,'a',{
    get(){
        return a
    },
    set(value){
        a=value
    }

})

oldObj.a=3
console.log(oldObj.a) // 3
``` 
3. 
```
let _name = 'MyName'
let obj = {}
Object.defineProperty(obj, 'name', {
    get(){
        return _name
    },
    set(value){
        _name = value  // _name=value;obj['name']=_name
    }
})

obj.name = 'NewName'
console.log(_name) // 'NewName'
```
#### 关键字的概念
* 关键字不能声明同名变量
```
let undefined    // 不报错
let null         // 报错：Unexpected token null
```
#### Object的属性遍历
1. 遍历属性的两种方法
```
let o={a:'1',b:'2',c:'3'}

/**
 * 方法1
 */
for(let key in arr)
console.log(key) // 0 1 2

/**
 * 方法2
 */
let keys=Object.keys(o)
for(let key in keys)
console.log(key) // 0 1 2
```
2. 数组的遍历和对象的遍历本质是一样的,下标可看作数组的属性名，元素可看作对应属性值
```
var arr=['a','b','c']

for(let key in arr)
console.log(`${key}:${arr[key]}`) // 0:a 1:b 2:c
```
3. 有些属性可以遍历到，有些属性不可以遍历到
比如toString是arr的属性,但不会被遍历到
```
var arr=['a','b','c']

'toString' in arr // true    
```
#### enumerable:设置某个属性是否可被遍历到
```
let o={
    name:'libai',
    age:12,
    height:189
}

Object.defineProperty(o,'age',{
    enumerable:false
})

for(let key in o)
console.log(key)      //  name height 
```
#### undefined的本质是window的只读属性

#### 设置对象的只读属性
```
let o={
    get name(){return 'libai'}
}

Object.defineProperty(o,'name2',{
    value:'libai',
    writable:false
})

o.name='dufu'
console.log(o.name)  // libai

o.name2='dufu'
console.log(o.name2)  // libai
```
#### configurable
* 未使用configurable：A设置某属性不可读，B可以修改为可读
```
let o={
    name:'libai'
}

Object.defineProperty(o,'name',{
    writable:false
})

Object.defineProperty(o,'name',{
    writable:true
})

console.log(o.name)  // libai
```
* 使用configurable效果：A设置某属性不可读，B无法修改为可读
```
let o={
    name:'libai'
}

Object.defineProperty(o,'name',{
    writable:false,
    configurable:false
})

Object.defineProperty(o,'name',{
    writable:true
})

console.log(o.name)  // 报错:Cannot redefine property: name
```
#### a===1&&a===2&&a===3
```
var i=0
Object.defineProperty(window,'a',{
    get(){
        i+=1
        return i
    }
})

a===1&&a===2&&a===3 // true
```
 
#### obj['name']=12   obj[name]=12/为对象添加键值对   obj={[name]:12}  obj={name:12}/为空对象添加键值对 
* obj['name']=12
```
let obj={}
obj['name']=12

obj // {name:12}
```
* obj[name]=12
> name未赋值
```
let obj={}
obj[name]=12

obj // {'':12}
```
> name已赋值
```
let name='a'
let obj={}
obj[name]=12

obj // {a:12}

let age='b'
obj[age]=15
obj // {a:12,b:15}, 这是为已有键值对的对象添加键值对
```
* obj={[name]:12}
```
let obj={}
let name='a'
obj={[name]:12}

obj // {a: 12}
```
* obj={name:12}
```
let obj={}
obj={name:12}

obj // {name: 12}，这是为空对象添加键值对的常见做法 
```
#### var obj={a,b,c}
```
/**
 * 属性缩写:变量名作为属性名,变量值作为属性值
 */
let a=1,b='foo',c={}

var obj={a,b,c}

obj // {a: 1, b: "foo", c: {}}
```
#### var obj={sayHi(){}}
```
/** 
 * 省略"function"
 */

var obj={
    sayHi(){
        console.log('hi')
    }
}

obj.sayHi // ƒ sayHi(){console.log('hi')}
```

#### 如何生成一个空对象
1. 生成只有基本属性(存于__proto__)的空对象
```
var obj=new Object() // 等价于 var obj={}

```
2. 生成没有任何属性的真正空对象
```
var obj=Object.create(null)

obj // No properties
```

#### Object.keys(obj)
```
let obj={prop1:'a',prop2:'b',prop3:'c'}
let keys=Object.keys(obj)
for(let i=0;i<keys.length;i++){
    console.log(keys[i])
}

// 输出:prop1 prop2 prop3
```

#### [object的存储](https://xiedaimala.com/tasks/5833c9d4-ebd5-44e4-91b5-661f476f9cad/video_tutorials/ccd79503-4f54-4b31-9f91-6f76f6073722)
```
// 在堆内存中开辟一块空间存储object的属性名和属性值,同时栈内存中保存对应堆地址
var baba={
    name:'Mayun',
    child:{
        name:'Sicong',
        sayName:function (){
            console.log(this.name);
        }
    }
}

// 栈内存
baba:A11

// 堆内存A11处
name:'Mayun'
child:A22

// 堆内存A22处
name:'Sicong'
sayName:A34

// 堆内存A34处
{name:sayName,functionBody:'console.log(this.name);'}
```

#### 函数是一个对象
```
// obj是一个函数，也是一个对象
var obj={
    name:'fn1',
    length:2,
    params:['x','y'],
    functionBody:'console.log("hello world")',
}

// 公共属性/方法
objGongYong={
    call:function(x){

        // eval的作用是执行字符串
        eval(x.functionBody)
    }
}

obj.__proto__=objGongYong

obj.call(obj) // hello world
```

#### let a=Object.create(b):等价于a.__proto__=b
```
let name='libai'
let b={name}
let a=Object.create(b)

a.name // libai
```



#### 对构造函数中的this的理解
* 是{}

#### 函数Human的两种调用方法
1. 返回对象
```
function Human(color,name){

    this.color=color;
    this.name=name; 
}

var per=new Human('yellow','xiaoming')

console.log(per); // { color: 'yellow', name: 'xiaoming' }
```
等价于
```
function Human(color,name){

    this={};

    this.color=color;
    this.name=name; 

    this.__proto__=Human.prototype;

    return this;
}

var per=new Human('yellow','xiaoming')

console.log(per); // { color: 'yellow', name: 'xiaoming' }
```
2. 不返回对象(此时Huamn就是一个普通的函数，对call时的第一个参数进行一些操作，不是构造函数)
```
// Human就是一个普通的函数!!!不是构造函数!!!
function Human(color,name){

    this.color=color;
    this.name=name; 
}

var per={hobby:'football'};

Human.call(per,'yellow','xiaoming')

console.log(per); // { hobby: 'football', color: 'yellow', name: 'xiaoming' }
```

#### 为已有的类添加公共属性
```
Human.prototype.newFn=()=>{
    ...
}
```
原理:obj.fn=obj._prop_.fn
```
class Validator {

    // 添加公共方法
    add(newType,fn){
        Validator.prototype[newType]=fn
    }
    ...
}
```

#### 构造函数规则
1. 构造函数大写
2. 构造函数省略Create
3. 构造函数若无参数，则不加()
```
new Solider
```

#### __proto__和prototype的区别
1. 函数才有prototype（window.XXX.prototype 除外）
2. 对象才有__proto__

#### [__proto__ 的优点：省内存](https://xiedaimala.com/tasks/5833c9d4-ebd5-44e4-91b5-661f476f9cad/video_tutorials/ccd79503-4f54-4b31-9f91-6f76f6073722)
```
let obj={name:'libai',age:17}
console.log(obj.toString()) // ƒ toString() { [native code] }
```
为什么我们创建的 obj 会具有 toString 方法？这是因为 js 的发明者们发现对象总是有公共属性/方法的。
```
let obj1={name:'libai',gender:true,sleep(){console.log('I'm sleeping')}}
let obj2={name:'zhangfei',gender:true,sleep(){console.log('I'm sleeping')}}
let obj3={home:'hz',gender:true,sleep(){console.log('I'm sleeping')}}
```
比如上述代码中，每个对象都有 gender 这个属性和 sleep 这个方法，但是每个对象都需要独立划分出两片内存空间存储它们。这在内存紧张的上世纪是极为浪费内存的行为。于是 js 的发明者想到，
```
// 栈内存
obj1:A1111
obj2:A2222
obj3:A3333

// 堆内存A444处
gender:true
sleep:A555

// 堆内存A555处
{name:sleep,functionBody:'console.log('I'm sleeping');'}

// 堆内存A1111处
name:'libai'
__proto__:A444

// 堆内存A2222处
name:'zhangfei'
__proto__:A444

// 堆内存A3333处
home:'hz'
__proto__:A444
```
堆内存A444处存放公共的属性/方法；每个对象只需通过 __proto__ 即可访问到它们。

#### 访问 __proto__ 
* 函数，数组，对象的 __proto__ 可以分别通过以下途径访问到
```
let obj={name:'libai'}
obj.__proto__===window.Object.prototype // true
window.Object.prototype.age=13
obj.age //13
```
```
let fn=()=>{console.log('hi')}
fn.__proto__===window.Function.prototype // true
```
```
let arr=[1,2,3]
arr.__proto__===window.Array.prototype // true
```
* Number,String,Symbol,Undefiend,Boolean 等同理
```
let a=12
a.__proto__===window.Number.prototype // true
```
```
let str='hi'
str.__proto__===window.String.prototype // true
```

#### 为什么是原型"链"
> 首先要明白层级关系，window.Object.prototype 是一切的顶端，window.Array.prototype,window.Array.prototype 都次于它。
```
// 修改 window.Object.prototype，会影响到 window.Array.prototype
window.Object.prototype.age=1000
window.Array.prototype.age //1000
```
``` 
// 但是修改 window.Array.prototype 不会影响 window.Object.prototype
window.Array.prototype.name='libai'
window.Object.prototype.age //undefined
```
> 如果我们想访问 arr.age，那么浏览器首先找 arr 有无 age字段，没有则去找 window.Array.prototype，再找不到则去找 window.Object.prototype。这构成了一条链状关系。
```
window.Object.prototype.age=1000
let arr=[1,2]
arr.age //1000
```

#### class 中的 __proto__
* new
```
jack = new Human(); 
```
等价于
```
jack.__proto__=Human.prototype
```
* extends
```
Asian extends Human
```
等价于
```
Asian.prototype.__proto__ = Human.prototype
```

#### constructor 
* constructor的作用是记录对象是由哪个公共构造函数创建的
```
Solider.prototype = {
  constructor: Solider
}
```

#### 下面写法会覆盖Solider.prototype，导致constructor丢失
```
Solider.protoype = {
    兵种:"美国大兵",
    攻击力:5,
    行走:function(){ /*走俩步的代码*/},
    奔跑:function(){ /*狂奔的代码*/  },
  }
```
所以正确写法应该是
```
  Solider.prototype.兵种 = "美国大兵"
  Solider.prototype.攻击力 = 5
  Solider.prototype.行走 = function(){ /*走俩步的代码*/}
  Solider.prototype.奔跑 = function(){ /*狂奔的代码*/  }
```

#### new
* [教程](https://xiedaimala.com/tasks/5833c9d4-ebd5-44e4-91b5-661f476f9cad/video_tutorials/4312943e-4fd3-4225-97e5-d4f04d6845be)
* [文章](https://zhuanlan.zhihu.com/p/23987456)
* [不用new创造solider](https://github.com/Hanqing1996/JavaScript-advance/blob/master/%E9%9D%A2%E5%90%91%E5%AF%B9%E8%B1%A1/createsolider_without_new.js)
* [用new创造solider](https://github.com/Hanqing1996/JavaScript-advance/blob/master/%E9%9D%A2%E5%90%91%E5%AF%B9%E8%B1%A1/createsolider_with_new.js)
* new关注的是：什么是共有的，什么是私有的
1. 凡公有的，交给Solider.prototype(公共构造函数constructor、公共属性)
2. 凡私有的，交给Solider，在其中设置私有属性和方法(this.)


----
#### new 做了什么
1. 让 new 出的实例指向构造函数的原型
2. 通过执行构造函数，为 new 出的实例增加属性
3. 不管构造函数有没有返回值，newFunc 都会返回一个具有新属性的构造函数实例
```
function newFunc(father, ...rest) {
  var result = {};
  result.__proto__ = father.prototype;// 让 result 指向 father 的原型
  var result2 = father.apply(result, rest); // 执行构造函数 father，为 result 添加属性
  if (
    // 构造函数 father 若有返回值，则已赋值给 result2，直接返回 result2
    (typeof result2 === 'object' || typeof result2 === 'function') &&
    result2 !== null
  ) {
    return result2;
  }
  // 构造函数没有返回值，则将 result 返回（由于前面执行构造函数时的 this 指定是result,所以 result 此时已经有了新的属性）
  return result;
}
```
比如
```
function Person(option){
  this.age=option.age
  this.gender=option.gender
}

let p=new Person({age:12,gender:true})
```




#### 私有属性与共有属性
见[作业第三题](https://github.com/Hanqing1996/JavaScript-advance/blob/master/%E9%9D%A2%E5%90%91%E5%AF%B9%E8%B1%A1/%E4%BD%9C%E4%B8%9A.js)


#### 用js模拟继承(__proto__/new/create/class)
* 需求
Solider的基类是Human,用Solider可以得到一个对象s,s具有作为Solider的共有和私有属性,具有作为Human的共有和私有属性
* 漫长的进化
1. [不用new，完全用__proto__实现对象间的继承](https://github.com/Hanqing1996/JavaScript-advance/blob/master/%E9%9D%A2%E5%90%91%E5%AF%B9%E8%B1%A1/%E7%94%A8js%E6%A8%A1%E6%8B%9F%E7%BB%A7%E6%89%BF1.js)
2. [用new省略对象间的__proto__设置，只设置constructor.prototype.__proto__](https://github.com/Hanqing1996/JavaScript-advance/blob/master/%E9%9D%A2%E5%90%91%E5%AF%B9%E8%B1%A1/%E7%94%A8js%E6%A8%A1%E6%8B%9F%E7%BB%A7%E6%89%BF2.js)
3. [生产环境不允许使用__proto__，用new代替__proto__的设置](https://github.com/Hanqing1996/JavaScript-advance/blob/master/%E9%9D%A2%E5%90%91%E5%AF%B9%E8%B1%A1/%E7%94%A8js%E6%A8%A1%E6%8B%9F%E7%BB%A7%E6%89%BF3.js)
4. [3的问题是s.__proto__存在Human的私有属性，我们用一个空白的构造函数Empty()来解决这一问题](https://github.com/Hanqing1996/JavaScript-advance/blob/master/%E9%9D%A2%E5%90%91%E5%AF%B9%E8%B1%A1/%E7%94%A8js%E6%A8%A1%E6%8B%9F%E7%BB%A7%E6%89%BF4.js)
5. [IE(面试考)：用create实现Solider.prototype.__proto__ = Human.prototype](https://github.com/Hanqing1996/JavaScript-advance/blob/master/%E9%9D%A2%E5%90%91%E5%AF%B9%E8%B1%A1/%E7%94%A8js%E6%A8%A1%E6%8B%9F%E7%BB%A7%E6%89%BF5.js)
6. [ES6:class](https://github.com/Hanqing1996/JavaScript-advance/blob/master/%E9%9D%A2%E5%90%91%E5%AF%B9%E8%B1%A1/%E7%94%A8js%E6%A8%A1%E6%8B%9F%E7%BB%A7%E6%89%BF6.js)

#### class
* class A extends B:说明B是A的父类
* 在class中，constructor(){}内部的方法，为私有方法；外部的方法，为共有方法
* 在 constructor 外定义私有方法
```
class Human {

    // 私有方法
    myFn=()=>{}

    // 共有方法
    otherFn(){

    }
    constructor(name) {
        this.name=name
    }
}

const p1=new Human('libai')
const p2=new Human('zhangxu')

console.log(p1.myFn===p2.myFn);// false,因为 myFn 是私有方法
console.log(p1.otherFn===p2.otherFn);// true,因为 otherFn 是共有方法
```
以上写法等价于
```
class Human {

    // 共有方法
    otherFn(){

    }
    constructor(name) {
        this.name=name
        this.myFn=()=>{}
    }
}

const p1=new Human('libai')
const p2=new Human('zhangxu')

console.log(p1.myFn===p2.myFn);// false,因为 myFn 是私有方法
console.log(p1.otherFn===p2.otherFn);// true,因为 otherFn 是共有方法
```
* super()只能为父类传递私有属性，不能传递公有属性,公有属性是由extends实现的
* 注意公有属性只能是函数，而私有属性可以是函数，也可以不是函数
* class的本质仍然是函数(一个无法call的函数)


#### super
* 作用:为s设置作为Human的属性
```
super("yellow", "nezha")
```
等价于
```
Human.call(this, "yellow", "nezha")
```

#### js的对象和JSON的对象的区别
1. JSON的对象，属性名必须用""括起来
2. JSON的对象，属性值不可以是函数
