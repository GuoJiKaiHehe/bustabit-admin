import * as axios from 'axios'

let options = {}
// The server-side needs a full url to works
if (process.server) {
  options.baseURL = `http://${process.env.HOST || 'localhost'}:${process.env.PORT || 3000}`
}

 export default axios.create(options)


/*export default ({app,store,redirect})=>{
	axios.interceptors.request.use(config => {

     	// store. 
     	store.state.isShowLoading=true;
    
    return config;
  }, err => {
   	store.commit("showRemind",{icon:'error',text:"出错了"})
  });
}*/