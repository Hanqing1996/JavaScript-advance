# 其它

#### 类型判断
* typeof
* constructor
* instanceof
* Object.prototype.toString

> 对于数组类型，还有 Array.isArray 可以用于判断~

#### instanceof
> A instanceof B:判断 A 是不是 B 的一个实例。本质上是判断 A.__proto__ 是否等于 B.prototype

> 注意，instanceof可以准确的判断复杂数据类型，但是不能正确判断基本数据类型
```
console.log(12 instanceof Number)  // false
console.log('22' instanceof String)  // false
console.log(true instanceof Boolean) // false
console.log(null instanceof Object) // false
console.log(undefined instanceof Object) // false

console.log([] instanceof Array)   // true
console.log({a: 1} instanceof Object) // true
function a() {}
console.log(a instanceof Function)  // true
console.log(new Date() instanceof Date)  //true
```
* 模拟实现一个 instanceof
```
const self_instanceof = function (instance, constructor) {
    let instance_proto = instance.__proto__;
    let constructor_proto = constructor.prototype;

    while(true) {
        // 找到终点返回false
       if (instance_proto === null) {return false};
       // 找到返回true
       if (instance_proto === constructor_proto) {return true};
        // 当实例与构造函数原型不相同, 沿着原型链继续向上查找
        instance_proto = instance_proto.__proto__;
    }
}
console.log([] instanceof Array)   // true
console.log(self_instanceof([], Array))  // true
```
* null 和 undefined 类型无法通过 instanceof 检测

#### typeof 
* typeof 是一个运算符，就跟加减乘除一样
* typeof 能检测出六种类型的值
* undefined
```
let a=undefined
typeof a // "undefined"
```
* boolean 
```
let a=false
typeof a // "boolean"
```
* string
```
let a="str"
typeof a // "string"
```
* function
```
let fn=function(){}
typeof fn // 'function'
```
* number
```
let a=123
typeof a // "number"
```
<strong>但是， Object 下细分的类型，如 Array、Function、Date、RegExp、Error typeOf 是没法区分的</strong>
```javascript
var date = new Date();
var error = new Error();
console.log(typeof date); // object
console.log(typeof error); // object
```
* null 类型无法通过 typeof检测
```
let a=null
console.log(typeof a) //"object"
```

#### constructor
> constructor属性表示原型对象与构造函数之间的关联关系
```
console.log('22'.constructor === String)             // true
console.log(true.constructor === Boolean)            // true
console.log([].constructor === Array)                // true
console.log(document.constructor === HTMLDocument)   // true
console.log(window.constructor === Window)           // true
console.log(new Number(22).constructor === Number)   // true
console.log(new Function().constructor === Function) // true
console.log((new Date()).constructor === Date)       // true
console.log(new RegExp().constructor === RegExp)     // true
console.log(new Error().constructor === Error)       // true
```
* null 和 undefined 是无效的对象，因此是不会有 constructor 存在的，这两种类型的数据需要通过其他方式来判断。

#### Object.prototype.toString
> 可以识别至少 14 种类型

```javascript
// 以下是11种：
var number = 1;          // [object Number]
var string = '123';      // [object String]
var boolean = true;      // [object Boolean]
var und = undefined;     // [object Undefined]
var nul = null;          // [object Null]
var obj = {a: 1}         // [object Object]
var array = [1, 2, 3];   // [object Array]
var date = new Date();   // [object Date]
var error = new Error(); // [object Error]
var reg = /a/g;          // [object RegExp]
var func = function a(){}; // [object Function]

function checkType() {
    for (var i = 0; i < arguments.length; i++) {
        console.log(Object.prototype.toString.call(arguments[i]))
    }
}

checkType(number, string, boolean, und, nul, obj, array, date, error, reg, func)
```
除了以上 11 种之外，还有：
```javascript
console.log(Object.prototype.toString.call(Math)); // [object Math]
console.log(Object.prototype.toString.call(JSON)); // [object JSON]
```
除了以上 13 种之外，还有：
```javascript
function a() {
    console.log(Object.prototype.toString.call(arguments)); // [object Arguments]
}
a();
```
* 在 IE6 中，null 和 undefined 会被 Object.prototype.toString 识别成 [object Object]！

