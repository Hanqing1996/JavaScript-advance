/**
 * 第一题：
 * 写出一个构造函数 Animal
 * 输入为空
 * 输出为一个新对象，该对象的共有属性为 {行动: function(){}}，没有自有属性
 */

function Animal() {
}

Animal.prototype.行动 = function () { };

a = new Animal();
console.log(Animal);


/**
 * 第二题：
 * Human 继承 Animal
 * 输入为一个对象，如 {name: 'Frank', birthday: '2000-10-10'}
 * 输出为一个新对象，该对象自有的属性有 name 和 birthday，共有的属性有物种（人类）、行动和使用工具
 */

function Human(options) {

    this.name = options.name;
    this.birthday = options.birthday;
}


function Animal(options) {
}

Animal.prototype.行动 = function () { };
Animal.prototype.使用工具 = function () { };


// 下面两句代码的次序可以颠倒
Human.prototype.物种 = '人类';
Human.prototype.__proto__ = Animal.prototype;

options={
    name:'xaoming',
    birthday:'2011-09-02',
}
var b = new Human(options)

console.log(b);


/**
 * 第三题：
 * 写出一个构造函数 Asian
 * Asian 继承 Human
 * 输入为一个对象，如 {city: '北京', name: 'Frank', birthday: '2000-10-10' }
 * 输出为一个新对象，该对象自有的属性有 name city 和 bitrhday，共有的属性有物种、行动和使用工具和肤色
 */

function Asian(options){

    Human.call(this,options);

    // c作为Asian的私有属性
    this.city=options.city;
}

// c作为Asian的共有属性
Asian.prototype.肤色 = '黄色';

function Human(options) {

    // c作为Human的私有属性
    this.name = options.name;
    this.birthday = options.birthday;
}

// c作为Human的公有属性
Human.prototype.物种 = '人类';

function Animal(options) {
}

// c作为Animal的共有属性
Animal.prototype.行动 = function () { };
Animal.prototype.使用工具 = function () { };


Asian.prototype.__proto__ = Human.prototype;
Human.prototype.__proto__ = Animal.prototype;

options={
    city: '北京', 
    name: 'Frank', 
    birthday: '2000-10-10' 
};

var c=new Asian(options);



