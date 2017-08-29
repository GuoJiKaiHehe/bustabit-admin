<template>
  <div class="loading-wrap" v-if="$store.state.isShowLoading" >
  	<img src="/loading-cylon-red.svg" width="100%" />
  </div>
</template>



<script type="text/javascript">

	export default {
		props:{
			
		},
		mounted(){
			console.log(this.$store)
		}
	}
</script>


<style scoped>
	.loading-wrap{
		width: 256px;
		height: 32px;
		position: fixed;
		top: 100px;
		z-index: 9999;
		left: 0;
		right: 0;
		margin: 0 auto;
	}

</style>