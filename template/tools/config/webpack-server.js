const path = require('path')
const webpack = require('webpack')
const VueSSRPlugin = require('vue-ssr-webpack-plugin')
const rootPath = path.resolve(__dirname, '../../')
/*eslint-disable indent */
function getConfig(entry) {
    return {
        entry: path.resolve(__dirname, '../../src/views/entry/server', entry + '.js'),
        target: 'node',
        output: {
            libraryTarget: 'commonjs2', // !different
            path: path.join(rootPath, 'build/bundles')
        },
        resolve: {
            alias: {
                'vue$': 'vue/dist/vue.common.js',
                'components': path.join(rootPath, '/src/views/components'), // 定义文件路径， 加速打包过程中webpack路径查找过程
                'lib': path.join(rootPath, '/src/lib'),
                'less': path.join(rootPath, '/src/less'),
                '@': path.join(rootPath)
            },
            extensions: ['.js', '.less', '.vue', '*', '.json']
        },
        externals: Object.keys(require('../../package.json').dependencies),
        module: {
            rules: [{
                    test: /\.vue$/,
                    loader: 'vue-loader'
                }, {
                    test: /\.(png|jpg|jpeg|gif|woff|svg|eot|ttf)$/,
                    loader: `url-loader?limit=8192&name=/images/[name].[ext]`
                },
                {
                    test: /\.js$/,
                    loader: ['babel-loader', 'eslint-loader'],
                    include: rootPath,
                    exclude: /node_modules/
                }
            ]
        },
        plugins: [
            new VueSSRPlugin({
                filename: entry + '-vue-ssr-bundle.json'
            }),
            new webpack.optimize.UglifyJsPlugin({
                compress: {
                    warnings: false
                },
                sourceMap: false
            }),
            new webpack.DefinePlugin({
                'process.env': {
                    NODE_ENV: '"production"'
                }
            })
        ]
    }
}
module.exports = {
    getConfig
}