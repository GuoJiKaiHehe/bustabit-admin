<template>
	<div class="login">
		 <div class="login-container animated fadeInDown">
	        <form action="" method="post">
	            <div class="loginbox bg-white">
	                <div class="loginbox-title">SIGN IN</div>
	                <div class="loginbox-textbox">
	                    <input  class="form-control" v-model="username" placeholder="username" name="username" type="text">
	                </div>
	                <div class="loginbox-textbox">
	                    <input class="form-control" v-model="password" placeholder="password" name="password" type="password">
	                </div>
	                <div class="loginbox-textbox captcha-textbox" style="display:flex;">
	                	<img src="/captcha" style="width:50%;height:50px;"  @click="_changeCode" alt="captcha" id="captcha" />
	                	<input type="text"  v-model="captchaCode" class="captchaCode form-control" name="captchaCode" >
	                </div>
	                <div class="loginbox-submit">
	                    <input class="btn btn-primary btn-block"  @click.prevent.stop="submitLogin"value="Login" type="button">
	                </div>
	            </div>
	                <div class="logobox">
	                    <p class="text-center">bustabit admin</p>
	                </div>
	        </form>
	        
	    </div>
	</div>
</template>

<script type="text/javascript">
import axios from 'axios';
import remind from '~/components/parts/remind'
import {mapActions} from 'vuex'
	export default{
		layout:"login",
		components:{
			remind
		},
		data(){
			return {

				username:"",
				password:'',
				captchaCode:''
			}
		},
		computed:{

		},
		methods:{
			...mapActions([
				'showRemind'
			]),
			_changeCode(e){
				var img=e.target;
				var src=$(img).attr("src");
				var randsrc='';
				if(src.indexOf('?rand=')==-1){
					randsrc+=src+'?rand='+Math.random();
				}else{
					randsrc=src.replace(/\?rand\=(.*)(&?)$/ig,'?rand='+Math.random());
				}
				// console.log(randsrc)
				$(img).attr('src',randsrc);
			},
			submitLogin(e){
				if(!/\w{6,20}/g.test(this.username.trim())){
					this.showRemind({
						icon:"error",
						text:"用户名必须是6，20位"
					})
					return;
				}
				if(!/\w{6,20}/g.test(this.password.trim())){
					this.showRemind({
						icon:"error",
						text:"密码必须是6，20位"
					})
					return;
				}
				if(!/\w{4}/g.test(this.captchaCode.trim())){
					this.showRemind({
						icon:"error",
						text:"验证码必须是4位"
					})
					return;
				}

				axios({
					method:"post",
					url:"/api/admin/login",
					data:{
						username:this.username,
						password:this.password,
						captchaCode:this.captchaCode
					}
				}).then((res)=>{
					console.log(res);
					if(res.data.error==0){
						// alert("333");
						this.showRemind({
							icon:"success",
							text:"success"
						})
						this.username='';
						this.password='';
						this.captchaCode='';
						setTimeout(()=>{
							this.$router.push({path:"/"});
							localStorage.adminToken=res.data.token
						},1000)
					}else{
						this.showRemind({
							icon:"error",
							text:res.data.result
						})
					}
				}).catch((err)=>{
					if(err){
						this.showRemind({
							icon:"error",
							text:"服务器出错"
						})
					}
				})

			}
		}
	}
</script>

<style lang="less">
	.captcha-textbox{
		display: flex;
		img{
			cursor: pointer;
			display: block;
			margin-right: 20px;
		}
		input{
			width:40%;
			float: right;
			color:#999;
		}
		*{
			display: block;
		}
	}
</style>