let obj1={
    name:'liming'
}

let obj2=JSON.parse(JSON.stringify(obj1))

obj1.age=12

console.log(obj2);