#### 【面试】构造一个用于识别类型的函数
```javascript
var class2type = {};

// 生成class2type映射
"Boolean Number String Function Array Date RegExp Object Error".split(" ").map(function(item, index) {
    class2type["[object " + item + "]"] = item.toLowerCase();
})

function type(obj) {
    if (obj == null) {
        return obj + "";
    }
    return typeof obj === "object" || typeof obj === "function" ?
        class2type[Object.prototype.toString.call(obj)] || "object" :
        typeof obj;
}

```
```
type(123) // "number"
type(false) // "boolean"
type(function(){}) // "function"

```

---
#### 类型转换
* 参考：[JavaScript 深入之头疼的类型转换](https://github.com/mqyqingfeng/Blog/issues/159)	
* 核心:
1. ToString 对基础类型值的转换 
2. ToNumber 对基础类型值的转换
3. 对象的 toString 方法
4. 对象的 valueOf 方法
* 以下提到的“基本类型”是指 string,number,boolean,undefined,null
* 以下提到的方法中，<code>ToString</code>,<code>ToNumber</code>,<code>ToPrimitive</code> 不暴露出来（属于底层方法） 。<code>toString</code>,<code>valueOf</code> 是直接暴露出来的。
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

console.log(Number("\n")) // 0
```
> 如果向 ToNumber 传入一个字符串，它会试图将其转换成一个整数或浮点数，而且会忽略所有前导的 0，如果有一个字符不是数字，结果都会返回 NaN，鉴于这种严格的判断，我们一般还会使用更加灵活的 parseInt 和 parseFloat 进行转换。如果传入字符串为"",则返回0

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
console.log(String(123)) // 123
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
---
#### 对象转布尔值
对象到布尔值的转换非常简单：所有对象(包括数组和函数)都转换为 true。
```
console.log(Boolean([])) // true
console.log(Boolean(new Boolean(false))) // true
```
## 对象转字符串和数字

> 为了掌握对象如何转换成字符串/数字。我们必须先了解对象的 toString 方法和 valueOf 方法。

#### 对象的 toString 方法

* 当调用对象的 toString 方法时，其实调用的是 Object.prototype 上的 toString 方法。

```javascript
Object.prototype.toString.call({a: 1}) // "[object Object]"
({a: 1}).toString() // "[object Object]"
({a: 1}).toString === Object.prototype.toString // true
```

* 普通对象，调用 toString 方法会根据这个对象的[[class]]内部属性，返回由 "[object " 和 class 和 "]" 三个部分组成的字符串。

* 然而其它对象根据各自的特点，定义了更多版本的 toString 方法。例如:

  1. 数组的 toString 方法将每个数组元素转换成一个字符串，并在元素之间添加逗号后合并成结果字符串。

     ```javascript
     console.log([].toString()) // ""
     console.log([1, 2, 3].toString()) // 1,2,3
     console.log([null]).toString()) //""
     ```

  2. 函数的 toString 方法返回源代码字符串。

     ```javascript
     console.log((function(){var a = 1;}).toString()) // function (){var a = 1;}
     ```

  3. 日期的 toString 方法返回一个可读的日期和时间字符串。

     ```javascript
     console.log((new Date(2010, 0, 1)).toString()) // Fri Jan 01 2010 00:00:00 GMT+0800 (CST)
     ```

  4. RegExp 的 toString 方法返回一个表示正则表达式直接量的字符串。

     ```javascript
     console.log((/\d+/g).toString()) // /\d+/g
     ```

  5. 原始类型值 value 的包装对象，调用 toString 方法 等价于 String(value)

     ```javascript
     console.log(new Number(123).toString()) // 123
     
     // 等价于
     console.log(String(123)) // 123
     ```

#### 对象的 valueOf 方法

* 普通对象，以及数组，函数调用  valueOf 方法返回自身

```javascript
let obj={n:1}
console.lopg(obj.valueOf()) // {n:1}

let arr=[1,2,3]
arr.valueOf() // [1,2,3]

