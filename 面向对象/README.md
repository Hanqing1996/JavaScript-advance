# 面向对象

#### 封装
隐藏细节

#### 继承
复用代码

#### 多态
更灵活。一个东西拥有多种东西的属性

#### object
1. 对象
2. 函数
3. 数组

#### object的存储
```
// 在堆内存中开辟一块空间存储object的属性名和属性值,同时栈内存中保存对应地址
var baba={
    name:'Mayun',
    child:{
        name:'Sicong',
        sayName:function (){
            console.log(this.name);
        }
    }
}

baba:A11

// A11内存情况
name:'Mayun'
child:A22

// A22内存情况
name:'Sicong'
sayName:A34

// A34内存情况
{name:sayName,functionBody:'console.log(this.name);'}
```

#### object的原型链
* [toString()是怎么来的](https://xiedaimala.com/tasks/5833c9d4-ebd5-44e4-91b5-661f476f9cad/video_tutorials/ccd79503-4f54-4b31-9f91-6f76f6073722)
* 原型链的优点：省内存

#### protype:公共属性/方法
1. window.Array.protype：数组公共属性/方法
2. window.Function.protype：
3. window.Object.protype：

#### 为何都是object,数组有push方法,而对象没有；函数有console.log方法,而对象没有
```
arr:window.Array.protype(有push方法)->window.Object.protype
fn1:window.Function.protype(有console.log方法)->window.Object.protype
obj1:window.Object.protype
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
* [不用new创造solider]()
* [用new创造solider]()


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
