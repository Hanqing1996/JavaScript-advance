# 数组

#### Array和Array.prototype
1. Array的类型为function
```
typepf Array // function
```
2. Array.prototype为对象,slice,join,pop,push等方法都存储在Array.prototype中
```
typepf Array.prototype // object
```

#### 常见的伪数组
* DOM元素集合是伪数组(HTMLCollection)
```
<ul>
    <li>1111</li>
    <li>2222</li>
    <li>3333</li>
</ul>

let items=document.getElementsByTagName('li');

console.log(typeof items)  // object
```
* function的参数集合arguments是伪数组
```
function fn(){
    console.log(typeof arguments) // object
};

fn.call(undefined,1,2,3);
```
#### 伪数组的特点
1. 具有length属性，可根据索引获取元素
```
function fn(){
    console.log(arguments.length);  // 3 
    console.log(arguments[0]); // 1
};
fn.call(undefined,1,2,3);


function fn2(){
    console.log(arguments.length);  // 1
    console.log(arguments[0]); // [1,2,3]
};
fn2.call(undefined,[1,2,3]);
```
2. 不可使用push,pop,slice,join等数组方法
```
function fn(){
    console.log(arguments.join('-')); 

};
fn.call(undefined,1,2,3);

// 报错：Uncaught TypeError: arguments.join is not a function
```

#### 将伪数组转换为数组
1. slice会将具有索引的对象转化为数组，可利用它实现转换
```
function fn(){

    array=Array.prototype.slice.call(arguments);

    console.log(array.join('-')); // 1-2-3
};
fn.call(undefined,1,2,3);
```
2. ES6:array = Array.from(arrayLike) 
```
function fn(){

    array=Array.from(arguments) 

    console.log(array.join('-')); // 1-2-3
};
fn.call(undefined,1,2,3);
```
3. ES6:array=[...arguments]
```
function fn(){

    array=[...arguments];

    console.log(array.join('-')); // 1-2-3
};
fn.call(undefined,1,2,3);
```

#### [...arr] 是 arr 的深拷贝吗
```
let arr=[1,2]
let arr2=[...arr]
arr2.push(3)
arr // [1,2]
```
```
let arr1=[{age:11},{age:12}]
let arr2=[...arr1]
arr2[1].age=15
arr1 // [ { age: 11 }, { age: 15 } ]
arr2 // [ { age: 11 }, { age: 15 } ]
```
> let arr2=[...arr] 的含义是复制元素在内存中的栈地址。所以如果 arr 中某个元素为对象，则该元素为深拷贝，如果某个元素为数值一类，则该元素为浅拷贝


#### 交换两个数的值
```
a=3;
b=4;

[a,b]=[b,a];
console.log(a); // 4
console.log(b); // 3
```

#### join
* 语法
```
var array = ['a','b','c']
array.join('-') // 结果是 'a-b-c'
```
* 实现
```
Array.prototype.join = function(char){
  let result = this[0] || ''
  let length = this.length
  for(let i=1; i< length; i++){
      result += char + this[i]
  }
  return result
}
```
* 如果数组包含 undefined 呢
> undefined 会变成一个空格
```
let arr=[1,2,3,undefined,undefined,4]
arr.join(' ') // "1 2 3   4"
```
> 不想要多余空格呢?
```
let arr=[1,2,3,undefined,undefined,4]
arr.filter(Boolean).join(' ') // "1 2 3 4"
```

#### [splice:删除](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/splice)
* arr.splice(从第几个元素开始操作,准备删除的元素个数,准备插入的元素)
```
var months = ['Jan', 'March', 'April', 'June'];

// 在第1个元素处删除0个元素,再插入'Feb'
months.splice(1, 0, 'Feb');
console.log(months); // ['Jan', 'Feb', 'March', 'April', 'June']

// 在第4个元素处删除1个元素,再插入['May'，'Sep','Oct']
months.splice(4, 1, ['May'，'Sep','Oct']); // [ 'Jan', 'Feb', 'March', 'April', [ 'May', 'Sep', 'Oct' ] ]
```

