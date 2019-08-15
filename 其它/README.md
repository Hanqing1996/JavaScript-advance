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
