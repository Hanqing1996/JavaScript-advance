const express=require('express')
const multer  = require('multer')
const upload = multer({ dest: 'uploads/' })
const cors = require('cors')

const app=express()
app.use(cors()) // 允许跨域

app.post('/upload', upload.single('xxx'), function (req, res) {
    res.json({key: req.file})
})
app.get('/hh',(req,res)=>{
    res.send('hello node.js')
})

app.listen(3000)