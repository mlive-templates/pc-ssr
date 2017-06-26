const webpack = require('webpack')
const path = require('path')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const OutPutEntryAssetsPlugin = require('../lib/outPutEntryAssetsPlugin')
const entryInfo = require('../lib/entryInfo.js')
const fs = require('fs-extra')
const rootPath = path.resolve(__dirname, '../../')
/*eslint-disable indent */
const vueLoader = {
    loaders: {
        'less': [{
                'loader': path.join(rootPath, 'node_modules/extract-text-webpack-plugin/loader.js'),
                'options': {
                    'omit': 1,
                    'remove': true
                }
            },
            {
                'loader': 'vue-style-loader'
            },
            {
                'loader': 'css-loader',
                'options': {
                    'minimize': true,
                    'sourceMap': true
                }
            },
            {
                'loader': 'less-loader',
                'options': {
                    'sourceMap': true
                }
            }
        ]
    }
}

function getConfig() {
    const packageInfo = fs.readJSONSync(rootPath + '/build/package.json')
    const cdn = packageInfo.cdn
    const config = {
        // 定义应用入口
        entry: entryInfo.getClientEntry(),
        // 定义输出
        output: {
            path: path.join(rootPath, 'build/client', cdn),
            publicPath: '/' + cdn + '/',
            filename: 'script/[name].js'
        },
        // devtool: '#eval-source-map', // 开始source-map. 具体的不同配置信息见webpack文档
        module: {
            rules: [{
                test: /\.vue$/,
                loader: 'vue-loader',
                options: vueLoader
            }, {
                test: /\.js$/,
                loader: ['babel-loader', 'eslint-loader'],
                exclude: /node_modules/
            }, {
                test: /\.(swf)$/,
                loader: `url-loader?limit=8192&name=script/[name].[ext]`
            }, {
                test: /\.(png|jpg|jpeg|gif|woff|svg|eot|ttf)$/,
                loader: `url-loader?limit=8192&name=images/[name].[ext]`
            }, {
                test: /\.less/,
                use: [{
                    loader: 'less-loader'
                }]
            }, {
                test: /\.css/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: {
                        'loader': 'css-loader',
                        'options': {
                            'minimize': true,
                            'sourceMap': false
                        }
                    }
                })
            }]
        },
        resolve: {
            alias: {
                'vue$': 'vue/dist/vue.common.js',
                'components': path.join(rootPath, '/src/views/components'), // 定义文件路径， 加速打包过程中webpack路径查找过程
                'lib': path.join(rootPath, '/src/lib'),
                'less': path.join(rootPath, '/src/less'),
                '@': path.join(rootPath)
            },
            extensions: ['.js', '.less', '.vue', '*', '.json'] // 可以不加后缀, 直接使用 import xx from 'xx' 的语法
        },
        plugins: [
            new ExtractTextPlugin('css/[name].css'),
            new OutPutEntryAssetsPlugin({
                filename: '../../../bundles/client-assets.json'
            }),
            // 将vue等框架/库进行单独打包, 并输入到vendors.js文件当中
            new webpack.optimize.CommonsChunkPlugin({
                names: ['common', 'vendors'],
                minChunks: Infinity
            })
        ]
    }
    if (process.env.NODE_ENV === 'production') {
        // config.output.publicPath = '//static1.mtime.cn' + config.output.publicPath
        config.plugins.push(
            new webpack.optimize.UglifyJsPlugin({
                compress: {
                    warnings: false
                }
            }),
            new webpack.DefinePlugin({
                'process.env': {
                    NODE_ENV: '"production"'
                }
            })
        )
    }

    return config
}

module.exports = {
    getConfig
}