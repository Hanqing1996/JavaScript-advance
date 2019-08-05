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
person.sayHi(person)
person.sayBye(person)
person.say(person, 'How are you')

/**
 * 为了减少person这个词，我们创造了this
 */
var person = {
    name: 'frank',
    sayHi: function(){
        console.log('Hi, I am' + this.name)
    },
    sayBye: function(){
        console.log('Bye, I am' + this.name)
    },
    say: function(word){
        console.log(word + ', I am' + this.name)
    }
}

person.sayHi.call(person)
person.sayBye.call(person)
person.say.call(person, 'How are you')

// 语法糖版
person.sayHi()
person.sayBye()
person.say('How are you')