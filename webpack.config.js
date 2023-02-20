const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin')

const config = {
    entry: './src/index.tsx',
    mode:"development",
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js'
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                use: 'babel-loader',
                exclude: /node_modules/
            },
            {
                test: /\.scss$/,
                use: [
                    'style-loader',
                    'css-loader',
                    'sass-loader'
                ]
            },
            {
                test: /\.ts(x)?$/,
                loader: 'ts-loader',
                exclude: /node_modules/
            }
        ]
    },
    resolve: {
        extensions: [
            '.tsx',
            '.ts',
            '.js'
        ]
    },
    devServer: {
        static: {
            directory: path.join(__dirname, "public/")
        },
        port: 3000,
        compress: true,
        hot: false,
        liveReload: true,
        open: true,
        watchFiles: ['src/**/*', 'public/**/*'],
        client: {
            overlay: true,
            progress: true
        }
    },
    plugins: [
        new webpack.ContextReplacementPlugin(/moment[\/\\]locale$/, /fr/),
        new HtmlWebpackPlugin({
            template: 'public/index.html'
          })
    ]
};

module.exports = config;