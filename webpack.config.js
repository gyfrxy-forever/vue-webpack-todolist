const path = require('path');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HTMLPlugin = require('html-webpack-plugin');

const isDev = process.env.NODE_ENV === 'development';

const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const config = {
    entry: './src/index.js',  // 入口文件
    output: {  
        filename: 'bundle.[hash:8].js',
        path: path.resolve(__dirname, 'dist')
    },
    module: {
        rules: [
            {
                test: /\.vue$/,
                loader: 'vue-loader'
            },
            {
                test: /\.jsx$/,
                loader: 'babel-loader'
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
        new CleanWebpackPlugin(),

        // 请确保引入这个插件！
        new VueLoaderPlugin(),
        new HTMLPlugin(),
        new MiniCssExtractPlugin({
            // Options similar to the same options in webpackOptions.output
            // all options are optional
            filename: '[name].css',
            chunkFilename: '[id].css',
            ignoreOrder: false, // Enable to remove warnings about conflicting order
        })
    ],
    optimization: {
        splitChunks: {
          chunks (chunk) {
            // exclude `my-excluded-chunk`
            return chunk.name !== 'my-excluded-chunk';
          }
        }
    }
};

if(isDev) {
    config.mode = 'development';
    config.module.rules.push({
        //css预处理器，使用模块化的方式写css代码
        //stylus-loader专门用来处理stylus文件，处理完成后变成css文件，交给css-loader.webpack的loader就是这样一级一级向上传递，每一层loader只处理自己关心的部分
        test: /\.styl/,
        use: [
            'vue-style-loader',
            'css-loader',
            { 
                loader: 'postcss-loader', 
                options: { sourceMap: true } 
            },
            'stylus-loader'
        ]  
    });
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
    config.output.filename = '[name].[chunkhash:8].js';
    config.module.rules.push(
        //css预处理器，使用模块化的方式写css代码
        //stylus-loader专门用来处理stylus文件，处理完成后变成css文件，交给css-loader.webpack的loader就是这样一级一级向上传递，每一层loader只处理自己关心的部分
        {
            test: /\.styl/,
            use: [
                {
                    loader: MiniCssExtractPlugin.loader,
                    options: {
                        // you can specify a publicPath here
                        // by default it uses publicPath in webpackOptions.output
                        publicPath: './',
                        hmr: process.env.NODE_ENV === 'development',
                    },
                },
                'css-loader',
                { 
                    loader: 'postcss-loader', 
                    options: { sourceMap: true } 
                },
                'stylus-loader'
            ]
        },
    );
    config.plugins.push(
        new MiniCssExtractPlugin({
            // Options similar to the same options in webpackOptions.output
            // all options are optional
            filename: 'styles.[chunkhash].[name].css',
            chunkFilename: '[id].css',
            ignoreOrder: false, // Enable to remove warnings about conflicting order
        })
    );
}
module.exports = config;
