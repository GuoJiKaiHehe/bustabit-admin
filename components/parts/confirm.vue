<template>
	<div class="k-confirm" :style="dialogWrapStyle" v-if="confirmData.isShow" >
		<div class="mask"  :style="{backgroundColor:maskColor}"></div>
		<div class="k-confirm-container">
			<div class="ktitle">
				<div class="title-text" v-html="confirmData.title"></div>
				<a 	@click="handleClose" href="javascript:;" class="btn-close">
					X
				</a>
			</div>
			<div class="kbody" v-html="confirmData.text" >
			</div>
			<div class="kfooter button-group">
				<div class="btn-wrap">
					<kbutton type="primary" @click="handleSure">{{btnText}}</kbutton>
				</div>
				<div class="btn-wrap">
					<kbutton type="warn" @click="handleClose">{{btnCancel}}</kbutton>
				</div>
			</div>
		</div>
	</div>
</template>

<script type="text/javascript">
import kbutton from '~/components/parts/kbutton'

	export default{
		name:"k-dialog",
		components:{
			kbutton
		},
		props:{
			confirmData:{
				type:Object
			},
			maskColor:{
				type:String,
				default:"rgba(0,0,0,0.3)"
			},
			dialogWrapStyle:{
				type:Object,
				default:function(){
					return new Object;
				}
			},
			btnText:{
				type:String,
				default:"确定"
			},
			btnCancel:{
				type:String,
				default:"取消"
			}

		},
		methods:{
			handleClose(e){
				this.confirmData.isShow=false;
			},
			handleSure(e){
				// alert("333");
				// this.emit("sure",e)
				this.confirmData.todoFn && this.confirmData.todoFn();
				this.handleClose();
			}
		}

	}
</script>


<style lang="less" scoped>
	.k-confirm{
	
		.mask{
			position: fixed;
			top:0;
			left:0;
			right:0;
			bottom:0;
			z-index: 999;
			transition:all 0.5s;
		}
		.k-confirm-container{
			z-index: 1000;
			box-sizing: border-box;
			position:absolute;
			width:300px;
			
			top:30%;
			margin:0;
			right:0;
			
			left:0;
			margin:auto;
			padding:20px;
			background: #fff;
			border-radius: 7px;
			box-shadow: 0 0 0 10px rgba(0,0,0,0.1),0 0 0 10px rgba(255,255,255,0.1);
		}
		.ktitle{
			height:45px;
			line-height: 1;
			text-align: center;
			position: relative;
			font-size: 24px;
			font-weight: 700px;
			border-bottom: 1px solid #ccc;
			*{
				display:inline-block;
			}
			.btn-close{
				position:absolute;
				right:3px;
				top:0px;
				font-size:30px;
				color:#000;
				cursor: pointer;
				text-decoration: none;
			}
		}
		.kbody{
			padding:6px;
			font-size:15px;
			min-height: 150px;
			text-indent: 2em;
		}
		.button-group{
			position: absolute;
			bottom:20px;
			width:100%;
			left:0;
			padding-top:10px;
			border-top:1px solid #ccc;
			margin:0 auto;
			justify-content:space-around;
			display: flex;
			.btn-wrap{
				flex:1;
				text-align: center;
			}
		}

	}
</style>