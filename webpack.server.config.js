const path = require('path');
const webpack = require('webpack');
const fs = require('fs');

const nodeModules = {};
fs.readdirSync('node_modules')
    .filter(function(x) {
        return ['.bin'].indexOf(x) === -1;
    })
    .forEach(function(mod) {
        nodeModules[mod] = 'commonjs ' + mod;
    });

const BUILD_DIR = path.resolve(__dirname, 'dist');
const APP_DIR = path.resolve(__dirname, 'src');

const config = {
    devtool: 'cheap-module-source-map',
    entry: {
        server: path.resolve(__dirname, 'server.js'),
    },
    output: {
        path: __dirname,
        filename: '[name].entry.js',
        chunkFilename: '[id].chunk.js',
        publicPath: '/dist/',
    },
    externals: nodeModules,
    module: {
        loaders: [{
            test: /\.js$/,
            loader: 'babel-loader',
            exclude: path.resolve(__dirname, 'node_modules'),
            query: {
                presets: ['latest', 'react'],
                plugins: ['transform-object-rest-spread', 'transform-class-properties'],
            },
        }, {
            test: /\.css$/,
            loaders: ['style', 'css-loader'],
        }, {
            test: /.less$/,
            loaders: ['style', 'css-loader', 'less-loader'],
        }, {
            test: /\.md$/,
            loaders: ['html', 'markdown'],
        }, {
            test: /\.json$/,
            loaders: ['json'],
        }],
    },
    target: 'node',
    node: {
        __dirname: false,
        __filename: false,
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: JSON.stringify(process.env.NODE_ENV),
            },
        }),
    ],
};

console.log(`Environment variable NODE_ENV is ${process.env.NODE_ENV}`);

if(process.env.NODE_ENV === 'production') {
    config.plugins.push(
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                screw_ie8: true,
            },
        }));
}
module.exports = config;
