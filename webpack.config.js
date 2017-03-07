var path = require('path');

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
        loaders: [{
            test: /\.(js|jsx)$/,
            exclude: /node_modules/,
            loader: 'babel',
        }]
    },
    resolve: {
        extensions: ['', '.js', '.jsx']
    },
};
