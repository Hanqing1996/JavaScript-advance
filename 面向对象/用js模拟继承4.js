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

    Human.call(this, "yellow", "nezha")

    this.ID = ID;
    this.生命值 = 42
}


function Empty(){
} 

Empty.prototype=Human.prototype; // 1. Empty.prototype=Human.prototype;

var temp = new Empty(); // 2. temp.__proto__=Empty.prototype
Solider.prototype = temp;// 3. Solider.prototype.__proto__ = temp.__proto__

// 1 2 3 合起来就干了一件事：Solider.prototype.__proto__ = Human.prototype;


// Solider共有属性
Solider.prototype.兵种 = "美国大兵"
Solider.prototype.攻击力 = 5
Solider.prototype.行走 = function () { /*走俩步的代码*/ }
Solider.prototype.奔跑 = function () { /*狂奔的代码*/ }
Solider.prototype.死亡 = function () { /*Go die*/ }
Solider.prototype.攻击 = function () { /*糊他熊脸*/ }
Solider.prototype.防御 = function () { /*护脸*/ }


var s = new Solider(1);

console.log(s);


