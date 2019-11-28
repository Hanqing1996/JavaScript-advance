#### 事件冒泡
* 事件冒泡流程
```
<div class='parent'>
    <div class='child'></div>
</div>
```
1. child和parent都设置了click监听事件
2. 点击了child,child的click事件会被触发,且冒泡到parent,从而触发parent的click事件
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
2. 点击了child1,child1的click事件会被触发,且冒泡到parent,从而触发parent的click事件
3. 点击了child1,child1的click事件会被触发,但不会冒泡到parent,也就不会触发parent的click事件

1. [设置button的监听事件，点击button后，会触发button的监听事件，然后设置div的监听事件，然后触发div的监听事件](https://github.com/Hanqing1996/JavaScript-advance/blob/master/%E4%BA%8B%E4%BB%B6/%E4%BA%8B%E4%BB%B6%E5%86%92%E6%B3%A11.html)
[解决方法:stopPropagation](https://github.com/Hanqing1996/JavaScript-advance/blob/master/%E4%BA%8B%E4%BB%B6/%E4%BA%8B%E4%BB%B6%E5%86%92%E6%B3%A11%E7%94%A8stopPropagation%E8%A7%A3%E5%86%B3%20.html)
2. [设置button和div的监听事件,点击button后，会触发div和button的监听事件](https://github.com/Hanqing1996/JavaScript-advance/blob/master/%E4%BA%8B%E4%BB%B6/%E4%BA%8B%E4%BB%B6%E5%86%92%E6%B3%A12.html)
[解决方法:stopPropagation](https://github.com/Hanqing1996/JavaScript-advance/blob/master/%E4%BA%8B%E4%BB%B6/%E4%BA%8B%E4%BB%B6%E5%86%92%E6%B3%A12%20%E7%94%A8stopPropagation%E8%A7%A3%E5%86%B3.html)
* 可以这么理解,div的监听事件一旦设置完毕后，就会立即贪婪地观察子元素button的监听事件是否被触发，如果button被触发，那么div也被触发
* 1和２本质是一样的，关键是要理解,事件冒泡的核心问题在于div的监听事件一旦设置完毕后，就会立即贪婪地观察子元素button的监听事件是否被触发，如果button被触发，那么div也被触发
