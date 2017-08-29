<template>
 <div class="row">
    <div class="col-lg-12 col-sm-12 col-xs-12">
        <div class="widget">
            <div class="widget-header bordered-bottom bordered-blue">
                <span class="widget-caption">新增用户</span>
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
import {mapActions} from 'vuex'
import validator from '~/server/util/validator.js'
let succImg='<img src="/images/icons/succ.png" />';
let errImg='<img src="/images/icons/err.png" />';

    export default {
        name:"adminAdd",
        components:{

        },
        data(){
            return {
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

        },
        watch:{
            'admin.username':function(newVal,old){
                var valid = validator.checkUserName(this.admin.username);
                 if(!valid){
                    this.adminError.username='用户名格式不正确';
                    return false;
                 }else{
                    this.adminError.username=succImg;
                 }
            },
            'admin.password':function(newVal,old){

                let valid=validator.checkPassword(this.admin.password)
                  if(!valid){
                    this.adminError.password='密码格式不正确';
                    return false;
                 }else{
                    this.adminError.password=succImg;
                 }
             },
             'admin.repassword':function(){
                let valid=validator.isEqual(this.admin.password,this.admin.repassword)
                if(!valid){
                     this.adminError.repassword='密码不一致';
                    return false;
                }else{
                    this.adminError.repassword=succImg;
                }
            },
            'admin.email':function(){
               let valid=validator.checkEmail(this.admin.email)
                 if(!valid){
                    this.adminError.email='密码格式不正确';
                    return false;
                 }else{
                    this.adminError.email=succImg;
                 }
            }
        },
        methods:{
            ...mapActions([
                'showRemind'
            ]),
             handleValidate(){
               var valid = validator.checkUserName(this.admin.username);
                 if(!valid){
                    this.adminError.username='用户名格式不正确';
                    return false;
                 }else{
                    this.adminError.username=succImg;
                 }
               valid=validator.checkPassword(this.admin.password)
                  if(!valid){
                    this.adminError.password='密码格式不正确';
                    return false;
                 }else{
                    this.adminError.password=succImg;
                 }

                valid=validator.isEqual(this.admin.password,this.admin.repassword)
                if(!valid){
                     this.adminError.repassword='密码不一致';
                    return false;
                }else{
                    this.adminError.repassword=succImg;
                }
                valid=validator.checkEmail(this.admin.email)
                 if(!valid){
                    this.adminError.email='密码格式不正确';
                    return false;
                 }else{
                    this.adminError.email=succImg;
                 }
                 return true;
            },
            handleCreateAdmin(){
                if(!this.handleValidate()){
                    return false;
                }
                this.$store.state.isShowLoading=true;
                axios({
                    method:"post",
                    url:"/api/admin/create",
                    data:this.admin
                }).then((res)=>{
                    this.$store.state.isShowLoading=false;
                    if(res.data.error==0){
                    
                        this.showRemind({
                            icon:"success",
                            text:"添加成功"
                        })
                    }else{
                        // alert("33");
                       this.showRemind({
                            icon:"error",
                            text:res.data.result
                        }) 
                    }
                }).catch((e)=>{
                    this.$store.state.isShowLoading=false;
                    this.showRemind({
                            icon:"error",
                            text:e.message
                        }) 
                })
            }
        },
        computed:{

        }
    }
</script>

<style lang="less">
    
</style>