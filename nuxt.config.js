module.exports = {
  /*
  ** Headers of the page
  */
  head: {
    title: 'starter',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1,minimum-scale=1.0,maximum-scale=1.0,user-scaleble=no' },
      { "http-equiv": 'Cache-Control',content:"no-siteapp"},
      { "http-equiv": 'X-UA-Compatible',content:"IE=edge,chrome=1"},
      { name: "renderer",content:"webkit|ie-comp|ie-stand"},
      { hid: 'description', name: 'description', content: 'Nuxt.js project' }
    ],
    script:[
      {src:"/style/jquery_002.js"},
      {src:"/style/jquery.js",id:"jquery"},
      {src:"/style/bootstrap.js"},
      {src:"/style/beyond.js"},
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      {rel:"stylesheet",href:'/style/bootstrap.css'},
      {rel:"stylesheet",href:'/style/font-awesome.css'},  
      {rel:"stylesheet",href:'/style/weather-icons.css'},  
      {rel:"stylesheet",href:'/style/beyond.css',id:"beyond-link"},
      {rel:"stylesheet",href:'/style/demo.css'},
      {rel:"stylesheet",href:'/style/typicons.css'}, 
      {rel:"stylesheet",href:'/style/animate.css'}, 
    ]
  },
  body:{
    
  },
  /*
  ** Global CSS
  */
  css: ['~/assets/css/main.css'],
  /*
  ** Add axios globally
  */
  build: {
    vendor: ['axios'],
    /*
    ** Run ESLINT on save
    */
   /* extend (config, ctx) {
      if (ctx.isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        })
      }
    }*/
  },
  loading: {
    color: '#04acf7',
    height: '4px',
    failedColor: 'red'
  },
  router: {
    middleware: 'adminAuth'
  },
  transition: {
    name: 'page'
  },
}
