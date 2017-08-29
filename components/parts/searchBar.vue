<template>
	<div class="col-sm-4 search-box">
      <div>
          <span class="input-icon">
              <input type="text" ref="searchText" v-model="keyword" class="form-control" id="fontawsome-search" placeholder="Search">
              <i class="glyphicon glyphicon-search circular blue" @click="handleSearch"></i>
          </span>
      </div>
  </div>
</template>
<script type="text/javascript">
import MouseTrap from 'mousetrap'
	export default {
		props:{

		},
		data(){
			return {
				keyword:''
			}
		},
		methods:{
			handleSearch(e){
				this.$emit("search",e,this.keyword);
			}
		},
		mounted(){
			MouseTrap(this.$refs['searchText']).bind("enter",(e)=>{
				this.$emit("search",e,this.keyword);
			})
		},
		computed:{

		}
	}
</script>
<style lang="less" scoped >
	.search-box{
     	display: inline;
     	float:none;
    }
</style>