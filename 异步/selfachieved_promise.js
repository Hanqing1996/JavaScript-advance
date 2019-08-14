/**
 * 问题地址:
 * https://xiedaimala.com/tasks/894f23ca-d3d9-4422-b19d-52f92feea684/quizzes/4c717c98-3425-4cc7-b098-467d0e9e43e0
 * 
 * 整体流程:
 * 3秒后successNotify被调用,status的值变为resolved,
 * 
 */

function Promise(fn){
    var status = 'pending'
    function successNotify(){
        status = 'resolved'
        toDoThen.apply(undefined, arguments)
    }
    function failNotify(){
        status = 'rejected'
        toDoThen.apply(undefined, arguments)
    }
    
    function toDoThen(){
        setTimeout(()=>{ // 保证回调是异步执行的
            if(status === 'resolved'){
                for(let i =0; i< successArray.length;i ++)    {
                    successArray[i].apply(undefined, arguments)
                }
            }else if(status === 'rejected'){
                for(let i =0; i< failArray.length;i ++)    {
                    failArray[i].apply(undefined, arguments)
                }
            }
        })

    }
    var successArray = []
    var failArray = []

    // 成功则调用successNotify,失败则调用failNotify
    fn.call(undefined, successNotify, failNotify)
    return {

        // resolved则调用successFn,rejected则调用failFn
        then: function(successFn, failFn){
            successArray.push(successFn)
            failArray.push(failFn)
            return undefined // 简化
        }
    }
}

var promise = new Promise(function(x,y){
    setTimeout(()=>{
        x(101)
    }, 3000)
})
promise.then((z)=>{
    console.log(z)  // 101
})
