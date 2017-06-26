const path = require('path')
const rootPath = path.join(__dirname, '/../../')
const nodeExternals = require('webpack-node-externals')
const config = {
    entry: path.join(rootPath, '/src/index.js'),
    target: 'node',
    output: {
        libraryTarget: 'commonjs2', // !different
        path: path.join(rootPath, 'build'),
        filename: 'index.js'
    },
    resolve: {
        extensions: ['.js']
    },
    externals: [
        nodeExternals({
            modulesDir: path.join(rootPath, 'node_modules')
        })
    ],
    node: {
        console: true,
        global: true,
        process: true,
        Buffer: true,
        __filename: false,
        __dirname: false,
        setImmediate: true
    },
    module: {
        rules: [{
            test: /\.vue$/,
            loader: 'vue-loader'
        }, {
            test: /\.js$/,
            loader: ['babel-loader', 'eslint-loader'],
            exclude: /node_modules/
        }]
    }
}

function getConfig() {
    return config
}
module.exports = {
    getConfig
}