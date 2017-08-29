import express  from  'express'
import Admin from '../models/Admin'
import passwordHash from 'password-hash'
import uuid  from 'uuid'
import validator from '../util/validator'
import async from 'async'
const router=express.Router();

router.post("/login",function(req,res){
	if(!validator.isEqual(req.session.captchaToken,req.body.captchaCode) ){
		return res.json({
				error:1,
				result:"验证码不正确"
			})
	}
	if(!validator.checkUserName(req.body.username)){
		return res.json({
				error:1,
				result:"帐号格式不正确"
			})
	}
	if(!validator.checkPassword(req.body.password)){
		return res.json({
				error:1,
				result:"密码格式不正确"
			})
	}
	


	Admin.getAdminByUserName(req.body.username,function(err,admins){
		if(err){
			res.json({
				error:err,
				result:"服务器出错！"
			})
			
		}else{

			if(admins.length==1){
				let admin=admins[0];
				if(!passwordHash.verify(req.body.password,admin.password) ){
					
					res.json({
						error:3,
						result:"帐号或者密码不正确"
					})
					return;
				}
				req.session.admin={
					id:admin.id,
					username:req.body.username,
					token:new Buffer(admin.id)

				}
				setTimeout(function(){
					res.json({
						error:0,
						result:"success",
						token:new Buffer(admin.id).toString("base64")//加密；
					})

				},4000)
				//new Buffer("base64string",'base64').toSting() //解密；
			}else{
				res.json({
					error:3,
					result:"不存在此人"
				})
			}
			
		}
	})
})
router.post("/test",function(req,res){
	res.send("333");
})
router.post("/create",function(req,res,next){
	// res.send(req.body);

	let username=req.body.username.trim();
	let password=req.body.password.trim();
	let repassword=req.body.repassword.trim();
	let email=req.body.email.trim();
	
	let tasks=[
		function(cb){
			if(validator.isEqual(password,repassword)){
				cb(null);
			}else{
				cb("密码与确认密码不一致");
			}
		},
		function(cb){
			if(validator.checkUserName(username)){
				cb(null);
			}else{
				cb("用户名格式不正确")
			}
		},
		function(cb){
			if(validator.checkPassword(password)){
				cb(null)
			}else{
				cb("密码格式不正确")
			}
		},
		function(cb){
			if(validator.checkEmail(email)){
				cb(null)
			}else{
				cb("邮箱格式不正确")
			}
		}
	];
	async.parallel(tasks,function(err,result){
		if(err){
			res.json({
				error:3,
				result:err
			})
		}
	})


	Admin.create({
		username:username,
		password:passwordHash.generate(password),
		email:email
	},(err,data)=>{
		if(err){
			res.json({
				error:1,
				result:err
			})
		}else{
			res.json({
				error:0,
				result:data
			})
		}
	});
})
router.post("/getAdmins",async function(req,res){
	let admins=await Admin.getAdmins();
	res.send(admins)
})
//管理员退出！
router.get("/quit",function(req,res){
	delete req.session.admin;
	res.redirect("/login");
	/*if(req.session.token!=req.qeury.token){
		res.send("token 不正确");
	}
	Admin.validateToken(req.query.token,function(err,data){		
		if(err){
			res.send("token出错了")
		}else{
			res.redirect("/login");
		}
	})*/
})

//修改保存；
router.post("/edit",function(req,res){
	var id=req.body.id;
	if(!id){
		res.json({
			error:1,
			result:"id不存在！"
		})
	}

	Admin.getAdminById(id,function(err,admin){
		if(err){
			return res.json({
				error:2,
				result:err
			})
		}else{
			if(admin.length>0 &&admin.length==1){
				return res.json({
					error:0,
					result:admin[0]
				})
			}else{
				return res.json({
					error:3,
					result:"不存在！"
				})
			}
			
		}
	})
	/*Admin.findOneAndUpdate({id:id},{$set:{}},function(err,data){
			if(err){
				return res.json({
						error:2,
						result:err
					})
			}else{
				return res.json({
					error:3,
					result:data
				})
			}
	})*/
})
router.post("/del",function(req,res){
	var id=req.body.id;
	if(!id){
		res.json({
			error:1,
			result:"id不存在！"
		})
	}
	Admin.findOneByIdAndRemove(id,function(err,admin){
		if(err){
			return res.json({
				error:3,
				result:err
			})
		}else{
			return res.json({
				error:0,
				result:admin
			})
		}
	})
})
export default router;