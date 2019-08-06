var person = {
    name: 'frank',
    sayHi: function(person){
        console.log('Hi, I am' + person.name)
    },
    sayBye: function(person){
        console.log('Bye, I am' + person.name)
    },
    say: function(person, word){
        console.log(word + ', I am' + person.name)
    }
}
person.sayHi.call(person)
person.sayBye.call(person)
person.say.call(person, 'How are you')

/**
 * 我们想减少person这个词,该怎么做呢
 */
var person = {
    name: 'frank',

    // 用this代替person，代价是函数的this必须在调用时指定是person
    sayHi: function(){
        console.log('Hi, I am' + this.name) // 这里的this在通过call调用函数sayHi时才知道是什么
    },
    sayBye: function(){
        console.log('Bye, I am' + this.name)
    },
    say: function(word){
        console.log(word + ', I am' + this.name)
    }
}

person.sayHi() // 这里其实就是person.sayHi.call(person)，只是一个无聊的语法糖
person.sayBye()
person.say('How are you')


