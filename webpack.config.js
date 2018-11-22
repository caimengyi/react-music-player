var path=require('path');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');


module.exports = {
	entry:[
		//webpack-dev-server的入口添加，热更新工具
		'webpack-dev-server/client?http://localhost:3000',
		'webpack/hot/only-dev-server',
		'react-hot-loader/patch',
		path.join(__dirname,'app/index.js')

	],
	output:{
		path:path.resolve(__dirname, '/dist/'),
		filename:'[name].js',
		publicPath:'/'
	},
	plugins:[
	//使用一个插件，可以根据模板自动生成html，插件处理模板链接最后的打包文件
		new HtmlWebpackPlugin({
			template:'./index.tpl.html', //模板
			inject:'body',
			filename:'./index.html'
		}),
        new webpack.optimize.OccurrenceOrderPlugin(),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoEmitOnErrorsPlugin(),
        new webpack.DefinePlugin({
          'process.env.NODE_ENV': JSON.stringify('development')
        })
	],
	module:{
		rules: [
            {
              test: /\.js$/,
              exclude: /node_modules/,
              loader: "babel-loader",
              query:
                {
                  presets:['react','es2015']
                }
            },
            {
                test: /\.json?$/,
                loader: 'json'
            },
            {
                test: /\.css$/,
                loader: "style!css"
            },
            {
                test: /\.less/,
                loader: 'style-loader!css-loader!less-loader'
            }
        ]
	}

}