function fn(){
    console.log(1)
}
fn.valueOf() //ƒ fn(){console.log(1)}
```

* 日期，返回1970 年 1 月 1 日以来的毫秒数。

  ```javascript
  var date = new Date(2017, 4, 21);
  console.log(date.valueOf()) // 1495296000000
  ```

* 原始类型值的包装对象，返回原始类型值

  ```javascript
  console.log(new Number(123).valueOf()) // 123 
  ```

#### ToPrimitive
* 语法

  ```javascript
  ToPrimitive(input[, PreferredType])
  ```

第一个参数是 input，表示要处理的输入值。input的类型任意，可能是对象，可能是基本类型

第二个参数是 PreferredType，非必填，表示希望转换成的类型，有两个值可以选，Number 或者 String。

当不传入 PreferredType 时，如果 input 是日期类型，相当于传入 String，否则，都相当于传入 Number。

<strong>如果传入的 input 是 Undefined、Null、Boolean、Number、String 类型，直接返回该值。</strong>

如果是 ToPrimitive(obj, Number)，处理步骤如下：

1. 调用 valueOf 方法，如果返回一个原始值，则 JavaScript 将其返回。
2. 否则，调用 toString 方法，如果返回一个原始值，则 JavaScript 将其返回。
3. 否则，JavaScript 抛出一个类型错误异常。

如果是 ToPrimitive(obj, String)，处理步骤如下：

1. 否则，调用 toString 方法，如果返回一个原始值，则 JavaScript 将其返回。
2. 否则，调用 valueOf 方法，如果返回一个原始值，则 JavaScript 将其返回。
3. 否则，JavaScript 抛出一个类型错误异常。

> 也就是说，在不报错的情况下，必然返回一个基本类型（number,string,boolean,null,undefiend）的值

> 在不指定 PreferredType 的情况下，如果是 Date 求原值，则 PreferredType 是 String，其他均为 Number。
---

#### 对象转字符串数字流程

* 转字符串

  其实还是调用 String(value) ,要研究的是 value 为对象时 String 方法具体做了哪些事

  | 参数类型 | 结果                                                         |
  | -------- | ------------------------------------------------------------ |
  | Object   | 1. primValue = ToPrimitive(input, String)                                                                   2. 返回ToString(primValue). |

  首先调用 ToPrimitive (input 是对象类型)，在获得一个基本类型的值后调用ToString（注意不是 toString 哦）

* 转数字
## 对象转字符串和数字

> 为了掌握对象如何转换成字符串/数字。我们必须先了解对象的 toString 方法和 valueOf 方法。

#### 对象的 toString 方法

* 当调用对象的 toString 方法时，其实调用的是 Object.prototype 上的 toString 方法。

```javascript
Object.prototype.toString.call({a: 1}) // "[object Object]"
({a: 1}).toString() // "[object Object]"
({a: 1}).toString === Object.prototype.toString // true
```

* 普通对象，调用 toString 方法会根据这个对象的[[class]]内部属性，返回由 "[object " 和 class 和 "]" 三个部分组成的字符串。

* 然而其它对象根据各自的特点，定义了更多版本的 toString 方法。例如:

  1. 数组的 toString 方法将每个数组元素转换成一个字符串，并在元素之间添加逗号后合并成结果字符串。

     ```javascript
     console.log([].toString()) // ""
     console.log([1, 2, 3].toString()) // 1,2,3
     ```

  2. 函数的 toString 方法返回源代码字符串。

     ```javascript
     console.log((function(){var a = 1;}).toString()) // function (){var a = 1;}
     ```

  3. 日期的 toString 方法返回一个可读的日期和时间字符串。

     ```javascript
     console.log((new Date(2010, 0, 1)).toString()) // Fri Jan 01 2010 00:00:00 GMT+0800 (CST)
     ```

  4. RegExp 的 toString 方法返回一个表示正则表达式直接量的字符串。

     ```javascript
     console.log((/\d+/g).toString()) // /\d+/g
     ```

  5. 原始类型值 value 的包装对象，调用 toString 方法 等价于 String(value)

     ```javascript
     console.log(new Number(123).toString()) // 123
     
     // 等价于
     console.log(String(123)) // 123
     ```

#### 对象的 valueOf 方法

* 普通对象，以及数组，函数调用  valueOf 方法返回自身

```javascript
let obj={n:1}
console.lopg(obj.valueOf()) // {n:1}

let arr=[1,2,3]
arr.valueOf() // [1,2,3]

