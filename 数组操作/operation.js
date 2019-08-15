arr = [1, 2, 3, 4, 5, 6, 7];

/**
 * join
 */
console.log(arr.join('-')); // 1-2-3-4-5-6-7

/**
 * slice
 */
console.log(arr.slice(1, 3)); // [2,3]

/**
 * sort
 */
 console.log(arr.sort((a,b)=>b-a)); // arr变为[7,6,5,4,3,2,1]


 /**
  * forEach
  */
 arr.forEach(item => {
     console.log(item);
 }); // 7,6,5,4,3,2,1

/**
 * map
 */
arr.map(item=>item*10)

/**
 * filter
 */
let res=arr.filter(item=>item%2==0) 
console.log(res);


/**
 * reduce
 */
arr.reduce((result,item)=>result+=item,0)