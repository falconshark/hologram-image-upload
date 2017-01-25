
module.exports = {
    "entry": "./app/client.js",
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