#### slice:切片
* 语法
```
arr=[1,2,3,4,5,6,7];
console.log(arr.slice(1,3)); // [2,3]
```
* 实现
```
Array.prototype.slice = function (begIndex, endIndex) {

    let result = [];

    let length = this.length

    // 若beginIdex存在,则beg=begIndex,否则beg=0
    let beg = begIndex || 0;
    let end = endIndex || length;

    for (let i = beg; i < end; i++) {
        result.push(this[i]);
    }
    return result;
}
```
#### shift:删除第一个元素
```
let arr=[2,3,4]
arr.shift()
arr // [3, 4]
```
#### unshift:头部插入元素
```
let arr=[3,4]
arr.unshift(5)
arr// [5, 3, 4]
```
#### sort:没有返回值
* 语法
```
arr=[1,2,3,4,5,6,7];
arr.sort((a,b)=>b-a) // arr变为[7,6,5,4,3,2,1]
```
* 实现(注意Array.prototype.sort没有返回值)
```
Array.prototype.sort=function(fn){

    // 默认fn为(a,b)=>a-b;
    fn= fn||(a,b)=>a-b;

    let length = this.length;
    for(let i=0;i<;i++){
        for(let k=i+1;k<length;k++){
            if(fn.call(undefined,this[i],this[k])>0){
                [this[i],this[k]]=[this[k],this[i]];
            }
        }
    }
}
```
* 默认的sort是按字典序排序的
```
let arr=[1,11,101,123,112]
undefined
arr.sort() // [1, 101, 11, 112, 123]
```

#### 对象数组按某个字段排序
```
let dataSource=[{name:'libai',score:80},{name:'zhangfei',score:90},{name:'dufu',score:82}]
dataSource.sort((a,b)=>a.score-b.score)

dataSource // [{name:'libai',score:80},{name:'dufu',score:82},{name:'zhangfei',score:90}]
```

#### forEach
* 语法
```
arr=[1,2,3,4,5,6,7];

arr.forEach((item,index) => {
    console.log(index+':'+item);
});

/*
0:1
1:2
2:3
3:4
4:5
5:6
6:7
*/
```
* 实现
```
Array.prototype.forEach(fn){

    let length = this.length;
    for(let i=0;i<length;i++){
        if(i in this){
            fn.call(undefined,this[i],i,this);
        }
    }
}
```

#### forEach 实现列表更新
> 注意 forEach 的参数 item 只是一个值的副本（若元素为对象，则 item 为一个堆地址值）
```
let arr=[1,2,3]
arr.forEach(item=>{
    item=10 // item 只是每个元素值的副本，对 item 进行赋值无法影响原数组
})

arr // [1,2,3]
```
想要更新原数组，必须使用 index
```
let arr=[1,2,3]
arr.forEach((item,index)=>{
    arr[index]=10 // item 只是每个元素值的副本，对 item 进行赋值无法影响原数组
})

arr // [10,10,10]
```

#### forEach 对象数组操作
> 应该使用"更新字段"而非"对象赋值"
```
// 更新字段
let arr=[{age:12},{age:13}]
let obj={age:10}
arr.forEach((item,index)=>{
    arr[index].age=obj.age // 或者 item.age=obj.age 
})

arr // [{age:10},{age:10}]
```
注意不要用以下写法
```
// 对象赋值
let arr=[{age:12},{age:13}]
arr.forEach((item,index)=>{
    arr[index]= obj
})
```

#### [常用]map
* 典型场景：从获取子组件数组的name
```
let names=this.$children.map(item=>item.name)
```
* 语法
```
arr=[1,2,3,4,5,6]
res=arr.map(item=>item*10) // [10,20,30,40,50,60]
```
* 实现
```
Array.prototype.forEach(fn){

    let result=[];
    let temp;

    let length = this.length;
    for(let i=0;i<length;i++){
        if(i in this){

            // 如果fn有返回值，则把返回值放入result数组
            if(temp=fn.call(undefined,this[i],i,this)){
                result.push(temp);
            }
        }
    }
    return result;
}
```
#### 用 map 和 sort 判断两个数组的元素id是否完全一致
在实际项目中，用于判断用户是否选中所有数据（全选）
```
    let dataIds = this.dataSource.map(item => item.id).sort()
    let selectedIds = this.selectedItems.map(item => item.id).sort()
    if (dataIds.length !== selectedIds.length)
        return false
    else {
        let notEqual = false
        for (let i = 0; i < dataIds.length; i++) {
            if (dataIds[i] !== selectedIds[i])
                notEqual = true
        }
        return !notEqual // 全选为true,没有全选为false
    }
}
```

