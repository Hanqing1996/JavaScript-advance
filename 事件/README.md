#### 事件冒泡
1. [设置button的监听事件，点击button后，会触发button的监听事件，然后设置div的监听事件，然后触发div的监听事件]()
[解决方法1:stopPropagation]()
[解决方法1:异步]()
2. [设置button和div的监听事件,点击button后，会触发div和button的监听事件]()
[解决方法1:stopPropagation]()
[解决方法1:异步]()
* 可以这么理解,div的监听事件一旦设置完毕后，就会立即贪婪地观察子元素button的监听事件是否被触发，如果button被触发，那么div也被触发
* 1和２本质是一样的，关键是要理解,事件冒泡的核心问题在于div的监听事件一旦设置完毕后，就会立即贪婪地观察子元素button的监听事件是否被触发，如果button被触发，那么div也被触发
