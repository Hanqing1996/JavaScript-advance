let obj1={
    name:'Jack',
}

let obj2={...obj1};


obj1.gender='male'

console.log(obj2) // { name: 'Jack'}