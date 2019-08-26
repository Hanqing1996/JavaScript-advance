import module1 from './m1'
import module2 from './m2'

setTimeout(()=>{
    module1()
},3000)

setTimeout(()=>{
    module2()
},2000)