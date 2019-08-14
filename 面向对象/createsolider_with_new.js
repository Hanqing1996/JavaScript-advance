function Solider(ID) {

  this.ID = ID;
  this.生命值 = 42
}

// 共有属性
Solider.prototype.兵种 = "美国大兵"
Solider.prototype.攻击力 = 5
Solider.prototype.行走 = function () { /*走俩步的代码*/ }
Solider.prototype.奔跑 = function () { /*狂奔的代码*/ }
Solider.prototype.死亡 = function () { /*Go die*/ }
Solider.prototype.攻击 = function () { /*糊他熊脸*/ }
Solider.prototype.防御 = function () { /*护脸*/ }

/**
 * s.proto={
 * 兵种 :"美国大兵",
 * 攻击力:5,
 * 行走:function(){},
 * 奔跑:function(){},
 * 死亡:function(){},
 * 攻击:function(){},
 * 防御:function(){},
 * }
 */
var s = new Solider(1);
