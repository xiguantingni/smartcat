/**
 * Created by RCC on 2018/6/15.
 */

const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const CompressionPlugin = require("compression-webpack-plugin");

module.exports = {
    entry: ['babel-polyfill', './src/index.js'],
    output: {
        path: path.resolve(__dirname, 'dist'), // 输出的路径
        publicPath: '/',
        filename: 'static/[hash].bundle.js'  // 打包后文件
    },
    resolve: {
        alias: {
            '@src': path.resolve(__dirname, './src'),
            '@page': path.resolve(__dirname, './src/page'),
            '@util': path.resolve(__dirname, './src/util'),
            '@component': path.resolve(__dirname, './src/component'),
            '@image': path.resolve(__dirname, './src/image'),
            '@constant': path.resolve(__dirname, './src/constant.js')
        }
    },
    module: {
        rules: [
            {
                test: /\.js[x]?$/,
                enforce: 'pre',
                exclude: /(node_modules)/,
                use: {
                    loader: 'eslint-loader',
                    options: {
                        fix: false
                    }
                }
            },
            {
                test: /\.(js|jsx)$/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['es2015', 'stage-0', 'react']
                        //按需导入样式文件
                        //plugins: [
                        //    ['import', { libraryName: 'antd', style: 'css' }]
                        //]
                    }
                },
                exclude: /node_modules/
            },
            {
                test: /\.html$/,
                use: [{
                    loader: 'html-loader',
                    options: {
                        root: `${__dirname}/src`,
                        attrs: ['img:src', 'link:href', 'script:src']
                    }
                }]
            },
            {
                test: /\.css$/,
                //use: [ 'style-loader', 'css-loader' ]
                use: [{
                    loader: "style-loader"
                }, {
                    loader: "css-loader"
                }]
            },
            {
                test: /\.less$/,
                use: [{
                    loader: "style-loader" // creates style nodes from JS strings
                }, {
                    loader: "css-loader" // translates CSS into CommonJS
                }, {
                    loader: "less-loader" // compiles Less to CSS
                }]
            },
            {
                test: /.(png|jpg|jpeg|gif|eot|ttf|woff|woff2|svg|svgz|tmpl)$/,
                use: ['url-loader?limit=8192&name=./image/[name].[ext]']
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: path.resolve(__dirname, './public/index.html'),
            inject : true
        }),
        new ExtractTextPlugin("css/index.css"),
        new CompressionPlugin({
            filename: '[path].gz[query]',
            algorithm: 'gzip',
            test: new RegExp(
                '\\.(js|css)$'    //压缩 js 与 css
            ),
            threshold: 10240,
            minRatio: 0.8
        })
    ],
    optimization: {
        splitChunks: {
            cacheGroups: {
                lib1: {
                    chunks: "initial",
                    enforce: true
                }
            }
        },
        minimizer: [
            // 压缩输出的 JS 代码
            new UglifyJSPlugin({
                uglifyOptions: {
                    ie8: false,
                    ecma: 8,
                    output: {
                        comments: false,
                        beautify: false
                    },
                    warnings: false
                }
            })
        ]
    },
    mode: 'production'
};
