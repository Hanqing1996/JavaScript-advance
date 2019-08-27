var per={
    name:'liming',
    age:12,
    gender:'male'
}

var {name,age,gender}=per;

console.log(name); // liming

var p={per}
console.log(p); // { per: { name: 'liming', age: 12, gender: 'male' } }