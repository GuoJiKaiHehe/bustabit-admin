module.exports={
	PORT:process.env.PORT || '3003' ,
	//数据库管理配置；
	DATABASE_USER:'jikai',
	DATABASE_PASS:'978352',
	DATABASE_IP:'103.76.85.214',
	DATABASE_NAME:'myblog',
	DATABASE_URL:'postgres://postgres:978352@103.76.85.214/bustabitdb',
	avatarPath:"/images/avatar/",
	ADMIN_STATIC_PATH:'/lib/admin/',//后台模版静态文件路劲；
	upAvatarPath:__dirname+'/../public/images/avatar',


	//redis
	RedisStore:{
		host:"103.76.85.214",
	    port:"6379",
	    pass:"guo978352",
	    prefix:"bustabit:"
	},
	PG_DATABASE:{
		  user: 'postgres',
		  host: '103.76.85.214',
		  database: 'bustabitdb',
		  password: '978352',
		  port: 5432,
		
	}
}