#### filter
* 语法
```
arr=[1,2,3,4,5,6]
res=arr.filter(item=>item%2==0) // [2,4,6]
```
* 实现
```
Array.prototype.filter(fn){

    let result=[];
    let temp;

    let length = this.length;
    for(let i=0;i<length;i++){
        if(i in this){

            // fn返回值一定为bool量,如果该bool量为true，则说明当前this[i]符合条件
            if(temp=fn.call(undefined,this[i],i,this)){
                result.push(this[i]);
            }
        }
    }
    return result;
}
```
#### reduce(用累加求和来理解)
* 语法
```
arr=[1,2,3,4,5,6]

arr.reduce((result,item)=>result+=item,0) // 0即为result的初值，最终会返回result值!!!
```
* 实现
```
Array.prototype.reduce(fn,init){

    let result=init;

    let length = this.length;
    for(let i=0;i<length;i++){
        if(i in this){
            result=fn.call(undefined,result,this[i],i,this);
        }
    }
    return result;
}
``` 
#### react 的 custom hook
```
export const useMethods = (initialValue, methods) => {
    const [value, setValue] = useState(initialValue);
    const boundMethods = useMemo(
        () => Object.entries(methods).reduce(
            (methods, [name, fn]) => {
                const method = (...args) => {
                    setValue(value => fn(value, ...args));
                };
                methods[name] = method;
                return methods;
            },
            {}
        ),
        [methods]
    );
    return [value, boundMethods];
};
```


#### 用redue实现map
```
array2 = array.map( (v) => v+1 )
```
等价于
```
array2=arr.reduce((result,item)=>{ 
    result.push(item+1)
    return result
},[])
```

#### 用reduce实现filter
```
array2 = array.filter( (v) => v % 2 === 0 )
```
等价于
```
array2=arr.reduce((result,item)=>{ 
    if(item%2==0){ result.push(item) }
    return result
},[])
```
#### flat:拍平数组
```
// flat:拍平多维数组（二维->一维）
const flat=(array)=>{
    let result=[]
    array.forEach((item)=> {
        if (item instanceof Array) {
            result.push(...item)
        } else {
            result.push(item)
        }
    })
    return result
}

let arr=[1,2,[3,4]]
console.log(flat(arr)) // [1, 2, 3, 4]
```

#### zip:拉拉链（数组变对象）
```
const zip=(arr)=>{
    let res={}
    arr.map(item=>{
        res={...res,[item[0]]:item[1]}
    })
}
const arr=[['a',1],['b',2],['c',3]]
console.log(res)// {a: 1, b: 2, c: 3}
```

#### entries（对象变数组）
```
const obj={A:[1,2,3],B:[4,5,6],C:[7,8,9]}
const arr=Object.entries(obj) 
console.log(arr) // [['A',[1,2,3]],['B',[4,5,6]],['C',[7,8,9]]]
```
#### 去除数组中的 undefiend 元素
```
let arr=[1,undefined,2,'a',undefined]
arr.filter(Boolean) // [1, 2, "a"]
```
---
#### some
some() 方法测试数组中是不是至少有1个元素通过了被提供的函数测试。它返回的是一个Boolean类型的值。
```
const arr=[1,2,3,4,5,6]

arr.some(item=>item%2==0) // true
```

#### concat
注意参数可以是数组也可以是值
```
let arr=[2,3,4]

let arr2=arr.concat(5,6) 

arr2// [2,3,4,5,6]
```
```
let arr=[2,3,4]

let arr2=arr.concat([5,6]) 

arr2 // [2,3,4,5,6]
```

#### 模拟实现 flat 函数
```
let arr = [1, 2, [3, 4, 5, [6, 7], 8], 9, 10, [11, [12, 13]]]

const flatten = function (arr) {
    while (arr.some(item => Array.isArray(item))) {
        arr = [].concat(...arr)
    }
    return arr
}

console.log(flatten(arr))
```

---
#### 【笔试输入】str.split(' ').map(Number) 
```
let str='23 45 67 89' // let str=readline()

str.split(' ').map(Number) // [23,45,67,89]
```


#### Icon-font 如何生成 svj.js 文件
我的项目->下载至本地->获取到 iconfont.js 文件-> 将 iconfont.js 加入项目，重命名为 svg.js
