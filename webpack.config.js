const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

// HTMLファイルのビルド設定
const htmlWebpackPlugin = new HtmlWebpackPlugin({
	template: path.join(__dirname, 'examples/src/index.html'),
	filename: './index.html'
});

module.exports = {
	// メインとなるJavaScriptファイル（エントリーポイント）
	entry: [ '@babel/polyfill', path.join(__dirname, 'examples/src/index.js') ],
	output: {
		path: path.join(__dirname, 'examples/dist'),
		filename: 'bundle.js'
	},
	performance: { hints: false },
	module: {
		rules: [
			{
				test: /\.(js|jsx)$/,
				use: 'babel-loader',
				exclude: /node_modules/
			},
			{
				test: /\.css$/,
				use: [ 'style-loader', 'css-loader' ]
			},
			{
				test: /\.(c|d|t)sv$/, // load all .csv, .dsv, .tsv files with dsv-loader
				use: [ 'dsv-loader' ] // or dsv-loader?delimiter=,
			}
		]
	},
	resolve: {
		extensions: [ '.js', '.jsx' ]
	},
	plugins: [ htmlWebpackPlugin ],
	devServer: {
		contentBase: path.join(__dirname, 'examples/dist'),
		port: 9001
	}
};