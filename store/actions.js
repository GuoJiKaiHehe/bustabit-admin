
export default{
	showRemind({commit,state},obj){
		
		commit("showRemind",obj)
		
	},
	nuxtServerInit ({commit},{req}){
		// console.log("nuxtSeverInit");
		if(req.session.admin){
			commit('setAdmin',req.session.admin)
		}
	}
}