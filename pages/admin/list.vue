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
												<a href="/admin/user/edit/id/6.html" class="btn btn-primary btn-sm shiny">
													<i class="fa fa-edit"></i>编辑</a>
												<a href="#" onClick="warning('确实要删除吗', '/admin/user/del/id/6.html')" class="btn btn-danger btn-sm shiny">
													<i class="fa fa-trash-o"></i>删除</a>
											</td>
										</tr>
										
									</tbody>
								</table>
							</div>
							<div></div>
						</div>
					</div>
				</div>
			</div>
	</div>
</template>

<script type="text/javascript">
export default {
	name:"adminList",
	
	mounted(){

	}	
}
</script>

<style lang="less">
	
</style>