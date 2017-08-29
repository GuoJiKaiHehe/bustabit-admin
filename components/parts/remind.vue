<template>
	<div class="remind" v-if="remindData.isShow"  @click="hideRemind">
		<transition name="fade" mode="out-in">
			<div class="mask"  :style="{backgroundColor:maskColor}"></div>		
		</transition>
		<div class="remind-container">
			<div class="text">
			<span class="icon" :class="iconClass" ></span>
				<span v-html="remindData.text"></span>
			</div>
		</div>
	</div>
</template>

<script>
	export default{
		props:{
			remindData:{
				type:Object,
				default:function(){
					return {
						icon:"success",
						text:"success",
						time:50000,
						isShow:true
					}
				}
			},
			maskColor:{
				type:String,
				default:"rgba(0,0,0,0.3)"
			}
		},
		data(){
			return {
				iconClass:[],
				isShowRemind:true
			}
		},
		mounted(){
			if(this.remindData.icon==""){
				this.iconClass.push("success")
			}else{
				this.iconClass.push(this.remindData.icon)
			}
		
		},
		methods:{
			hideRemind(){
				this.remindData.isShow=false
			}
		}
	}
</script>
<style lang="less"  scoped>
.fade-enter-active, .fade-leave-active {
  transition: all .5s
}
.fade-enter, .fade-leave-active {
  opacity: 0
}
	.mask{
		position: fixed;
		top:0;
		left:0;
		right:0;
		bottom:0;
		z-index: 999;
		transition:all 0.5s;
	}
	.remind{
		transition:all 0.5s;
		.remind-container{
			z-index: 1000;
			box-sizing: border-box;
			position:absolute;
			min-width: 200px;
			max-width:300px;
			top:30%;
			margin:0;
			right:0;
			left:0;
			margin:auto;
			padding:20px;
			background: #fff;
			border-radius: 7px;
			box-shadow: 0 0 0 10px rgba(0,0,0,0.1),0 0 0 10px rgba(255,255,255,0.1);
			text-align: left;
			text-overflow:ellipsis;
			overflow: hidden;
			white-space: nowrap;
			*{
				display: inline-block;

			}
			.icon{
				vertical-align: middle;
				margin-right: 10px;
				&.success{
					&:after{
						content: " ";
						display: block;
						width:32px;
						height:32px;
						background-image:url("~assets/images/icons/success.png");
						background-repeat: no-repeat;
						background-size:32px 32px;
					}
				}
				&.error{
					&:after{
						content: " ";
						display: block;
						width:32px;
						height:32px;
						background-image:url("~assets/images/icons/error.png");
						background-repeat: no-repeat;
						background-size:32px 32px;
					}
				}
			}
			.text{
				
				font-size: 17px;
				font-weight: bold;
				line-height: 2;
			}
		}
	}
</style>
