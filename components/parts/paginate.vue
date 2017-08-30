<template>
	 <ul class="pagination" data-v-31e31b85="">
		<!--  <li class="prev disabled" data-v-31e31b85="">
		<a href="#" data-v-31e31b85="">Prev</a>
		</li> -->
		 <li :class="page.type" data-v-31e31b85="" v-for="page in PageArr" @click="handlePage($event,page.text)">
		 	<a href="javascript:;" data-v-31e31b85="">{{page.text}}</a>
		 </li>
		 
		 <!-- <li class="next" data-v-31e31b85=""><a href="#" data-v-31e31b85="">Next</a>
		 </li> -->
	 </ul>
</template>

<script type="text/javascript">
/** 
props:{
 total:this.totalData,
maxShowNumber:5,
limit:10 //每页显示10条；
}
*/
	export default {
		props:{
			pageData:{
				type:Object,
				default:function(){
					return new Object
				}
			}	
		},
		data(){
			return {
				 
			}
		},
		computed:{
			totalPage(){
				return Math.ceil(this.pageData.total/this.pageData.limit);
			},
			PageArr(){
				var arr=[];
				for(var i=1;i<=this.totalPage;i++){
					// console.log(this.totalPage.page)
					if(i==this.pageData.page){
						arr.push({text:(i),type:"active"});
					}else{
						arr.push({text:(i),type:""});
					}
				}
				arr=arr.slice(0,4);
				arr.unshift({text:"Prev",type:"disabled"})
				arr.push({text:"Next",type:""})
				return arr;	
			},
			prev(){

			},
			next(){

			}
		},
		mounted(){
		 console.log(this.totalPage)
		},
		methods:{
			handlePage(e,page){
				if(page==this.pageData.page){
					return;
				}
				if(page=="Prev"){
					page=this.pageData.page-1;
				}
				if(page=="Next"){
					page=this.pageData.page+1;
				}
				this.$emit("click",e,page);
			}
		}
	}
</script>
<style type="text/css">
	
</style>