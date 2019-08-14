class Human {
    constructor(options) {

        // Human私有属性
        this.color = options.color;
        this.name = options.name;

        // 私有属性可以是函数
        this.hobby=options.hobby;
    }

    // Human公有属性
    eat() { };
    drink() { };
    poon() { };

    // 注意公有属性只能是函数
}

// extends实现了Solider.prototype.__proto__ = Human.prototype
class Solider extends Human {

    constructor(options) {

        // 为用Solider创造的对象设置作为Human的私有属性
        super(options)

        // 为用Solider创造的对象设置作为Solider的私有属性
        this.ID = options.ID;
        this.生命值 = 42;
        this.兵种 = "美国大兵";
        this.攻击力 = 5;

    }

    // Soliser公有属性
    行走() { };
    奔跑() { };
    死亡() { };
    攻击() { };
    防御() { }
}

options = {

    // s作为Solider的私有属性 
    ID: 1,

    // s作为Human的私有属性
    name: "nezha",
    color: "yellow",
    hobby:function(){
        console.log('I like playing football');
    }
    
}
var s = new Solider(options);

s.hobby(); // I like playing football


