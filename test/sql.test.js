const pg =require("pg")
const config=require("../server/config")
const pool = new pg.Pool({
  connectionString: config.DATABASE_URL,
})
var query=pool.connect();

// let sql="SELECT count(*) as count from admin";
// query.then(function(client){
// 	client.query(sql,[],function(err,ret){
// 		console.log(err,ret.rows[0].count);
// 		client.release();
// 	})	
// })

let sql="SELECT * FROM admin WHERE  username LIKE  $1 ORDER BY create_at DESC LIMIT 10";
query.then((client)=>{
	client.query(sql,['%t%'],function(err,ret){
		console.log(err,ret.rows)
	})
})