import db from '../database'

import _ from 'lodash'
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
	let sql="SELECT id,password FROM  users WHERE username=$1";
	db.query(sql,[uname],function(err,ret){
		if(err){
			cb(err);
		}else{

			let admin=ret.rows;
			console.log(admin)
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
	let sql="SELECT id,username FROM users WHERE id=$1";
	db.query(sql,[id],function(err,ret){
		if(err){
			cb(err)
		}else{
			cb(null,ret)
		}
	})
}
export default Admin