<template>
  <div>
    <nuxt/>
    <loading></loading>
    
	<remind :remindData="$store.state.remindData">
		<p>成功！</p>
	</remind>
  </div>
</template>

<script>

import loading from '~/components/parts/loading'
import confirm from '~/components/parts/confirm'
import remind from '~/components/parts/remind'
export default {
  components: {
	loading,
	confirm,
	remind
  },
  mounted(){
  	console.log(this.$store.state.remindData);
  }
}
</script>

<style>

</style>
