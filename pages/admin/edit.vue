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
                            <p class="help-block col-sm-4 red" v-html="adminError.password "></p>
                        </div>
                        <div class="form-group">
                            <label for="repassword"class="col-sm-2 control-label no-padding-right">确认密码</label>
                            <div class="col-sm-6">
                                <input class="form-control"  v-model="admin.repassword"  id="repassword" placeholder="" name="repassword" required="" type="password">
                            </div>
                            <p class="help-block col-sm-4 red"  v-html="adminError.repassword "></p>
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
                                <button type="button" @click.stop.prevent="handleModify" class="btn btn-default">保存信息</button>
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
import {mapActions} from 'vuex'
import validator from '~/server/util/validator.js'
let succImg='<img src="/images/icons/succ.png" />';
let errImg='<img src="/images/icons/err.png" />';
    export default {
        data(){
            let id=this.$route.query.id;
            return {
               id:id,
               admin:{
                    id:id,
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
                  if(!valid  && !this.admin.password==''){
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
                  if(!valid && !this.admin.password==''){
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
            handleModify:function(){
                 if(!this.handleValidate()){
                    return false;
                }
                this.$store.state.isShowLoading=true;
                axios({
                    method:"post",
                    url:"/api/admin/save",
                    data:this.admin
                }).then((res)=>{
                    this.$store.state.isShowLoading=false;
                    if(res.data.error==0){
                    
                        this.showRemind({
                            icon:"success",
                            text:"修改成功"
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