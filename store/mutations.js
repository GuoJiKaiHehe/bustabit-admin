
export default{
	showRemind(state,obj){
		obj.isShow=true;
		state.remindData=obj;
		setTimeout(()=>{
			// alert("3");
			if(obj.isShow){
				obj.isShow=false
			}
		},obj.time||2000)
	},
	setAdmin(state,admin){
		state.admin=admin;
	},
	seta(state,data){
		state.a=data;
		console.log("3333333");
	}
}