function fn(){
    console.log(1)
}
fn.valueOf() //ƒ fn(){console.log(1)}
```

* 日期，返回1970 年 1 月 1 日以来的毫秒数。

  ```javascript
  var date = new Date(2017, 4, 21);
  console.log(date.valueOf()) // 1495296000000
  ```

* 原始类型值的包装对象，返回原始类型值

  ```javascript
  console.log(new Number(123).valueOf()) // 123 
  ```
---

#### 对象转字符串数字流程

* 转字符串

  其实还是调用 String(value) ,要研究的是 value 为对象时 String 方法具体做了哪些事

  | 参数类型 | 结果                                                         |
  | -------- | ------------------------------------------------------------ |
  | Object   | 1. primValue = ToPrimitive(input, String)                                                                   2. 返回ToString(primValue). |

  首先调用 ToPrimitive (input 是对象类型)，在获得一个基本类型的值后调用ToString（注意不是 toString 哦）

* 转数字

  其实还是调用 Nuimber(value) ,要研究的是 value 为对象时 Number 方法具体做了哪些事

  | 参数类型 | 结果                                                         |
  | -------- | ------------------------------------------------------------ |
  | Object   | 1. primValue = ToPrimitive(input, Number)                                                              2. 返回ToNumber(primValue)。 |

  首先调用 ToPrimitive (input 是对象类型)，在获得一个基本类型的值后调用ToNumber

  ---

#### 对象转字符串流程总结

1. 如果对象具有 toString 方法，则调用这个方法。看能否返回一个原始值
2. 如果对象没有 toString 方法，或者这个方法并不返回一个原始值，则试图调用 valueOf 方法，看能否返回一个原始值
3. 如果1或2得到一个原始值 value，则 ToString(value) 的结果即为最终结果；否则抛出一个类型错误异常。

#### 对象转数字流程

1. 如果对象具有 valueOf 方法，则调用这个方法。看能否返回一个原始值
2. 如果对象没有 valueOf 方法，或者这个方法并不返回一个原始值，则试图调用 toString 方法，看能否返回一个原始值
3. 如果1或2得到一个原始值 value，则 ToNumber(value) 的结果即为最终结果；否则抛出一个类型错误异常。
```javascript
console.log(Number({})) // NaN
/**
 * 1. valueOf({}) 得到 object 类型的 {}，由于不是基本类型，接下来调用 toString 方法
 * 2. toString({}) 得到 string 类型的 {}。ToPrimitive 调用完毕，得到一个基本类型的返回值
 * 3. ToNumber("{}")，按照规则（如果向 ToNumber 传入一个字符串，它会试图将其转换成一个整数或浮点数，而且会忽略所有前导的 0，如果有一个字符不是数字，结果都会返回 NaN）,得到 NaN
 */
console.log(Number({a : 1})) // NaN
/**
 * 转换流程同上
 */
console.log(Number([])) // 0
/**
 * 1. [].valueOf() 得到 object 类型的[]，由于不是基本类型，接下来调用 toString 方法
 * 2. [].toString() 得到 string 类型的 ""。ToPrimitive 调用完毕，得到一个基本类型的返回值
 * 3. ToNumber("")，按照规则，得到0
 */
console.log(Number([0])) // 0
/**
 * 1. [0].valueOf() 得到 object 类型的 [0]，由于不是基本类型，接下来调用 toString 方法
 * 2. [0].toString() 得到 string 类型的 "0"。ToPrimitive 调用完毕，得到一个基本类型的返回值
 * 3. ToNumber("0")，按照规则，得到0
 */
console.log(Number([1, 2, 3])) // NaN
/**
 * 1. [1,2,3].valueOf() 得到 object 类型的 [1,2,3]，由于不是基本类型，接下来调用 toString 方法
 * 2. [1,2,3].toString() 得到 string 类型的 "1,2,3"。ToPrimitive 调用完毕，得到一个基本类型的返回值
 * 3. ToNumber("1,2,3")，发现','无法解析成数字，按照规则(如果有一个字符不是数字，结果都会返回 NaN)，返回NaN
 */
console.log(Number(function(){var a = 1;})) // NaN
/**
 * 1. function(){var a = 1;}.valueOf() 得到 object 类型的 function(){var a = 1;}，由于不是基本类型，接下来调用 toString 方法
 * 2. function(){var a = 1;}.toString() 得到 string 类型的 "function(){var a = 1;}"。ToPrimitive 调用完毕，得到一个基本类型的返回值
 * 3. ToNumber("function(){var a = 1;}")，发现无法解析成数字，按照规则返回NaN
 */
