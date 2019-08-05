function getSum()
{
    var sum=0;
    for(var i=0;i<arguments.length;i++)
    {
        sum+=i;
    }
    return sum;
}
var arr=[1,2,3,4,5]

var sum=getSum.call(undefined,arr) //arr为不定长数组时,只能用apply,用call得不到结果
console.log(sum);