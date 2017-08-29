<template>
  <section class="admin-index">
      <div class="search-wrap" v-if="isShowSearchBar">
          <search-bar @search="search"></search-bar>
      </div>
      <nuxt-link tag="button" type="button" tooltip="添加用户" class="btn btn-sm btn-azure btn-addon" :to="{path:'/admin/add'}" >
        <i class="fa fa-plus"></i>Add</nuxt-link>
        <nuxt-link tag="button" type="button" tooltip="列表" class="btn btn-sm btn-azure btn-addon" :to="{path:'/admin'}" >
        <i class="fa fa-list-ul"></i>List</nuxt-link>
        <keey-alive>
          <nuxt-child :admins="admins"></nuxt-child>
        </keey-alive>
       
  </div>

  </section>
</template>

<script>
import axios from '~/plugins/axios'
import searchBar from '~/components/parts/searchBar'

export default {
   components:{
   searchBar,
   
  },
  async asyncData(){
    let admins = await axios.post("/api/admin/getAdmins");
    console.log(admins.data);
    return {
      admins:admins.data.result||[]
    };
  },
  data(){

  },
  mounted(){
    console.log('mounted');
    // 
    // console.log(this.$route.path)
  },
  computed:{
    isShowSearchBar(){
      if(this.$route.path.match(/\//g).length<2){
        return true;
      }else{
        return false;
      }
    }
  },
  methods:{
    search(e,keyword){

    }
  }
  
 /* async asyncData () {
    let { data } = await axios.get('/api/users')
    return { users: data }
  },*/
  
}
</script>

<style lang="less" scoped>

  .search-wrap{
    position:relative;
    margin:10px 0;
    width: 100%;
    text-align: center;
    &:after{
      clear:both;
      content:" ";
      display: block;

    }
    
  }

</style>
