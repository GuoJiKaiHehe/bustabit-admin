import pg,{ Pool, Client } from 'pg'
import uuid from  'uuid'
import async from 'async'
import config from '../config' 

if (!config.DATABASE_URL)
    throw new Error('must set DATABASE_URL environment var');

pg.defaults.poolSize = 20;
pg.defaults.poolIdleTimeout = 120000;

pg.types.setTypeParser(20, function(val) { // parse int8 as an integer
    return val === null ? null : parseInt(val);
});

pg.types.setTypeParser(1700, function(val) { // parse numeric as a float
    return val === null ? null : parseFloat(val);
});

/*function connect(cb){
	return pg.connect(connect.DATABASE_URL,cb);
}*/
const pool = new Pool({
  connectionString: config.DATABASE_URL,
})


export default {
	pool,
	// query:(text, params) => pool.query(text, params),
	//await db.query('SELECT * FROM users WHERE id = $1', [id])
	query(sql,params,cb){
		if(typeof params =='function'){
			cb=params;
			params=[];
		}
		pool.connect()
		  .then(client => {
		    return client.query(sql, params)
		      .then(res => {
		        client.release()
		        
		        cb(null,res);
		      })
		      .catch(e => {
		        client.release()
		        console.log(e.stack)
		        cb(e);
		      })
		  })
	},
	getClient(cb){
		pool.connect((err,client,done)=>{
			cb(err,client,done)
		})
	}
}

/*function query(sql,params,cb){

  const client = await pool.connect()

  try {
    await client.query('BEGIN')
    
    await client.query(sql, params)
    await client.query('COMMIT')
    cb()
  } catch (e) {
    await client.query('ROLLBACK')
    throw e
  } finally {
    client.release()
  }

}*/


/*
function query(sql,params,cb){
	if(typeof params =='function'){
		cb=params;
		params=[];
	}
	doIt();
	function  doIt(){
		connect(function(err,client,done){
			if(err) return cb(err);
			client.query(sql,params,function(err,result){
				done();
				if(err){
					if (err.code === '40P01') {
                        console.log('Warning: Retrying deadlocked transaction: ', query, params);
                        return doIt();
                    }
                    return cb(err);
				}
				cb(null,result);
			});

		})
	}
}
*/