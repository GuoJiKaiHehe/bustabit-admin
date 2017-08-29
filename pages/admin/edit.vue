<template>
 <div class="row">
    <div class="col-lg-12 col-sm-12 col-xs-12">
        <div class="widget">
            <div class="widget-header bordered-bottom bordered-blue">
                <span class="widget-caption">编辑用户</span>
            </div>
            <div class="widget-body">
                <div id="horizontal-form">
                    <form class="form-horizontal" role="form" action="" method="post">
                        <div class="form-group">
                            <label for="username"  class="col-sm-2 control-label no-padding-right">用户名</label>
                            <div class="col-sm-6">
                                <input class="form-control" v-model="admin.username" id="username" placeholder="" name="username" required="" type="text">
                            </div>
                            <p class="help-block col-sm-4 red" v-html="adminError.username ||'* 必填'"></p>
                        </div>
                        <div class="form-group">
                            <label for="password"class="col-sm-2 control-label no-padding-right">密码</label>
                            <div class="col-sm-6">
                                <input class="form-control"  v-model="admin.password"  id="password" placeholder="" name="password" required="" type="password">
                            </div>
                            <p class="help-block col-sm-4 red" v-html="adminError.password ||'* 必填'"></p>
                        </div>
                        <div class="form-group">
                            <label for="repassword"class="col-sm-2 control-label no-padding-right">确认密码</label>
                            <div class="col-sm-6">
                                <input class="form-control"  v-model="admin.repassword"  id="repassword" placeholder="" name="repassword" required="" type="password">
                            </div>
                            <p class="help-block col-sm-4 red"  v-html="adminError.repassword ||'* 必填'"></p>
                        </div>
                        <div class="form-group">
                            <label for="email"  class="col-sm-2 control-label no-padding-right">邮箱</label>
                            <div class="col-sm-6">
                                <input class="form-control" v-model="admin.email" id="email" placeholder="" name="email" required="" type="text">
                            </div>
                            <p class="help-block col-sm-4 red"  v-html="adminError.email ||'* 必填'"></p>
                        </div>

                        <div class="form-group">
                            <label for="group_id" class="col-sm-2 control-label no-padding-right">管理角色</label>
                            <div class="col-sm-6">
                                <select name="group_id" style="width: 100%;">
                                                                        <option selected="selected" value="8">测试</option>
                                                                    </select>
                            </div>
                        </div>  
                        <div class="form-group">
                            <div class="col-sm-offset-2 col-sm-10">
                                <button type="button" @click.stop.prevent="handleCreateAdmin" class="btn btn-default">保存信息</button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
</div>
</template>

<script type="text/javascript">
import axios from 'axios'
import _ from 'lodash'
    export default {
        data(){
            let id=this.$route.query.id;
            return {
               id:id,
               admin:{
                    username:"",
                    password:"",
                    email:"",
                    repassword:""
                },
                adminError:{
                    username:'',
                    password:'',
                    repassword:"",
                    email:""

                }
            }
        },
        mounted(){
            axios({
                method:"post",
                url:"/api/admin/edit",
                data:{
                    id:this.id
                }
            }).then((res)=>{
                console.log(res);
                // this.admin
                if(res.data.error==0){
                    _.extend(this.admin,res.data.result);
                }else{
                    this.$store.showRemind({
                        icon:'error',
                        text:res.data.result
                    })
                }
                
            }).catch((err)=>{
                console.log(err);
            })
        }
    }
</script>
<style type="text/css">
	   
/* See license.txt for terms of usage */

/** reset styling **/

</style>