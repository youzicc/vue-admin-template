var path = require('path')
function resolve (dir) {
  return path.join(__dirname, './', dir)
}
module.exports = {
  publicPath: process.env.NODE_ENV == "production" ? './' : '/',
  productionSourceMap: false, //去除打包后js的map文件
  outputDir: "dist", // 输出文件目录
  devServer: {
    host: 'localhost',//设置当前访问的ip
    port: 8011,//当前web服务端口
    open: true,//浏览器自动打开页面
    // proxy: {
    //   // api名字可以自定义，注意原请求地址中不能出现这个名字
    //   '/api': {
    //     target: "", // 后台接口域名
    //     changOrigin: true,//是否跨域
    //     ws: true,//是否代理websocket
    //     secure: false,  // 如果是https接口，需要配置这个参数
    //     pathRewrite: {
    //       '^/api': ''//url重写（规定请求地址以什么作为开头）
    //     }
    //   }
    // }
  },
  // scss配置
  css: {
    loaderOptions: {
      sass: {
        prependData: `@import "./src/styles/index";`,
      }
    }
  },
  // svg配置
  chainWebpack: config => {
    config.module
      .rule('svg')
      .exclude.add(resolve('src/icons')
      )
      .end()
    config.module
      .rule('icons')
      .test(/\.svg$/)
      .include.add(resolve('src/icons'))
      .end()
      .use('svg-sprite-loader')
      .loader('svg-sprite-loader')
      .options({
        symbolId: 'icon-[name]'
      })
      .end()
  },
  lintOnSave: false
}

