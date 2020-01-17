const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');

// HTMLファイルのビルド設定
const htmlWebpackPlugin = new HtmlWebpackPlugin({
    template: path.join(__dirname, 'examples/src/index.html'),
    filename: './index.html'
});

//データファイルのコピー
const copyFile = new CopyPlugin([
    { from: path.join(__dirname, 'examples/dist/data'), to: path.join(__dirname, 'dist/data') },
]);

module.exports = {
    mode: 'production',
    // メインとなるJavaScriptファイル（エントリーポイント）
    entry: [
        '@babel/polyfill',
        path.join(__dirname, "examples/src/index.js")
    ],
     output: {
        path: path.join(__dirname, "examples/dist"),
        filename: "bundle.js"
    },    
    module: {
        rules: [
        {
            test: /\.(js|jsx)$/,
            use: 'babel-loader',
            exclude: /node_modules/
            },
            {
                test: /\.css$/,
                use: ["style-loader", "css-loader"]
            }            
        ]
    },
    resolve: {
        extensions: ['.js', '.jsx'],
    },  
    plugins: [copyFile, htmlWebpackPlugin],
    devServer: {
        contentBase: path.join(__dirname, 'example/dist'),
        port: 3001
    }        

};