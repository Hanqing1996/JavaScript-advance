const express = require('express')
const multer  = require('multer')
const cors = require('cors')
const upload = multer({ dest: 'uploads/' })
const path = require('path')

const app = express()

app.use(cors()) // 允许跨域

// 这里的 'file' 与 form.html 里的 'file' 对应
app.post('/upload',  upload.single('uploadFile'), function (req, res, next) {
    let fileName=req.file.filename
    let object={id:fileName}
    res.end(JSON.stringify(object))
})


app.get('/preview/:name', function (req, res, next) {
    console.log(`服务器响应 download 时间：第${new Date().getMilliseconds()}毫秒`);
    var options = {
        root: path.join(__dirname, 'uploads'),
        headers: {
            'Content-Type': 'image/jpeg',
        }
    }

    var fileName = req.params.name
    res.sendFile(fileName, options, function (err) {
        if (err) {
            next(err)
        } else {
            console.log('Sent:', fileName)
        }
    })
})


app.listen(3000, function () {
    console.log('Example app listening on port 3000!')
})