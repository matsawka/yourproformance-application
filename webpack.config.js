const path = require('path');

module.exports = {
  entry: './src/app.js',
  output: {
    path: path.join(__dirname, 'public'),
    filename: 'bundle.js'
  },
  //loader
  module: {
      rules: [{
          loader: 'babel-loader', //2.run it through babel
          test: /\.js$/, //1.when you see a js file run babel
          exclude: /node_modules/ //3.exclude the node_modules folder
      }, {
          test: /\.s?css$/, // look for any file that ends with .css
          use: [ //use is an array of loaders
            'style-loader',
            'css-loader',
            'sass-loader'
          ]
      }]
  },
  devtool: 'cheap-module-eval-source-map',
  devServer: {
    contentBase: path.join(__dirname, 'public') 
  }
};


