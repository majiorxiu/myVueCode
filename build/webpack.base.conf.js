const webpack = require('webpack')
const { resolve }= require('path')
const utils = require('./utils')
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

const isDev = process.env.NODE_ENV === 'production'


let pluginsConfig = [
	new VueLoaderPlugin(),
	new HtmlWebpackPlugin({
		title: 'my App',
		template: resolve(__dirname, '../index.html')
	}),
	new webpack.DefinePlugin({
		'process.env': {
			'NODE_ENV': JSON.stringify(process.env.NODE_ENV)
		}
	})
]
if (!isDev) {
	pluginsConfig = pluginsConfig.concat(new MiniCssExtractPlugin({
		filename: "css/[name].css",
		chunkFilename: "css/[id].css"
	}))
}

module.exports = {
	mode: process.env.NODE_ENV || 'production',
	entry: resolve(__dirname, '../src/main.js'),
	output: {
		filename: 'bundle.js',
		path: resolve(__dirname, '../dist')
	},
	resolve: {
		//引入时可以省略后缀
		extensions: ['.js', '.vue', '.json'],
		alias: {
			'vue$': 'vue/dist/vue.esm.js',
			//@就了代表了src文件夹所在路径
			'@': resolve('src'),
		}
	},
	module: {
		rules: [
			{
				test: /\.vue$/,
				loader: 'vue-loader'
			},
			{
				test: /\.(css|scss|sass)$/,
				use: [
					!isDev ? 'vue-style-loader' : MiniCssExtractPlugin.loader,
					{
						loader: 'css-loader',
						options: {
							modules: isDev,
							localIdentName: '[local]_[hash:base64:8]'
						}
					},
					// 'sass-loader',
					{
						loader: 'sass-loader',
						options: {
								sourceMap: true
						}
					},
					{
						loader: 'sass-resources-loader',
						options: {
							resources: resolve(__dirname, '../src/assets/css/global.scss')
						}
					},
					{
						loader: 'postcss-loader'
					}
				]
			},
			{ 
				test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
				loader: 'url-loader?name=images/[name]-[contenthash:5].[ext]&limit=2000'
			},
      {
        test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('media/[name].[hash:7].[ext]')
        }
      },
			{
				test: /\.js$/,
				loader: 'babel-loader?cacheDirectory',
				include: resolve(__dirname, '../src'),
				exclude: /node_modules/
			},
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('fonts/[name].[hash:7].[ext]')
        }
			},
		]
	},
	plugins: pluginsConfig,
	stats: {
		// One of the two if I remember right
		entrypoints: false,
		children: false
	},
}