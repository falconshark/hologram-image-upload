
module.exports = {
    "entry": "./app/index.js",
    "output": {
        "path": __dirname + "/public/assets",
        "filename": "bundle.js"
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
