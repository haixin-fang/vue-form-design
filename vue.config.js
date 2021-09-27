const path = require('path');
module.exports = {
    pages: {
        index: {
            entry: "client/main.ts",
            template: 'publice/index.html',
            filename: 'index.html',
            title: 'starfish-h5'
        }
    },
    css: {
        loaderOptions: {
            sass: {
                // 全局sass变量	
                //sass-loader 新版本
                prependData: `@import "./client/styles/variables.scss";@import "./client/styles/iconfont.scss";`
            }
        }
    },
    configureWebpack: {
        devtool: "source-map",
        resolve: {
            alias: {
                '@': path.resolve(__dirname, './client'),
                '~editor': path.resolve(__dirname, './client/pages/Editor/components'),
            }
        },
        module: {
            rules: [
                {
                    test: /\.s[ac]cc$/i,
                    use: [
                        "style-loader",
                        "css-loader",
                        "sass-loader",
                    ]
                }
            ]
        }
    },
};