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
            {
                test: /\.jsx$/,
                loader: 'babel-loader'
            },
            // stylus-loader处理stylus文件,解析成css文件，交给css-loader，然后再使用style-loader插入到DOM，一层一层向上传递
            {
                test: /\.styl/,
                use: [
                    'vue-style-loader',
                    'css-loader',
                    {
                        loader: 'postcss-loader',
                        options: {
                            sourceMap: true
                        }
                    },
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
