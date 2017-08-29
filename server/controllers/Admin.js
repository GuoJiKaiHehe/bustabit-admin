import express  from  'express'
import Admin from '../models/Admin'
import passwordHash from 'password-hash'
import uuid  from 'uuid'
const router=express.Router();

router.post("/login",function(req,res){
	if(req.session.captchaToken!=req.body.captchaCode.trim()){
		return res.json({
				error:1,
				result:"验证码不正确"
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
				console.log("33333");
				req.session.admin={
					id:admin.id,
					username:req.body.username,
					token:new Buffer(admin.id)

				}
				res.json({
					error:0,
					result:"success",
					token:new Buffer(admin.id).toString("base64")//加密；
				})
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
export default router;