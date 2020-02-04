const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');

// HTMLファイルのビルド設定
const htmlWebpackPlugin = new HtmlWebpackPlugin({
	template: path.join(__dirname, 'examples/src/index.html'),
	filename: './index.html'
});

//sample用cssのコピー
const exampleCssFileCopy = new CopyPlugin([
	{
		from: path.join(__dirname, 'examples/src/index.css'),
		to: path.join(__dirname, 'examples/dist/index.css')
	}
]);

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
			}
		]
	},
	resolve: {
		extensions: [ '.js', '.jsx' ]
	},
	plugins: [ exampleCssFileCopy, htmlWebpackPlugin ],
	devServer: {
		contentBase: path.join(__dirname, 'examples/dist'),
		port: 9001
	}
};
