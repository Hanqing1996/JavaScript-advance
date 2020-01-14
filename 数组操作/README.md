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
* DOM元素集合是伪数组
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

#### [splice](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/splice)
* arr.splice(从第几个元素开始操作,准备删除的元素个数,准备插入的元素)
```
var months = ['Jan', 'March', 'April', 'June'];

// 在第1个元素处删除0个元素,再插入'Feb'
months.splice(1, 0, 'Feb');
console.log(months); // ['Jan', 'Feb', 'March', 'April', 'June']

// 在第4个元素处删除1个元素,再插入['May'，'Sep','Oct']
months.splice(4, 1, ['May'，'Sep','Oct']); // [ 'Jan', 'Feb', 'March', 'April', [ 'May', 'Sep', 'Oct' ] ]
```

#### slice
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
#### sort
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
#### forEach(忘掉forEach,只用map)
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

arr.reduce((result,item)=>result+=item,0) // 这里会返回result值!!!
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
