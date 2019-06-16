var express = require('express');
var router = express.Router();
var pool = require('./pool');
/* GET users listing. */
//注册
router.post('/up',(req,res)=>{
	var json = req.body
	pool.conn({
		arr:[json.user],
		sql:'select user from login where user=?',
		success(data){
			if (data.length) {
				res.send('账号已存在')
			}else{
				pool.conn({
					arr:[json.user,json.name,json.pass,json.img],
					sql:'insert into login(user,pass,name,img) values(?,?,?,?)',
					success(data){
						res.send('注册成功')
					},
					error(err){
						res.send(err)
					},
				})
			}
		}
		error(err){
			res.send(err)
		}
	})
})
//登录
router.post('/in',(req,res)=>{
	var json = req.body
	pool.conn({
		arr:[json.user,json.pass],
		sql:'select * from login where user=? and pass=?',
		success(data){
			if (data.length) {
				data[0].pass = ''
				res.send(data[0])
			}else{
				res.send('ok')
			}
		},
		error(err){
			res.send(err)
		}
	})
})
//个人中心
//创建小说
router.get('/create',(req,res)=>{
	var json = req.query
	pool.conn({
		arr:[json.uid],
		sql:'insert into my(name,bookimg,title,chapter,info) values(?,?,?,?,?)',
		success(data){
			res.send(data)
		},
		error(err){
			res.send(err)
		}
	})
})
//书架
router.get('/list',(req,res)=>{
	var json = req.query
	pool.conn({
		arr:[json.uid],
		sql:'select * from list where uid=?',
		success(data){
			res.send(data)
		},
		error(err){
			res.send(err)
		}
	})
})
//分页
router.get('/page',(req,res)=>{
	var json = req.query
	var type = Number(json.type)//每页几个
	var page = (Number(json.page)-1) * type
	pool.conn({
		arr:[type,page]
		sql:'select uid from list limit ?',
		success(data){
			res.send(data)
		}
		error(err){
			res.send(err)
		}
	})
})
//小说章节
router.get('/chapter',(req,res) =>{
	var json = req.query 
	pool.conn({
		arr:[json.title,json.text],
		sql:'insert into chapter(title,text) values(?,?)',
		success(data){
			res.send(data)
		},
		error(err){
			res.send(err)
		}
	})
})
//小说/书
router.get('/book',(req,res) =>{
	var json = req.query
	pool.conn({
		arr:[json.title,json.name,json.info,json.bookimg,json.chapter],
		sql:'select * from list where uid=?',
		success(data){
			res.send(data)
		},
		error(err){
			res.send(err)
		}
	})
})
//小说详情
router.get('/xq',(req,res)=>{
	var json = req.query
	pool.conn({
		arr:[json.title,json.img,json.chapter,json.name,json.info],
		sql:'select * from xq where uid=?',
		success(data){
			res.send(data)
		},
		error(err){
			res.send(err)
		},
	})
})
//评论
router.post('/pl',(req,res)=>{
	var json = req.body
	pool.conn({
		arr:[json.title,json.user,json.img,json.p_text],
		sql:'insert into auto_text(title,user,img,p_text) values(?,?,?,?)',
		success(data){
			res.send(data)
		},
		error(err){
			res.send(err)
		},
	})
})
module.exports = router;
