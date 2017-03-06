
module.exports = {
    "entry": "./src/components/Hologram.js",
    "output": {
        "path": __dirname + "/dist",
        "filename": "Hologram.js",
        library: 'Hologram',
        libraryTarget: 'umd',
        umdNamedDefine: true
    },
    "module": {
        "loaders": [
            {
                "test": /\.js$/,
                "loader": "babel"
            },
            {
                "test": /\.css$/,
                "loader": "css-loader"
            },
        ]
    }
}