console.log(Number(/\d+/g)) // NaN
console.log(Number(new Date(2010, 0, 1))) // 1262275200000
/**
 * 1. new Date(2010, 0, 1).valueOf() 返回1970年至今的毫秒数 1262275200000，是 number 类型，ToPrimitive 调用完毕
 * 2. ToNumber(1262275200000)，返回 1262275200000
 */
console.log(Number(new Error('a'))) // NaN
```
---
#### JSON.stringify
* 作用：将一个 JavaScript 值转换为一个 JSON 字符串
1. 处理基本类型
```javascript
console.log(JSON.stringify(null)) // null
console.log(JSON.stringify(undefined)) // undefined，注意这个undefined不是字符串的undefined
console.log(JSON.stringify(true)) // true
console.log(JSON.stringify(42)) // 42
console.log(JSON.stringify("42")) // "42"
```
2.布尔值、数字、字符串的包装对象在序列化过程中会自动转换成对应的原始值。
```javascript
JSON.stringify([new Number(1), new String("false"), new Boolean(false)]); // "[1,"false",false]"
```
3.undefined、任意的函数以及 symbol 值，在序列化过程中会被忽略（出现在非数组对象的属性值中时）或者被转换成 null（出现在数组中时）。
```javascript
JSON.stringify({x: undefined, y: Object, z: Symbol("")}); 
// "{}"

JSON.stringify([undefined, function(){console.log(1)}, Symbol("")]);          
// "[null,null,null]" 
```
4.JSON.stringify 有第二个参数 replacer，它可以是数组或者函数，用来指定对象序列化过程中哪些属性应该被处理，哪些应该被排除。
```javascript
function replacer(key, value) {
  if (typeof value === "string") {
    return undefined;
  }
  return value;
}

var foo = {foundation: "Mozilla", model: "box", week: 45, transport: "car", month: 7};
var jsonString = JSON.stringify(foo, replacer);

console.log(jsonString)
// {"week":45,"month":7}
```
```javascript
var foo = {foundation: "Mozilla", model: "box", week: 45, transport: "car", month: 7};
console.log(JSON.stringify(foo, ['week', 'month']));
// {"week":45,"month":7}
```
5.如果一个被序列化的对象拥有 toJSON 方法，那么该 toJSON 方法就会覆盖该对象默认的序列化行为：不是那个对象被序列化，而是调用 toJSON 方法后的返回值会被序列化，例如：
```javascript
var obj = {
  foo: 'foo',
  toJSON: function () {
    return 'bar';
  }
};

JSON.stringify({x: obj}); // '{"x":"bar"}'
```
---
#### 算术操作符
#### 一元操作符 +
当 + 运算符作为一元操作符的时候，查看 ES5规范1.4.6，会调用 ToNumber 处理该值，相当于 Number('1')，最终结果返回数字 1。
> 关于 ToNumber 处理不同类型（基本类型、对象）参数的规则，请看上面
```javascript
console.log(+[]); // 0
console.log(+['1']); // 1
console.log(+['1', '2', '3']); //NaN
console.log(+{}); // NaN
```
#### 二元操作符 +
根据规范11.6.1 ，当计算 value1 + value2时：

1. lprim = ToPrimitive(value1)，注意 ToPrimitive 的第二个参数默认为 Number,除非 value1 为 Date,则 第二个参数为 String
2. rprim = ToPrimitive(value2)
3. 如果 lprim 是字符串或者 rprim 是字符串，那么返回 ToString(lprim) 和 ToString(rprim)的拼接结果
4. 如果3不满足，则返回 ToNumber(lprim) 和 ToNumber(rprim)的运算结果
```javascript
console.log(null + 1); // 1
/**
 * null 的类型属于基本类型，ToPrimitive(null，number) 不做转换，直接返回 null
 * 1 的类型属于基本类型，ToPrimitive(1) 结果为 1
 * 不满足“至少有一个为字符串”，返回 ToNumber(null)+ToNumber(1)
 */

console.log([] + []); // ""
/**
 * [] 的类型为 Object,ToPrimitive([],number) 先 valueOf,再 toString，得到""
 * ToString("")+ToNumber("") 结果为 ""
 */
