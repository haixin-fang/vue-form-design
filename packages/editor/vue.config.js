const path = require('path');
module.exports = {
    publicPath: process.env.NODE_ENV === 'production' ? './' : '/',
    pages: {
        index: {
            entry: "src/main.ts",
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
                prependData: `@import "./src/styles/variables.scss";`
            }
        }
    },
    configureWebpack: {
        devtool: "source-map",
        resolve: {
            alias: {
                '@': path.resolve(__dirname, './src'),
                '~editor': path.resolve(__dirname, './src/pages/form'),
                'starfish-form': path.join(__dirname, "../../packages/form/src/main.ts")
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