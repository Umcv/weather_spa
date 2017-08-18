var webpack = require('webpack');
var FlowStatusWebpackPlugin = require('flow-status-webpack-plugin');
const path = require('path');
module.exports = {
	entry: './conf.js',
	output: {
		path: path.resolve(__dirname, '../web/js'),
		filename: 'pack.js',
		chunkFilename: "[name]_[hash].js",
		publicPath: 'js/'
	},
	module: {
		loaders: [
			{
				test: /\.js$/,
				exclude: /(node_modules|bower_components)/,
				loader: 'babel-loader',
				query: {
					presets: ['es2015', 'react']
				}
			}
		]
	},
    plugins: [
        new webpack.DefinePlugin({
			DEV_MODE: 4
		}),
		//new webpack.NoErrorsPlugin(),
		/*new FlowStatusWebpackPlugin({
            failOnError: true
        })*/
    ]
}