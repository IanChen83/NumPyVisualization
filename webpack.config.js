const path = require('path');
const webpack = require('webpack');

const BUILD_DIR = path.resolve(__dirname, 'dist');
const APP_DIR = path.resolve(__dirname, 'src');

const config = {
    devtool: 'cheap-module-source-map',
    entry: {
        index: [`${APP_DIR}/index.js`, 'webpack-hot-middleware/client?timeout=20000'],
        // server: path.resolve(__dirname, 'server.js'),
    },
    output: {
        path: BUILD_DIR,
        filename: '[name].entry.js',
        chunkFilename: '[id].chunk.js',
        publicPath: '/dist/',
    },
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
    plugins: [
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: JSON.stringify(process.env.NODE_ENV),
            },
        }),
    ],
};

if(process.env.NODE_ENV === 'production') {
    config.output.path = path.resolve(__dirname, 'public');
    config.plugins.push(
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                screw_ie8: true,
            },
        }));
} else {
    config.plugins.push(new webpack.optimize.OccurrenceOrderPlugin());
    config.plugins.push(new webpack.HotModuleReplacementPlugin());
    config.plugins.push(new webpack.NoErrorsPlugin());
}

module.exports = config;
