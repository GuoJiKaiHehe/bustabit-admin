<template>
	<div class="btn" :class="types" @click="handleClick">
		<slot></slot>
	</div>
</template>

<script type="text/javascript">
export default {
	props:{
		type:String,
		default:"default"
	},
	data(){
		return {
			types:[]
		}
	},
	mounted(){
		if(this.type==""){
			this.types.push('btn-default');
		}else{
			this.types.push('btn-'+this.type);
		}
		
	},
	methods:{
		handleClick(e){
			this.$emit("click",e)
		}
	}
}
</script>

<style  lang="less" scoped>
	.btn{
		display: inline-block;
		padding:6px 12px;
		margin-bottom: 0;
		font-weight: 400;
		line-height: 1.4;
		text-align: center;
		vertical-align: middle;
		cursor: pointer;
		border-radius: 5px;
		border:1px solid transparent;
		&.btn-default{
		    color: #333;
		    background-color: #fff;
		    border-color: #ccc;
		    &:active,&:hover{
		    	color: #333;
			    background-color: #e6e6e6;
			    border-color: #adadad
		    }
		    
		}
		&.btn-primary{
			background-color:#2f74af;
			border-color: #2e6da4;
			color:#fff;
			&:hover,&:active{
				background-color: #2e699c;
				border-color:#2e6da1
			}
			
		}
		&.btn-success{
		    color: #fff;
		    background-color: #5cb85c;
		    border-color: #4cae4c;
		    &:active,&:hover{
			    color: #fff;
			    background-color: #449d44;
			    border-color: #398439;
		    }
		    
		}
		&.btn-info{
			color: #fff;
		    background-color: #5bc0de;
		    border-color: #46b8da;
		    &:active,&:hover{
		    	color: #fff;
			    background-color: #31b0d5;
			    border-color: #269abc;
		    }
		}
		&.btn-warn{
		    color: #fff;
		    background-color: #f0ad4e;
		    border-color: #eea236;
		    &:active,&:hover{
		    	background-color: #ec971f;
   				 border-color: #d58512;
		    }
		}
		&.btn-danger{
			color: #fff;
			background-color: #d9534f;
			border-color: #d43f3a;
			&:active,&:hover{
				background-color: #c9302c;
	    		border-color: #ac2925;
			}
		}
	}

</style>

