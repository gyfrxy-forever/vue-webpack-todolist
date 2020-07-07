const path = require('path');
const createVueLoaderOptions = require('./vue-loader.config');

const isDev = process.env.NODE_ENV === 'development';

const config = {
    entry: path.join(__dirname, '../client/index.js'),  // 入口文件
    output: {  
        filename: 'bundle.[hash:8].js',
        path: path.join(__dirname, '../dist')
    },
    module: {
        rules: [
            {
                test: /\.vue$/,
                loader: 'vue-loader',
                options: createVueLoaderOptions(isDev)
            },
            {
                test: /\.jsx$/,
                loader: 'babel-loader'
            },
            {
                test: /\.js$/,
                loader: 'babel-loader',
                exclude: /node_modules/
            },
            {
                test: /\.(png|jpg|jpeg|gif|svg|eot|ttf|woff|woff2)$/,
                loader: 'url-loader',
                options: {
                    limit: 1024,  //将小于1024d的图片转为base64打包到js文件中，减少http请求
                    name: 'resources/[path][name]-[hash:8].[ext]'
                }
            }
        ]
    }
};

module.exports = config;
