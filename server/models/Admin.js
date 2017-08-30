import db from '../database'
import passwordHash from 'password-hash'
import _ from 'lodash'
import async from 'async'
/*class Admin {
	constructor(props) {
		super(props);
		
	}
	getAdminByUserName(uname){
		let sql="SELECT id FROM  users WHERE id='${uname}'";
		db.query(sql,[uname],function(err,rows){

		})
	} 
}
*/
function Admin(admin){
	_.exntend(this,admin);

}

/**
  field :{key:value}
*/
Admin.getOne=function(field){
	// var where=Object.keys(field)+"='"+Object.values(field)+"'";
	// console.log('findone')
	return new Promise((resolve,reject)=>{
		var where='';
		var values=Object.values(field);
		for(var k in field){
			where+=k+"=$1,"
		}
		where=where.slice(0,-1);

		let sql="SELECT id FROM admin WHERE "+where +' LIMIT 1';
		
		db.query(sql,values,function(err,ret){
			if(err){
				return resolve({error:err.stack})
			}else{
				return resolve({error:null,result:ret.rows[0] ||''});
				
			}

		});	
	})
	
}

Admin.prototype={
	constructor:Admin,
	getAdminByUserName(uname,cb){

	},
	find(){

	},
	save(){

	}
}
Admin.getAdminByUserName=function(uname,cb){
	let sql="SELECT id,password FROM  admin WHERE username=$1";
	db.query(sql,[uname],function(err,ret){
		if(err){
			cb(err);
		}else{

			let admin=ret.rows;
			// console.log(admin)
			cb(null,admin)
		}
	})
}
Admin.validateToken=function(token,cb){
	var id=new Beffer(token,"base64").toString();

	this.getAdminById(id,function(err,data){
		if(err){
			cb(err)
		}else{
			cb(null,data)
		}
	})
}
Admin.getAdminById=function(id,cb){
	let sql="SELECT id,username,email FROM admin WHERE id=$1";
	db.query(sql,[id],function(err,ret){
		if(err){
			cb(err)
		}else{
			cb(null,ret.rows)
		}
	})
}
Admin.create=function(obj,cb){
	// Object.keys(obj).forEach((kItem)=>{
	// 	obj[kItem]
	// })
	// let sql="INSERT INTO id,username,password,email,create_at"

	
	(async ()=>{
		let admin=await Admin.getOne({username:obj.username});
		if(admin.error){
			return cb(admin.error)
		}
		if(admin.result){
			return cb('帐号已经存在了');
		}
		// console.log(admin);
		let keys=Object.keys(obj);
		let keysString=keys.join(",");
		let values=Object.values(obj);
		let client=await db.pool.connect();
		// console.log(keysString,values)
		try{
			await client.query("BEGIN");
			let sql='INSERT INTO admin('+keysString+') VALUES ($1,$2,$3)';
			// console.log(sql);
			const {rows}=await client.query(sql,values);
			await client.query("COMMIT");
			cb(null,rows);
		}catch(e){
			client.query("ROLLBACK");
			throw e
			// console.log(e);
			cb(e.stack)
		}finally{
			// console.log('client:'+client)
			 client.release();
		}
	})().catch((e)=>{
		if(e.code=='23505'){
			return cb("字段出现重复")
		}
		cb(e.stack)
			
		})
}
Admin.getAdmins=function(fields,w,options){
	/* 多条件查询
		select * from admin 
		where 
			(id='41' AND username LIKE 'te%') 
		OR  
			(email='970228812@qq.ccom') 
		OR 
			(username = 'guojikai');
	*/
	return new Promise((resolve,reject)=>{
		var where='';
		var limit=10;
		var orderBy='ORDER BY create_at DESC';
		var selectFields='*';
		var values=[];
		var offsetString="";
		var or={};
		var and={};
		var like={};
		if(JSON.stringify(w)!="{}"){	
			 where="WHERE "+w.text;
			 values=w.values;
		}
		if(fields.length){
			selectFields=fields.join(",");
		}
		if(options){
			if(options.limit){
				limit=options.limit;
			}
			if(options.offset){
				offsetString='OFFSET '+options.offset;
			}
		}

		var limitString="LIMIT "+limit;

		let sql="SELECT "+selectFields+" FROM admin "+where +' '+orderBy+' '+limitString +' '+offsetString;
		console.log(sql,values);
		db.query(sql,values,function(err,ret){
			if(err){
				return resolve({error:err.stack})
			}else{
				let sqlCount="SELECT COUNT(id) as count FROM admin "+where;
				db.query(sqlCount,values,function(err,retCount){
					if(err){
						return resolve({error:err.stack})
					}else{
						return resolve({
							error:null,
							data:{
								admins:ret.rows,
								total:retCount.rows[0].count
							}
						});
					}
				})

			}

		});	
	})
}

Admin.findOneByIdAndUpdate=function(id,setW,cb){
	var _this=this;
	var finded=null;
// console.log(setW);
	let set="";
	let values=[];
	let tasks=[
		function(cb){

			_this.getAdminById(id,function(err,admin){
				if(err){
					return cb(err)
				}else{
					return cb(null,admin)
				}
			})
		},
		function(cb){
			
			values=Object.values(setW);
			Object.keys(setW).forEach((key,i)=>{
				set+=key+"=$"+(i+1)+","
			})
			
			set=set.slice(0,-1);
			console.log("set+"+set)
			let sql="UPDATE admin  SET "+set +"  WHERE id=$"+ (parseInt(Object.keys(setW).length)+1);
			console.log(sql);
			values.push(id);
			db.query(sql,values,function(err,ret){
				if(err){
					return cb(err);
				}else{
					return cb(null,ret);
				}
			})
		}
	];
	async.series(tasks,function(err,ret){
		if(err){
			return cb(err);
		}else{
			if(ret[0].length>0){
				//找到了；
				finded=ret[0];
				return cb(null,finded);
			}else{
				return cb('没有找到此人')
			}
		}
	})
	
}
Admin.findOneByIdAndRemove=function(id,cb){
	var _this=this;
	let finded=null;
	let tasks=[
		function(cb){
			_this.getAdminById(id,function(err,admin){
					if(err){
						return cb(err)
					}
					return cb(null,admin[0]);
			})
		},
		function(cb){
			let sql="DELETE FROM admin WHERE id=$1";
			db.query(sql,[id],function(err,data){
				if(err){
					return cb(err)
				}
				return cb(null,data)
			})
		}
	];	

	async.series(tasks,function(err,ret){
		if(err){
			return cb(err)	
		}else{
			if(ret.length==0){
				cb('不存在此人')
			}else{
				finded=ret[0];
				// console.log(finded)
				return cb(null,finded);	
			}
		}
	})	
}

export default Admin