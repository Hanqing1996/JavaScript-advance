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
