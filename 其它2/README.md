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

