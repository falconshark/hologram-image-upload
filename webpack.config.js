var path = require('path');
var webpack = require('webpack');

module.exports = {
    entry: './src/components/Hologram.js',
    output: {
        path: path.join(__dirname, 'dist'),
        library: 'Hologram',
        libraryTarget: 'commonjs2',
        filename: 'Hologram.js',
    },
    externals: {
        'react': 'react',
        'react-dom':'react-dom',
        'object-assign': 'object-assign',
    },
    module: {
        noParse:[
            /node_modules\/vex-js\/dist\/js\/vex.js/,
            /node_modules\/vex-dialog\/dist\/vex.dialog.js/,
        ],
        loaders: [{
            test: /\.(js|jsx)$/,
            exclude: /node_modules/,
            loader: 'babel',
        }]
    },
    plugins: [
        new webpack.optimize.UglifyJsPlugin({
            compress: { warnings: false }
        })
    ],
    resolve: {
        extensions: ['', '.js', '.jsx']
    },
};
