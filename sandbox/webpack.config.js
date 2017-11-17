var path = require('path');

module.exports = {
    entry: './app/index.js',
    output: {
        path: path.join(__dirname, 'public/js/'),
        filename: 'Hologram.js',
    },
    module: {
        rules: [
          {
            test: /\.(js|jsx)$/,
            exclude: /node_modules/,
            loader: 'babel-loader',
          },
          {
            test: /\.scss$/,
            exclude: /node_modules/,
            use: [
              {
                  loader: "style-loader" // 将 JS 字符串生成为 style 节点
              }, {
                  loader: "css-loader" // 将 CSS 转化成 CommonJS 模块
              }, {
                  loader: "sass-loader" // 将 Sass 编译成 CSS
              }
            ]
          },
      ]
    },
    resolve: {
        extensions: ['.js', '.jsx']
    },
};
