<template>
  <section class="admin-index">
      <nuxt-link tag="button" type="button" tooltip="添加用户" class="btn btn-sm btn-azure btn-addon" :to="{path:'/admin/add'}" >
        <i class="fa fa-plus"></i>Add</nuxt-link>
        <nuxt-link tag="button" type="button" tooltip="列表" class="btn btn-sm btn-azure btn-addon" :to="{path:'/admin'}" >
        <i class="fa fa-list-ul"></i>List</nuxt-link>
        
        <nuxt-child></nuxt-child>
  </div>

  </section>
</template>

<script>
import axios from '~/plugins/axios'

export default {
   components:{
   
  },
 /* async asyncData () {
    let { data } = await axios.get('/api/users')
    return { users: data }
  },*/
  
}
</script>

<style scoped>

</style>
