function Human(color, name) {

    this.color = color;
    this.name = name;
}

// Human共有属性
Human.prototype.吃 = ''
Human.prototype.喝 = ''
Human.prototype.拉 = ''
Human.prototype.撒 = ''

function Solider(ID) {

    // 为this增加human私有属性,这里的Human不是构造函数，就是一个普通的函数!!!    
    Human.call(this, 'yellow', 'nezha');

    this.ID = ID;
    this.生命值 = 42
}

// Solider共有属性
Solider.prototype.兵种 = "美国大兵"
Solider.prototype.攻击力 = 5
Solider.prototype.行走 = function () { /*走俩步的代码*/ }
Solider.prototype.奔跑 = function () { /*狂奔的代码*/ }
Solider.prototype.死亡 = function () { /*Go die*/ }
Solider.prototype.攻击 = function () { /*糊他熊脸*/ }
Solider.prototype.防御 = function () { /*护脸*/ }


Solider.prototype.__proto__ = Human.prototype;

/**
 * s.__proto__是
 * {
 * 兵种 :"美国大兵",
 * 攻击力:5,
 * 行走:function(){},
 * 奔跑:function(){},
 * 死亡:function(){},
 * 攻击:function(){},
 * 防御:function(){},
 * }
 * 
 * s__proto__.__proto__是
 * {
 * 吃:'',
 * 喝:'',
 * 拉:'',
 * 撒:'',
 * }
 */
var s = new Solider(1);

console.log(s);
