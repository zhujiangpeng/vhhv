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
module.exports = router;
