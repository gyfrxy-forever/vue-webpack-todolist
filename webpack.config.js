const path = require('path');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
// const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HTMLPlugin = require('html-webpack-plugin');

const isDev = process.env.NODE_ENV === 'development';

const config = {
    entry: './src/index.js',  // 入口文件
    output: {  
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist')
    },
    module: {
        rules: [
            {
                test: /\.vue$/,
                loader: 'vue-loader'
            },
            // 将css写入到HTML
            {
                test: /\.css$/,
                use: [
                    'style-loader',  // 将模块的导出作为样式添加到 DOM 中
                    'css-loader' // 解析 CSS 文件后，使用 import 加载，并且返回 CSS 代码
                ]
            },
            // stylus-loader处理stylus文件,解析成css文件，交给css-loader，然后再使用style-loader插入到DOM，一层一层向上传递
            {
                test: /\.styl/,
                use: [
                  'style-loader',
                  'css-loader',
                  'stylus-loader'
                ]
            },
            {
                test: /\.(png|jpg|gif|svg|eot|ttf|woff|woff2)$/,
                loader: 'url-loader',
                options: {
                    limit: 1024,  //将小于1024d的图片转为base64打包到js文件中，减少http请求
                    name: '[name].[ext]'
                }
            }
        ]
    },
    plugins: [
        // new CleanWebpackPlugin(),
        
        // 请确保引入这个插件！
        new VueLoaderPlugin(),
        new HTMLPlugin()
    ]
};

if(isDev) {
    config.mode = 'development';
    config.devServer = {
        port: '8000',
        host: '0.0.0.0', 
        overlay: {
            errors: true
        },
        hot: true
    }
}else {
    config.mode = 'production';
}
module.exports = config;
