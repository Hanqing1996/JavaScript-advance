/**
 * 原型链可以实现对象和对象的共有属性的继承
 */

var personCommon = {
  吃: '',
  喝: '',
  拉: '',
  撒: '',
}

var soliderCommon = {
  兵种: "美国大兵",
  攻击力: 5,
  行走: function () { /*走俩步的代码*/ },
  奔跑: function () { /*狂奔的代码*/ },
  死亡: function () { /*Go die*/ },
  攻击: function () { /*糊他熊脸*/ },
  防御: function () { /*护脸*/ }
}

soliderCommon.__proto__ = personCommon;

var s = {};

s.__proto__ = soliderCommon
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


/**
 * 私有属性不能通过原型链来继承获得
 */

// s的私有属性
s.ID = 1;
s.生命值 = 42;
s.color = 'yellow';
s.name = 'nezha';