console.log({} + []); // "[object Object]"
/**
 * {} 的类型为 Object,ToPrimitive([],number) 先 valueOf,再 toString，得到"[object Object]"
 * [] 的类型为 Object,ToPrimitive([],number) 先 valueOf,再 toString，得到""
 * ToString("[object Object]")+ToNumber("") 结果为 "[object Object]"
 */
console.log(1 + true);
/**
 * 1 的类型属于基本类型，ToPrimitive(1) 结果为 1
 * true 的类型为基本类型，ToPrimitive(true) 结果为 true
 * 两个值都不属于字符串，现在调用ToNumber方法相加
 * ToNumber(1)=1,toNumber(true)=1,所以最后结果为2
 */
console.log({} + {}); // "[object Object][object Object]"
console.log(new Date(2017, 04, 21) + 123) // Sun May 21 2017 00:00:00 GMT+0800 (中国标准时间)123 
/** 
 * 对于 ToPrimitive，当第一个参数类型为 Date 时，默认第二个参数类型为 String。ToPrimitive(new Date(2017, 04, 21),string) 先调用 toString 方法，返回一个可读的日期和时间字符串“Sun May 21 2017 00:00:00 GMT+0800 (中国标准时间)”
 * ToPrimitive(123) 结果为 123，number 类型
 * ToString("Sun May 21 2017 00:00:00 GMT+0800 (中国标准时间)")+ToString(123)，结果为 Sun May 21 2017 00:00:00 GMT+0800 (中国标准时间)123 
*/
```
#### 乘性操作符
> 如果有一个操作数不是数值，则在后台调用 Number()将其转换为数值
---
#### ==和===
#### ==
* [参考](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/%E7%9B%B8%E7%AD%89)
```
// 共5条比较规则，都不满足则直接返回 false
如果两个操作数都是对象，则仅当两个操作数都引用同一个对象时才返回true。
<strong>如果一个操作数是null，另一个操作数是undefined，则返回true。</strong>
如果两个操作数是不同类型的，就会尝试在比较之前将它们转换为相同类型：
	当数字与字符串进行比较时，会尝试将字符串转换为数字值。
	如果操作数之一是Boolean，则将布尔操作数转换为1或0。
		如果是true，则转换为1。
		如果是 false，则转换为0。
	<strong>x是字符串或者数字，y是对象，判断x == ToPrimitive(y)</strong>
如果操作数具有相同的类型，则将它们进行如下比较：
	String：true仅当两个操作数具有相同顺序的相同字符时才返回。
	Number：true仅当两个操作数具有相同的值时才返回。+0并被-0视为相同的值。如果任一操作数为NaN，则返回false。
	Boolean：true仅当操作数为两个true或两个false时才返回false。

以上都不满足，直接返回 false
	
```
```javascript
console.log( 42 == ['42']) // true
/**
 * ToPrimitive(['42'],number) 返回'42'
 * 现在就是判断 42=='42'，需将'42'转为数字类型
 */

console.log(false == undefined) // false
/**
 * "如果操作数之一是Boolean，则将布尔操作数转换为1或0。"
 * 现在就是判断 0==undefined，不满足任何情况，直接返回 false
 */
console.log([] == ![]) // true
/**
 * 这里有个坑，![]=false ,类型是 Boolean
 * 所以其实是判断 []==fasle
 * "如果操作数之一是Boolean，则将布尔操作数转换为1或0。",
 * 所以现在判断 []==0
 * "x是字符串或者数字，y是对象，判断x == ToPrimitive(y)",而ToPrimitive([],number)结果为""
 * 所以现在判断 ""==0
 * "数字与字符串进行比较时，会尝试将字符串转换为数字值",而String("")=0
 * 而0==0,当然是true
 */


console.log(false == "0") // true
/**
 * 
 * 先将 false 转为数字类型0
 * 现在判断 0=="0"
 * 将“0”转为数字类型0
 * 0==0.结果为 true
 */

console.log(false == 0) // true
console.log(false == "") 
/**
 * 先将 false 转为数字类型0
 * 现在判断 0==""
 * 将""转为数字类型0
 * 0==0,结果为 true
 */

console.log("" == 0) // true
console.log("" == []) // true
/**
 * ToPrimitive([],number)结果为 ""
 * ""=="",结果为true
 */

