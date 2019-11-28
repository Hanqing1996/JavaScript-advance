#### 事件冒泡
* 事件冒泡流程
```
<div class='parent'>
    <div class='child'></div>
</div>
```
1. child和parent都设置了click监听事件
2. 点击了child,child的click事件会被触发,且冒泡到parent,从而触发parent的click事件,但是注意此时parent的click事件的event.target是child
* 阻止事件冒泡
```
<div class=''>
    <div class='child1'></div>
    <div class='child2'></div>
</div>

child2.addEventListener('click',(e)=>{
    e.stopPropagation()
})
```
1. child1,child2和parent都设置了click监听事件,且child2设置了阻止冒泡
2. 点击了child1,child1的click事件会被触发,且冒泡到parent,从而触发parent的click事件,且parent的click事件的event.target是child1
3. 点击了child1,child1的click事件会被触发,但不会冒泡到parent,也就不会触发parent的click事件
---
* 注意
1. 哪怕child没有设置监听事件，在child被点击时还是会冒泡到parent
2. 设置setTimeout，则在setTimeout内设置的监听事件本次不会被触发(但是之后还是会)
3. 事件冒泡不一定是坏事，很多时候我们要借助事件冒泡机制来做很多事