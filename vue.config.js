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
    configureWebpack: {
        devtool: "source-map",
        resolve: {
            alias: {
                '@': path.resolve(__dirname, './client')
            }
        },
        module: {
            rules: [
                {
                    test: /\.s[ac]cc$/i,
                    use: [
                        "style-loader",
                        "css-loader",
                        "sass-loader"
                    ]
                }
            ]
        }
    },
};