var express = require('express');
var router = express.Router();
var multer = require('multer');
var path = require('path');
var fs = require('fs');
/* GET users listing. */
//文件上传
router.use(multer({dest:'/public/file'}).any())
router.post('/img',(req,res)=>{
	var f = req.files[0]
	var oldname = f.filename
	var newname = oldname+path.parse(f.originalname).ext
	fs.renameSync('./public/file/'+oldname,'./public/file/'+newname)
	res.send('/file/'+newname)
})
module.exports = router;
