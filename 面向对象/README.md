# 面向对象

#### 封装
隐藏细节

#### 继承
复用代码

#### 多态
更灵活。一个东西拥有多种东西的属性

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



#### object
1. 对象
2. 函数
3. 数组
* 注意
```
typeof Array // function
type of [1,2,3] // object
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

#### let a=Object.create(b):等价于a.__proto__=b
```
let name='libai'
let b={name}
let a=Object.create(b)

a.name // libai
```

#### __proto__和prototype的区别
1. 函数才有prototype
2. 对象才有__proto__

#### obj与obj.__proto__
1. obj不等于obj.__proto__
```
[1,2,3]===[1,2,3].__proto__
false
```
2. obj.fn与obj.__proto__.fn
```
[1,2,3].slice===[1,2,3].__proto__.slice
true
```
这是因为obj与obj.__proto__这两个对象存储在不同的内存空间中，而obj.fn与obj.__proto__.fn存储同一个内存地址(fn的内存地址)


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

#### object的原型链
* [toString()是怎么来的](https://xiedaimala.com/tasks/5833c9d4-ebd5-44e4-91b5-661f476f9cad/video_tutorials/ccd79503-4f54-4b31-9f91-6f76f6073722)
* 原型链的优点：省内存

#### protype:公共属性/方法
1. window.Array.protype：数组公共属性/方法
2. window.Function.protype：
3. window.Object.protype：

#### 为何都是Object,数组有push方法,而对象没有；函数有console.log方法,而对象没有
1. 数组
```
arr=[1,2,3]

arr.__proto=window.Array.protype(有push方法)
window.Array.protype.__proto__=window.Object.protype
```
2. 函数
```
fn1=function(){}

fn1.__proto__=window.Function.protype(有console.log方法)
window.Function.protype.__proto=window.Object.protype
```
3. 对象
```
obj1={}

obj1.__proto__=window.Object.protype
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


#### 私有属性与共有属性
见[作业第三题](https://github.com/Hanqing1996/JavaScript-advance/blob/master/%E9%9D%A2%E5%90%91%E5%AF%B9%E8%B1%A1/%E4%BD%9C%E4%B8%9A.js)

#### new
* [教程](https://xiedaimala.com/tasks/5833c9d4-ebd5-44e4-91b5-661f476f9cad/video_tutorials/4312943e-4fd3-4225-97e5-d4f04d6845be)
* [文章](https://zhuanlan.zhihu.com/p/23987456)
* [不用new创造solider](https://github.com/Hanqing1996/JavaScript-advance/blob/master/%E9%9D%A2%E5%90%91%E5%AF%B9%E8%B1%A1/createsolider_without_new.js)
* [用new创造solider](https://github.com/Hanqing1996/JavaScript-advance/blob/master/%E9%9D%A2%E5%90%91%E5%AF%B9%E8%B1%A1/createsolider_with_new.js)


#### prototype
* Solioder.prototype的作用是在var s=new Solider()时,为对象s指定其__proto__

#### constructor 
* constructor的作用是记录对象是由哪个公共构造函数创建的
```
Solider.prototype = {
  constructor: Solider
}
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
* new关注的是：什么是共有的，什么是私有的
1. 凡公有的，交给Solider.prototype(公共构造函数constructor、公共属性)
2. 凡私有的，交给Solider，在其中设置私有属性和方法(this.)


#### 构造函数规则
1. 构造函数大写
2. 构造函数省略Create
3. 构造函数若无参数，则不加()
```
new Solider
```

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

#### create()
```
A=Object.create(B);
```
等价于
```
A.__proto__ = B;
```
#### super
* 作用:为s设置作为Human的属性
```
super("yellow", "nezha")
```
等价于
```
Human.call(this, "yellow", "nezha")
```
#### class
* class A extends B:说明B是A的父类
* A extends B
实现了
```
A.prototype.__proto__ = B.prototype
```
* 在class中，constructor(){}内部的，为私有属性；外部的，为共有属性
* super()只能为父类传递私有属性，不能传递公有属性,公有属性是由extends实现的
* 注意公有属性只能是函数，而私有属性可以是函数，也可以不是函数
* class的本质仍然是函数(一个无法call的函数)

#### js的对象和JSON的对象的区别
1. JSON的对象，属性名必须用""括起来
2. JSON的对象，属性值不可以是函数
