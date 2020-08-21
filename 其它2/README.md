#### 【ES6】块级作用域{}
1. let 和 const 服从块级作用域的。
```
{
    let a=2
}
console.log(a) // a is not defined
```
```
{
    const a=2
}
console.log(a) // a is not defined
```
2. var 不服从块级作用域
```
{
    var a=2
}
console.log(a) // 2
```
3. function 不服从块级作用域
```
{
    function a(){console.log('haha')}
}
console.log(a) // function a(){console.log('haha')}
```

#### 字面量
* 字面量：不是构造出来的量(顾名思义的量)
```
1,2,3 true,false {}
```
* 非字面量：构造出来的量
```
new person()
```

#### unicode(ES6)
[参考](https://es6.ruanyifeng.com/#docs/string)
* 使用Unicode 码点表示一个字符(ES6)
```
 "\u0061"==="a"     //  true
```
* 输出多余两个字节的字符(ES5)
```
"\u20BB7"           //  "₻7"，ES5下js理解为"\u20BB”和"7"
```
* 输出多余两个字节的字符(ES6)
```
"\u{20BB7}"           //  "吉"
```
* 由码点得到字符(ES6)
```
String.fromCodePoint(0x2F804)  //  "你"
```
* 由字符得到码点(ES6)
```
"你".codePointAt(0).toString(16)  //  2F804
```
#### sybmol
1. 作用:保证字段值唯一
```
var raceOptions={
    神族:Symbol(),
    人族:Symbol(),
    虫族:Symbol()
}

function create(type){
    if(type===raceOptions.神族)
    console.log('you choose protoss');
    if(type===raceOptions.人族)
    console.log('you choose terran');
    if(type===raceOptions.虫族)
    console.log('you choose zerg');
}

create(raceOptions.人族) // you choose terran
```
2. 为对象设置并获取Symbol类型的属性名(注意是属性名，不是属性值)
```
let s=Symbol()
let o={[s]:1}

Object.getOwnPropertySymbols(o)  //  [Symbol()]
```
#### 迭代器
```
function 发布器(){
    var _value=0
    var max=3
    return {
        next:function (){
            _value+=1
            if(_value>max) throw new Error('no next')

            if(_value===max){
                return {value:_value,done:true}
            }
            return {
                value:_value,
                done:false,
            }
        }
    }
}

a=发布器()

a.next()
a.next()
a.next()
a.next() // no next
```
#### 生成器(迭代器生成的语法糖)
```
function * 发布器(){
    var version=0
    while(true){
        version+=1 
        yield version   
    }
}

a=发布器()

a.next() // 1
a.next() // 2
a.next() // 3
a.next() // 4 
```

#### for...of(迭代)
1. 对象和数组都能遍历,但是数组可以迭代,对象不能迭代
2. 一个Object使用for...of迭代的前提:该对象有Symbol.iterator属性
```
/**
 * 数组有Symbol.iterator属性
 */
arr=[1,2,3,4]

arr[Symbol.iterator] // ƒ values() { [native code] }

/**
 * 对象没有Symbol.iterator属性
 */
obj={}

obj[Symbol.iterator] // undefined
```
3. 为对象赋予Symbol.iterator属性
```
var obj={0:'a',1:'b',2:'c'}

// 设置Symbol.iterator,是一个生成器
obj[Symbol.iterator]=function *(){
    let keys=Object.keys(obj)
    for(let key in keys){
        yield obj[key]
    }
}

// 迭代
for(item of obj){
    console.log(item)
} 

// 输出:a b c
```
#### 迭代和遍历
* 迭代和遍历都是针对Object而言的，本质都是枚举Object的属性
* 数组可以迭代，可以遍历;对象不可以迭代，可以遍历
* 遍历有以下几种形式
```

// 1
for(let key in arr)

// 2
keys=Object.keys(arr)
for(let i=0;i<keys.length;i++)
```
* 迭代用for...in,详见上面
* 迭代是遵从一定顺序的遍历，数组的下标是有序的，所以数组可以迭代，而对象不可以，除非指定"顺序"

#### 4&&9
```
let res=4&&9 // 4为真值,所以res=9
console.log(res) // 9
```

#### undefined&&9
```
let res=undefined&&9 // undefined为假值,所以res=undefined
console.log(res) // undefined
```
#### trim()
```
var str=`
        haha
            `
console.log(str.trim()) // 'haha'   
```
#### flag1&&flag2&&console.log('flag1　and flag2 all true')
```
var flag1=true;var flag2=true;
flag1&&flag2&&console.log('flag1　and flag2 all true')
```
#### 将字符串数组中的元素转为Number型，为什么不能直接用ParseInt
```
var arr=['1','2','3']
var numbers=arr.map(parseInt)
console.log(numbers) // [1, NaN, NaN]
```
* 原因
```
arr.map(callback(currentValue,index,array){})
```
   * currentValue:数组中正在处理的当前元素。
   * index:数组中正在处理的当前元素的索引
   * array:数组
```
parseInt(string, radix);
```
   * string:要被解析的值
   * radix:进制（介于2和36之间的整数）

所以上述代码等价于
```
pareInt(arr[0],0) // 1
pareInt(arr[1],1) // NaN
pareInt(arr[2],2) // NaN
```
* 正确姿势
```
var numbers=arr.map(n=>parseInt(n,10))
```
【面试】[No2：['1', '2', '3'].map(parseInt) what & why ?](https://muyiy.cn/question/js/2.html)
* [将字符串数组中的元素转为Number型，为什么不能直接用ParseInt](https://github.com/Hanqing1996/JavaScript-advance/tree/master/%E5%85%B6%E5%AE%832#%E5%B0%86%E5%AD%97%E7%AC%A6%E4%B8%B2%E6%95%B0%E7%BB%84%E4%B8%AD%E7%9A%84%E5%85%83%E7%B4%A0%E8%BD%AC%E4%B8%BAnumber%E5%9E%8B%E4%B8%BA%E4%BB%80%E4%B9%88%E4%B8%8D%E8%83%BD%E7%9B%B4%E6%8E%A5%E7%94%A8parseint)
* [map](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/map)
```
var new_array = arr.map(function callback(currentValue[, index[, array]]) {
 // Return element for new_array 
}[, thisArg])
```
* [parseInt](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/parseInt)
```
parseInt(string, radix);
// 返回从给定的字符串中解析出的一个整数。
```
* 注意点
radix 的值域为[2,36]。<strong>在radix为 undefined，或者radix为 0 或者没有指定的情况下</strong>，JavaScript 作如下处理（以下的基数指的就是进制）：
1. 如果字符串 string 以"0x"或者"0X"开头, 则基数是16 (16进制).
2. 如果字符串 string 以"0"开头, 基数是8（八进制）或者10（十进制），那么具体是哪个基数由实现环境决定。ECMAScript 5 规定使用10，但是并不是所有的浏览器都遵循这个规定。因此，永远都要明确给出radix参数的值。
3. 如果字符串 string 以其它任何值开头，则基数是10 (十进制)。
* parseInt('14', 2) 为什么是1
parseInt从参数的第一个字符开始解析，遇到无法解析的则忽略，'14'中的1在二进制中可以解析，而4则无法解析，因)此parseInt('14',2) 相当于parseInt('1', 2)，计算出结果是1
```
parseInt('1', 0) //radix为0时，且string参数不以“0x”和“0”开头时，按照10为基数处理。这个时候返回1
parseInt('2', 1) //基数为1（1进制）表示的数中，最大值小于2，所以无法解析，返回NaN
parseInt('3', 2) //基数为2（2进制）表示的数中，最大值小于3，所以无法解析，返回NaN
```
* 变形
```
let unary = fn => val => fn(val)
let parse = unary(parseInt)
console.log(['1.1', '2', '0.3'].map(parse))
````
等价于
```
['1.1', '2', '0.3'].map((currentValue)=>parseInt(currentValue))

parseInt('1.1') // 1：parseInt 解析"1",忽略".1",十进制下的1是1
parseInt('2') // 2：2的十进制
parseInt('0.3') // 0: parseInt 解析"1",忽略".3",十进制下的0是0
```