console.log([] == 0) // true
console.log("" == [null]) 
/**
 * ToPrimitive([null],number)结果为""
 * ""=="",结果为true
 */
console.log(0 == "\n")
/**
 * Number("\n")结果为0
 * 0==0,结果为true
 */
```



#### ===
* [参考](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Strict_equality)
```
如果两个操作数类型不同，直接返回 false。
如果两个操作数都是对象，则仅当两个操作数都引用同一个对象时才返回true。
如果一个操作数都是null或都是undefined，则返回true。
如果有一个操作数是NaN，则返回false。
如果操作数具有相同的类型，则将它们进行如下比较：
	String：true仅当两个操作数具有相同顺序的相同字符时才返回。
	Number：true仅当两个操作数具有相同的值时才返回。+0并被-0视为相同的值。如果任一操作数为NaN，则返回false。
	Boolean：true仅当操作数为两个true或两个false时才返回false。
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
---
#### 【面试】下面代码的输出是什么？为什么

#### 例1

```javascript
for (var i = 0; i< 10; i++){  
	setTimeout(() => {        
		console.log(i);       
    }, 1000)                  
}                             
```

* 答案

```javascript
10
10
10
10
10
10
10
10
10
10
```

* 解析

setTime 里的回调函数所能访问到的 i 是全局变量 i。在宏任务队列的10个回调函数执行时，全局变量 i 的值为10。所以输出10个10。

#### 例2

```javascript
for (let i = 0; i< 10; i++){  
	setTimeout(() => {        
		console.log(i);       
    }, 1000)                  
}
```

* 答案

```javascript
0
1
2
3
4
5
6
7
8
9
```

* 解析

