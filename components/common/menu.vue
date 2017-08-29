<template>
	<div class="page-sidebar" id="sidebar">
	<!-- Page Sidebar Header-->
	<div class="sidebar-header-wrapper">
		<input class="searchinput" type="text">
		<i class="searchicon fa fa-search"></i>
		<div class="searchhelper">Search Reports, Charts, Emails or Notifications</div>
	</div>
	<!-- /Page Sidebar Header -->
	<!-- Sidebar Menu -->
	<ul class="nav sidebar-menu">
		<!--Dashboard-->
		<li v-for="menu in menus" @click="handleSlide">
			<a href="#" class="menu-dropdown">
				<i :class="menu.iconClass"></i>
				<span class="menu-text">{{menu.text}}</span>
				<i class="menu-expand"></i>
			</a>
			<ul class="submenu" v-if="menu.children"  >
				<li v-for="submenu in menu.children">
					<nuxt-link :to="{path:submenu.path}">
						<span class="menu-text">
							{{submenu.text}}                                    </span>
						<i class="menu-expand"></i>
					</nuxt-link>
				</li>
				
			</ul>                            
		</li> 

		                       
		
	</ul>
	<!-- /Sidebar Menu -->
</div>
</template>

<script type="text/javascript">
	export default{
		data(){
			return {
				menus:[{
							text:"管理员",
							iconClass:"menu-icon fa fa-user",
							children:[
								{text:"管理员列表",path:"/admin"},
								{text:"管理角色",path:"/admin"},
								{text:"管理权限",path:"/admin"}
							]
						},
						{
							text:"文档",
							iconClass:"menu-icon fa fa-file-text",
							children:[
								{text:"文章列表",path:"/article"},
							]
						},{
							text:"系统",
							iconClass:"menu-icon fa fa-gear",
							children:[
								{text:"基本配置",path:'setting'}
							]
						}]
				
				}
		},
		methods:{
			handleSlide(e){
				$(e.target)
			}
		},
		mounted(){
			
		}
	}
</script>

<style type="text/css">
	
</style>