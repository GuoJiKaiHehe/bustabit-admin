import util from 'util'

function Validator(){

}
Validator.checkUserName=function(username){
	if(/^\w{6,20}$/g.test(username)){
		return true;
	}else{
		return false;
	}
}
Validator.checkPassword=function(password){
	if(/^\w{6,20}$/g.test(password)){
		return true;
	}else{
		return false;
	}
}
Validator.checkEmail=function(str){
	let reg = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/; 
	return reg.test(str); 
}
Validator.checkPhone=function(phone){
	let reg= /^(13[0-9]{9})|(15[89][0-9]{8})$/;
	return reg.test(phone)
}
Validator.isEqual=function(str1,str2){

	if(str1.trim()==str2.trim()){
		return true;
	}else{
		return false;
	}
}
Validator.isNumber=function(str){
    return /\d/.test(str);
}   
Validator.IsChinese=function(str){
	let reg=/^[\u0391-\uFFE5]+$/;;
	return reg.test(str);
}
Validator.isZIP=function(str){
	let reg=/^\d{6}$/; 
	return reg.test(str)
}
Validator.isUUIDv4 = function(uuid) {
    return (typeof uuid === 'string') && uuid.match(/^[0-9A-F]{8}-[0-9A-F]{4}-4[0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i);
};

//验证日期格式2009-07-13
	//patterms.date = /^\d{4}-(0?[1-9]|1[0-2])-(0?[1-9]|[1-2]\d|3[0-1])$/;
//验证时间格式16:55:39
	//patterms.time = new RegExp("^([0-1]\\d|2[0-3]):[0-5]\\d:[0-5]\\d$");
//验证IP
	///patterms.ip = /^(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])(\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])){3}$/;
	
export default Validator;