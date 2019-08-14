/**
 * 以下代码在Chrome控制台中运行
 */
obj = {
    name: 'frank',
    age: 19
}

// 通过obj增加公共属性
obj.__proto__.gender = '男';

obj2 = {};
console.log(obj2.__proto__.gender);

// 设置多层__proto__
person = {
    种族: '人类',
    行走方式: '直立行走'
}

// 将obj的__proto__重定向为person
obj.__proto__ = person;

console.log(obj); // 两层__proto__,第一层为person，第二层为window.Object.protype

console.log(obj2); // 但是obj2只有一层__proto__

