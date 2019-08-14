/**
 * https://xiedaimala.com/tasks/5833c9d4-ebd5-44e4-91b5-661f476f9cad/video_tutorials/4312943e-4fd3-4225-97e5-d4f04d6845be
 * 
 */

// 构造函数，返回一个士兵对象
function Solider(ID) {
  var obj = {}

  // 为obj指定__proto__
  obj.__proto__ = Solider.soliderprotoype;

  obj.ID = ID
  obj.生命值 = 42

  return obj
}


// 为obj重定向__proto__(函数也是对象，这句话是为函数Solider增加了一个属性，属性值为一个对象)
Solider.soliderprotoype = {
  兵种: "美国大兵",
  攻击力: 5,
  行走: function () { /*走俩步的代码*/ },
  奔跑: function () { /*狂奔的代码*/ },
  死亡: function () { /*Go die*/ },
  攻击: function () { /*糊他熊脸*/ },
  防御: function () { /*护脸*/ }
}

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
var s = Solider(1);



