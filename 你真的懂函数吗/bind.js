var view={
    element:{name:'div'}, // 假设这是一个div对象

    // 为对象元素绑定事件
    bindEvents:function(){

        // 绑定点击事件,这里的this在通过call调用函数bindEvents时才知道是什么
        this.element.onclick=function(){

            this.onclick.call(view);

        };

        // 绑定悬浮事件

        // 绑定xx事件
    },

    // 
    onclick:function(){
        console.log(this.element.name+'被点击啦');
    }
}

view.bindEvents.call(view); // 绑定事件,指定是this是view

if(view.element) // 如果元素被点击，则触发点击事件,这里简写成view.element了,实际应该是if(view.element clicked){}
{
    view.element.onclick.call(view);
}

/** 
 * 现在有一个问题,实际浏览器在调用view.element.onclick时this会指定为view.element而非view
 * 那么代码该如何调整呢?
*/


/**
 * solution1:不要用猜不透的this,直接用view调用函数
 */
var view={
    element:{name:'div'}, 

    bindEvents:function(){

        view.element.onclick=function(){

            view.onclick.call(view);

        };
    },

    onclick:function(){
        console.log(this.element.name+'被点击啦');
    }
}

view.bindEvents.call('undefined'); 

if(view.element)
{
    view.element.onclick.call(view.element);
}


/**
 * solution2:就要用this(执迷不悟)，那么就用一个变量_this存下view
 */

var view={
    element:{name:'div'},

    bindEvents:function(){

        _this=this;
        // this.element.onclick=function(){

        //     _this.onclick.call(_this);

        // };

        this.element.onclick=this.onclick.bind(this);
    },

    onclick:function(){
        console.log(this.element.name+'被点击啦');
    }
}

view.bindEvents.call(view);

if(view.element) 
{
    view.element.onclick.call(view.element);
}

/**
 * 用bind简化代码 
 *
 */
var view={
    element:{name:'div'},

    bindEvents:function(){

        // _this=this;
        // this.element.onclick=function(){

        //     _this.onclick.call(_this);

        // };

        // 此写法等价于上面注释代码
        this.element.onclick=this.onclick.bind(this);

    },

    onclick:function(){
        console.log(this.element.name+'被点击啦');
    }
}

view.bindEvents.call(view);

if(view.element) 
{
    view.element.onclick.call(); // 这里call参数没有写，但是this会默认为bind指定的this
}
