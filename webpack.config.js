
module.exports = {
    "entry": "./src/hologram.js",
    "output": {
        "path": __dirname + "/dist",
        "filename": "Hologram.js"
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
