
#### 包含空格和回车的字符串
```
var str=`
    <div>
        <p></p>
    <div>   
`

console.log(str); // 包含空格，回车(4个)
```
#### 模板字符串`${str}`
```
let str='hh'

console.log(`say${str}`)
```
#### 函数接字符串
```
var name='liming'
var category='human'
var fn=function(){
    console.log(arguments[0]); // [ '', '是', '' ]
    console.log(arguments[1]); // liming
    console.log(arguments[2]); // human

    if(arguments[1]==='liming'){
        return arguments[1]+arguments[0][1]+'好人'
    }else{
        return arguments[1]+arguments[0][1]+'坏人'
    }

}

console.log(fn`${name}是${category}`);// liming是好人
```
```
{
    function fn(strings, name, age) {
        return name + strings[0] + strings[1] + age
    }
    const name = 'libai'
    const age = 18

    const output = fn`我是${name}，今年${age}`

    console.log(output) // libai我是，今年18
}
```
#### 为什么字符串不应该作为函数参数
* 传字符串
```
person={
    name:'libai'
};

function sayName(name){
    if(name==person)
    console.log(name)
}

sayName('lihei') // 明明参数传错了，却不报任何错误
```
* 不传字符串
```
person={
    name:'libai'
};

function sayName(name){
    if(name==person.name)
    console.log(name)
}

sayName(person.nme) // 报错:peson is not defined
```
#### split
```
str='abcdefgh'
console.log(str.split('b')) // ['a','cdefgh']

str='head something'
console.log(str.split('head')) // ["", " something"]
```