这里有很要命的一点，就是 for 循环里的 i其实声明了10次。<strong>这与 for 循环的语义是不符合的。可以看成是 let 特有的一个 trick</strong><strong>>。具体参考 [我用了两个月的时间才理解 let](https://zhuanlan.zhihu.com/p/28140450)。



也就是说题目中的代码等价于

```javascript
for (let i = 0; i< 10; i++){  
    let j=i;
	setTimeout(() => {        
		console.log(j);       
    }, 1000)                  
}
```

所以，每个 setTime 里面的回调函数所能访问的 j 都是不同的变量，其值分别为 0~9。

---
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
4. {...obj1,...obj2}
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
---
## 以前的错误理解

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

---

但是！！上面的理解是完全错误的！！！网络上各种一知半解的js”深拷贝“，”浅拷贝“讨论实在是误人子弟！！！



以下总结参考 [ javascript中的深拷贝和浅拷贝？ - 邹润阳的回答 - 知乎](https://www.zhihu.com/question/23031215/answer/46220227)

---

#### 深拷贝

如果 b 是 a 的一份拷贝，b 中没有对 a 中对象的引用，则称 b 是 a 的深拷贝。

![dYDAfA.jpg](https://s1.ax1x.com/2020/08/21/dYDAfA.jpg)

#### 浅拷贝

浅拷贝的概念要基于深拷贝。如果 b 是 a 的一份拷贝，b 中有对 a 中对象的引用（无论多少个，只要有），则称 b 是 a 的浅拷贝。

>  比如下图中，shadowObj   是 obj 的拷贝结果。obj 和 shadow 的 arr 指向同一片内存空间，我们就说 shadowObj  是 obj  的浅拷贝。

![dYdIsO.jpg](https://s1.ax1x.com/2020/08/21/dYdIsO.jpg)

#### 注意

* "拷贝"的意思是将一个对象的所有属性进行枚举。基本类型的属性一定是复制到另外的内存空间中，引用类型的属性可能是开辟新内存空间，也可能是指向原对象的引用属性对应内存空间。

* let a= {name:'libai'};let  b=a 不属于浅拷贝。

  > 深拷贝和浅拷贝是只针对复杂对象拷贝的概念。而等号就是赋值操作，两者有本质区别；无论深复制还是浅复制都依赖于赋值操作，后者是一门编程语言的根基。



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
let obj2=Object.assign(obj1) 
obj1["age"]=12

console.log(obj2) // { name: 'Jack', age: 12 }
```
#### ES6 的扩展运算符属于浅拷贝
```
let arr=[1,[2,3,4],[5,6]]
let arr2=[...arr]
arr2[0]=10
arr2[1][0]=100
console.log(arr) // [ 1, [ 100, 3, 4 ], [ 5, 6 ] ]
console.log(arr2) // [ 10, [ 100, 3, 4 ], [ 5, 6 ] ]
```

#### JSON.parse(JSON.stringify(data)) 属于深度拷贝

```
let obj={
    name: 'libai'
}

let obj2=JSON.parse(JSON.stringify(obj))
obj2.name='zhangfei'

console.log(obj2) // {name:"zhangfei"}
```

<strong>but!!!</strong>

![dYV9VH.png](https://s1.ax1x.com/2020/08/21/dYV9VH.png)

* 重点来讲，有以下缺陷：

1. 非数组对象的属性不能保证以特定的顺序出现在序列化后的字符串中。
2. undefined、任意的函数以及 symbol 值，在序列化过程中会被忽略

```
let obj={
    name:Symbol(123),
    action:function(){console.log('hi')},
    age:undefined
}

console.log(JSON.parse(JSON.stringify(obj)))// {}
```

3. 所有以 symbol 为属性键的属性都会被完全忽略掉

```
let obj={}
obj[Symbol('nmae')]='libai'
console.log(JSON.parse(JSON.stringify(obj))) // {}
```

4. Date 日期调用了 toJSON() 将其转换为了 string 字符串（同Date.toISOString()），因此会被当做字符串处理。也就是说日期类型的属性值会被转化为字符串类型。

```
let obj={
    time: new Date()
}

console.log(JSON.parse(JSON.stringify(obj))) // {time: "2020-08-21T01:21:49.893Z"}
```

#### concat 是深拷贝还是浅拷贝？splice呢？

* concat：浅拷贝

> 以下代码中，arr2 含有对 aar1 的引用，所以 arr2 是 arr1 的浅拷贝

```javascript
let arr=[1,[2,3,4],[5,6]]
let arr2=arr.concat()
arr2[0]=100
arr2[1][0]=1000
console.log(arr) // [ 1, [ 1000, 3, 4 ], [ 5, 6 ] ]
console.log(arr2) // [ 100, [ 1000, 3, 4 ], [ 5, 6 ] ]
```

* splice：浅拷贝

```javascript
let arr=[1,[2,3,4],[5,6]]
let arr2=arr.slice(0)
arr2[0]=100
arr2[1][0]=1000
console.log(arr) // [ 1, [ 1000, 3, 4 ], [ 5, 6 ] ]
console.log(arr2) // [ 100, [ 1000, 3, 4 ], [ 5, 6 ] ]
```

#### 递归实现深拷贝

```javascript
function deepclone(source){
    
    if(source instanceof Object){

        let dist;
        // 处理数组    
        if(source instanceof Array){
            dist=new Array();
        }
        // 处理函数 
        if(source instanceof Function){
            dist=function(){
                return source.apply(this,arguments);
            };
        }
        // 处理普通对象 
        dist=new Object();
        for(let key in source){
            dist[key]=deepclone(source[key]);
        }
        return dist;
    }
    return source;
}
```

* 缺点

> 无法解决循环引用的情况

```javascript
const a={}
a.child=a

const b=deepclone(a)
//Maximum call stack size exceeded
```


#### 环检测

```javascript
const a={}
a.child=a

const b=deepclone(a)
```

* 方法

> 最diao的是，cache 里的 cacheDist 和 dist 是同步成长的

```javascript
let cache=[]

function deepclone(source){
    if(source instanceof Object){
        const cacheDist=findCache(source)

        if(!cacheDist){
            let dist;
            // 处理数组    
            if(source instanceof Array){
                dist=new Array();
            }
            // 处理函数 
            if(source instanceof Function){
                dist=function(){
                    return source.apply(this,arguments);
                };
            }
            // 处理普通对象 
            dist=new Object();
            cache.push([source,dist]);

            for(let key in source){
                dist[key]=deepclone(source[key]);
            }

            return dist

        }else{
            return cacheDist
        }
    }
    return source;
}


function findCache(source) {
    for (let i = 0; i < cache.length; i++) {
      if (cache[i][0] === source) {
        return cache[i][1];
      }
    }
    return undefined;
  }
```
