var path = require('path');

module.exports = {
    entry: './app/index.js',
    output: {
        path: path.join(__dirname, 'public/js/'),
        filename: 'Hologram.js',
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
