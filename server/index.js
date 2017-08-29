import express from 'express'
import { Nuxt, Builder } from 'nuxt'

import captcha from 'trek-captcha'
import session from 'express-session'
import logger from 'morgan'
import RedisStore from  'connect-redis'
import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'
import uuid from 'uuid'

const app = express()
const host = process.env.HOST || '127.0.0.1'
const port = process.env.PORT || 3000
const Store=RedisStore(session);
const mconfig=require("./config");
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}))
app.use(cookieParser('guojikai'));
app.use(session({
	secret:'guojikai',
	cookie:{maxAge:60*1000*60*24},
	resave:true,
	store:new Store(mconfig.RedisStore)
}))
app.set('port', port)

// Import API Routes
//数据库连接；
// require("./database")();
// Import API Routes
// app.use('/api', api(app))
// let api=require("./api/index")(app);
import api from "./api/index"
api(app);


//验证码
app.get("/captcha",async function(req,res){
	const {token,buffer} =await captcha({size:4,style:3});
	req.session.captchaToken=token;
	res.send(buffer)
});
app.get("/getToken",function(req,res){
	var token=uuid.v4();
	res.send(token);
});
// Import and Set Nuxt.js options
let config = require('../nuxt.config.js')
config.dev = !(process.env.NODE_ENV === 'production')

// Init Nuxt.js
const nuxt = new Nuxt(config)

// Build only in dev mode
if (config.dev) {
  const builder = new Builder(nuxt)
  builder.build()
}

// Give nuxt middleware to express
app.use(nuxt.render)

// Listen the server
app.listen(port, host)
console.log('Server listening on ' + host + ':' + port) // eslint-disable-line no-console
