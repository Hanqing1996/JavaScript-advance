#### 事件冒泡
1. 点击button后，会设置div的监听事件，并触发div的监听事件
```
    <div class="divclass" style="width: 100px;height:200px;background-color: red">
        <button class="btn">点我</button>
    </div>

let div=document.getElementsByClassName('divclass')[0]
let button=document.getElementsByClassName('btn')[0]
button.addEventListener('click',()=>{
    console.log('button 被点击了')  
    div.addEventListener('click',()=>{
    console.log('div 被点击了')
    })
})
```
[解决方法]()
2. 点击button后，会触发div和button的监听事件
```
    <div class="divclass" style="width: 100px;height:200px;background-color: red">
        <button class="btn">点我</button>
    </div>


let div=document.getElementsByClassName('divclass')[0]
let button=document.getElementsByClassName('btn')[0]
button.addEventListener('click',(e)=>{
    console.log('button被点击了')
})
div.addEventListener('click',()=>{
    console.log('div被点击了')
})
```
[解决方法]()
可以这么理解,div的监听事件一旦设置完毕后，就会立即贪婪地观察button的监听事件是否被触发，如果button被触发，那么div也被触发

