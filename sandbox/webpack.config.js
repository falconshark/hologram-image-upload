var path = require('path');

module.exports = {
    entry: './app/index.js',
    output: {
        path: path.join(__dirname, 'public/dist/'),
        filename: 'Hologram.js',
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
    resolve: {
        extensions: ['', '.js', '.jsx']
    },
};
