<template>
  <section class="admin-index">
      <div class="search-wrap" v-if="isShowSearchBar">
          <search-bar @search="search"></search-bar>
      </div>
      <nuxt-link tag="button" type="button" tooltip="添加用户" class="btn btn-sm btn-azure btn-addon" :to="{path:'/admin/add'}" >
        <i class="fa fa-plus"></i>Add</nuxt-link>
        <nuxt-link tag="button" type="button" tooltip="列表" class="btn btn-sm btn-azure btn-addon" :to="{path:'/admin'}" >
        <i class="fa fa-list-ul"></i>List</nuxt-link>
         <button  type="button" style="float:right;"  tooltip="刷新" @click="handleRefesh" class="btn btn-sm btn-azure btn-addon" :to="{path:'/admin'}" >
        <i class="fa fa-refresh"></i>刷新</button>
        <keey-alive>
          <nuxt-child :admins="admins" :pageData="pageData"  @clickPage="getAdmins" ></nuxt-child>
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
    let data = await axios.post("/api/admin/getAdmins");
     console.log(data.data);
    return {
      admins:data.data.result.admins,
      total:data.data.result.total
      
    };
  },
  data(){
   
    let total=10;
    return {
      keyword:'',
      pageData:{
          page:1, //默认是1；
          limit:10,
          total:0
      }
    }
  },
  mounted(){
    // console.log('mounted');
    // console.log(this.total);
    this.pageData.total=this.total;
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
      this.keyword=keyword;
      localStorage.searchQ=this.keyword;
      this.getAdmins((err,result)=>{
        if(err){
          this.admins=[];
        }else{
          this.admins=result.admins;
          this.pageData.total=result.total;
        }
      })
    },
    getAdmins(options,cb){
      console.log(options);
      if(options.page){
        this.page=options.page;
      }
      // return;
      if(typeof options =='function'){
        cb=options;
        options={};
      }
       axios({
          method:"post",
          url:"/api/admin/getAdmins",
          data:{
            keyword:localStorage.searchQ,
            page:this.page
          }
      
      }).then((res)=>{
        // console.log(res)
        cb(null,res.data.result);
        // this.admins=admins
      }).catch((err)=>{
        cb(err);
        alert(err);
      });
    },
    handleRefesh(e){
      console.log(this.$route);
      this.$router.go(0);
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
