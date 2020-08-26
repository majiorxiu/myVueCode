const path = require('path');//引入path模块
function resolve(dir){
    return path.join(__dirname,dir)//path.join(__dirname)设置绝对路径
}
module.exports={
	devServer: {
		port: 8080, //端口号
    // host: '127.0.0.1', //默认是 localhost。如果希望服务器外部可访问,则设置为0.0.0.0
    https: false,
		hot: true, //启用热替换模块  必须配置 webpack.HotModuleReplacementPlugin
		proxy:{
			// Paths
			'/baidu': {
        target: 'http://api.map.baidu.com',
        changeOrigin: true,
				pathRewrite: {
						'/baidu': ''   //重写接口
				}
			},
			'/gaode': {
				target: 'https://restapi.amap.com',
        changeOrigin: true,
				pathRewrite: {
						'/gaode': ''   //重写接口
				}
			},
			'/fineex': {
				target: 'http://cloud.wms.os.b1.fineex.net',
				pathRewrite: {
						'/fineex': ''   //重写接口
				}
			}
		},
	},
  chainWebpack:(config)=>{
    config.resolve.alias
    .set('@',resolve('src'))
    .set('@com',resolve('src/components'))
    .set('@page',resolve('src/page'))
    .set('@css',resolve('src/assets/css'))
    .set('@js',resolve('src/js'))
    //set第一个参数：设置的别名，第二个参数：设置的路径
  },
  css: {
    loaderOptions: {
      scss: {
        prependData: `@import "./src/assets/css/global.scss";`,
      },
    },
  },
  configureWebpack: {
    resolve: {
      alias: {
        'vue$': 'vue/dist/vue.esm.js' 
      }
    }
  }
}