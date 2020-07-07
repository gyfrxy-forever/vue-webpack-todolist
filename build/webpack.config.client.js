const path = require('path');

const VueLoaderPlugin = require('vue-loader/lib/plugin');
const HTMLPlugin = require('html-webpack-plugin');

const webpack = require('webpack');
const merge = require('webpack-merge');
const baseConfig = require('./webpack.config.base');

const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const isDev = process.env.NODE_ENV === 'development';

const defaultPlugins = [
    new CleanWebpackPlugin(),
    new VueLoaderPlugin(),
    new HTMLPlugin()
]
const devServer = {
    port: '8000',
    host: '0.0.0.0', 
    overlay: {
        errors: true
    },
    hot: true
}
let config;
if(isDev) {
    config = merge(baseConfig, {
        mode: 'development',
        module: {
            rules: [
                {
                    test: /\.styl/,
                    use: [
                        'vue-style-loader',  // 如果使用style-loader，vue文件中更新css没法热更新
                        'css-loader',
                        // {
                        //     loader: 'css-loader',  // 使用css-modules
                        //     options: {
                        //         module: true,
                        //         localIdentName: isDev ? '[path]-[name]-[hash:base64:5]' : '[hash:base64:5]'
                        //     }
                        // },
                        { 
                            loader: 'postcss-loader', 
                            options: { sourceMap: true } 
                        },
                        'stylus-loader'
                    ]  
                }
            ]
        },
        devtool: '#cheap-module-eval-source-map',
        devServer,
        plugins: defaultPlugins.concat([
            new webpack.HotModuleReplacementPlugin(),
            new webpack.NoEmitOnErrorsPlugin()
        ])
    })
}else {
    config = merge(baseConfig, {
        mode: 'production',
        output: {
            filename: '[name].[chunkhash:8].js'
        },
        module: {
            rules: [
                {
                    test: /\.styl/,
                    use: [
                        {
                            loader: MiniCssExtractPlugin.loader,
                            options: {
                                publicPath: './',
                            },
                        },
                        'css-loader',
                        { 
                            loader: 'postcss-loader', 
                            options: { sourceMap: true } 
                        },
                        'stylus-loader'
                    ]
                }
            ]
        },
        plugins: defaultPlugins.concat([
            new MiniCssExtractPlugin({ // css按单独文件输出
                // Options similar to the same options in webpackOptions.output
                // all options are optional
                filename: 'styles.[chunkhash].[name].css',
                chunkFilename: '[id].css',
                ignoreOrder: false, // Enable to remove warnings about conflicting order
            })
        ]),
        optimization: {  // SplitChunksPlugin将共享代码块单独打包
            splitChunks: { // 只对那些引入的模块进行拆分复用，而不会去操作其他的代码
                chunks (chunk) {
                    // exclude `my-excluded-chunk`  排除 my-excluded-chunk
                    return chunk.name !== 'my-excluded-chunk';
                }
            },
            runtimeChunk: {
                name: 'runtime'   // 提取entry chunk 中的 runtime部分函数
            }
        }
    })
}
module.exports = config;
