const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = (env) => {
 const isProduction = env === 'production';
 const CSSExtract = new ExtractTextPlugin('styles.css');
  
 return {
    entry: './src/app.js',
    output: {
      path: path.join(__dirname, 'public', 'dist'),
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
            use: CSSExtract.extract({
              use: [
                {
                  loader: 'css-loader',
                  options: {
                    sourceMap: true
                  }
                },
                {
                  loader: 'sass-loader',
                  options: {
                    sourceMap: true
                  }
                }
              ]
            })
        }]
    },
    plugins: [
      CSSExtract
    ],
    devtool: isProduction ? 'source-map' : 'inline-source-map',
    devServer: {
      contentBase: path.join(__dirname, 'public'),
      historyApiFallback: true,
      publicPath: '/dist/'
    }
 }
};




