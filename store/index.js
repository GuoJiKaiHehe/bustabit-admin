import Vue from 'vue'
import Vuex from 'vuex'
import mutations from './mutations'
import actions from './actions'
Vue.use(Vuex);

const state={
	isShowLoading:false,
	remindData:{
		isShow:false,
		icon:"success",
		text:1000
	},
	admin:null,
	a:null
};


const store = () => new Vuex.Store({
	state,
	mutations,
	actions
})

export default store

/** 调用；
  import  {mapMutations} from 'vuex'

  methods:{
	...mapMutations({
		toggle:todos/toggle or  toggle;

	})

  }

  ----
  nuxtServerInt 方法；

  actions:{
	nuxtServerInt({commit},{req}){
	 if(req.session.user){
	  commit('user',req.session.user);
	 }
	}
  }
  //nuxtServerInit 方法接收的上下文对象和 fetch 的一样，但不包括 context.redirect() 和 context.error()。
  
*/