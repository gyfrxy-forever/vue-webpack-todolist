// const docsLoader = require.resolve('./doc-loader'); // 自己写的loader

module.exports = (isDev) => {
    return {
        preserveWhitepace: true,   // 防止一些vue文件中不小心空格的影响
        extractCSS: !isDev, // vue中的css也单独提取打包  正式环境中单独打包
        cssModules: {
            localItentName: isDev ? '[path]-[name]-[hash:base64:5]' : '[hash:base64:5]',
            camelCase: true, 
        },
        // hotReload: false,  // vue组件内容关掉热重载
        // loaders: {
        //     'docs': docsLoader,   // 对自定义的模块可以指定自定义的loader
        //     js: 'coffe-loader',
        //     html: '',
        //     css: ''
        // },
        // preLoader: {
        //     js: 'coffe-loader'  // 先用这块的loader去解析，再用babel里边的去解析
        // },
        // postLoader: {
        // }
    }
}