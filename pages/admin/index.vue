<template>
	<div class="admin-list">
	<div class="row">
        <div class="col-lg-12 col-sm-12 col-xs-12">
          <div class="widget">
            <div class="widget-body">
              <div class="flip-scroll">
                <table class="table table-bordered table-hover">
                  <thead class="">
                    <tr>
                      <th class="text-center">ID</th>
                      <th class="text-center">名称</th>
                      <th class="text-center">邮箱</th>
                      <th class="text-center">创建时间</th>
                      <th class="text-center">操作</th></tr>
                  </thead>
                  <tbody>
                    <tr v-for="(item,k) in admins">
                      <td align="center">{{k}}</td>
                      <td align="center">{{item.username}}</td>
                      <td align="center">{{item.email}}</td>
                      <td align="center">{{item.create_at}}</td>
                      <td align="center">
                        <a href="javascript:;" @click.prevent.stop="handleEdit($event,item.id)" class="btn btn-primary btn-sm shiny">
                          <i class="fa fa-edit"></i>编辑</a>
                        <a href="javascript:;"  @click.prevent.stop="handleDel($event,item.id)"   class="btn btn-danger btn-sm shiny">
                          <i class="fa fa-trash-o"></i>删除</a>
                      </td>
                    </tr>
                    
                  </tbody>
                </table>
               
              </div>
              <div>
              </div>
               <div class="paginate-wrap">
                  <paginate :pageData="pageData" @click="handlePageSize" ></paginate>
             </div>

            </div>

          </div>
        </div>
      </div>
	</div>
</template>

<script type="text/javascript">
  import paginate from '~/components/parts/paginate'
  import searchBar from '~/components/parts/searchBar'
  import axios from 'axios'
  import {mapActions} from 'vuex'
  export default{
    components:{
      paginate,
      searchBar,
    },
    props:{
      admins:{
        type:Array,
        default:function(){
          return []
        }
      },
      pageData:{
        type:Object
      }
    },
    data(){
      return {
        
      }
    },
    mounted(){
      this.totalData
    },
    computed:{
     
    },
    methods:{
      ...mapActions([
          'showRemind',
          'showConfirm'
        ]),
      handlePageSize(e,page){
        //点击的是第几页；
        var options={};
        options.page=page;
   
        this.$emit("clickPage",options,(err,ret)=>{
            //在这设置admins；
            // this.admins=[];
              this.pageData.page=page;
              this.admins.splice(0,this.admins.length);
              ret.admins.forEach((item)=>{
                this.admins.push(item);
              })
            // this.admin
            /*if(err){
               this.admins=[];
            }else{
              this.admins=[];
              // this.admins=ret.admins;
              this.pageData.page=page;
              // this.pageData.total=ret.total; 
            }*/
        });
      },
      handleEdit(e,id){
        console.log(id);
        this.$router.push({path:"/admin/edit",query:{id:id}})
      },
      handleDel(e,id){
        var _this=this;
        _this.showConfirm({
          text:"你确定要删除么？",
          title:"删除管理员",
          todoFn(){
          axios({
            method:"post",
            url:"/api/admin/del",
            data:{
              id:id
            }
          }).then((res)=>{
            // console.log(res);
              if(res.data.error==0){
                _this.showRemind({icon:'success',text:"管理员"+res.data.result.username +"已被删除"});
                
                for(var i=0;i<_this.admins.length;i++){
                  if(_this.admins[i].id==id){
                    _this.admins.splice(i,1);
                    break;
                  }
                }
              }else{
                _this.showRemind({icon:"error",text:res.data.result})
              }
          }).catch((err)=>{
            console.log(err);
            // alert("3333");
              _this.showRemind({icon:"error",text:err});
          })
            }
          })
        
      }
    }
  }
</script>
<style lang="less">
  .paginate-wrap{
    margin-top:10px;
  text-align: center;
}
</style>