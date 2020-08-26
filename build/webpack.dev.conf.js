const webpack = require('webpack')
const path = require('path')
const WebPackBaseConfig = require('./webpack.base.conf.js')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const WebPackMerge = require('webpack-merge')

module.exports = WebPackMerge(WebPackBaseConfig, {
	devtool: 'inline-source-map',
	devServer: {
		contentBase: path.join(__dirname, 'dist'), //告诉服务器从哪个目录中提供内容
		compress: true, //启用 gzip 压缩
		port: 8080, //端口号
		host: '127.0.0.1', //默认是 localhost。如果希望服务器外部可访问,则设置为0.0.0.0
		hot: true, //启用热替换模块  必须配置 webpack.HotModuleReplacementPlugin
		proxy:{
			// Paths
			'/baidu': {
				target: 'http://api.map.baidu.com',
				pathRewrite: {
						'/baidu': ''   //重写接口
				}
			},
			'/gaode': {
				target: 'https://restapi.amap.com',
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
	plugins: [
		new CleanWebpackPlugin(['dist']), //清理文件夹
		new webpack.HotModuleReplacementPlugin(), //启用热替换模块
		new webpack.NamedModulesPlugin() //启用HMR时,插件将显示模块的相对路径
	]
})