const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const merge = require('webpack-merge');
const validate = require('webpack-validator');

const PATHS = {
    app: path.join(__dirname, 'app'),
    build: path.join(__dirname, 'build')
};

//module.exports = {
const common = {
    entry: {
        app: PATHS.app
    },
    output: {
        path: PATHS.build,
        filename: '[name].js'
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: '01-00 Webpack demo'
        })
    ]
};

var config;
// Detect how npm is run and branch based on that
console.log('process.env.npm_lifecycle_event: ',process.env.npm_lifecycle_event )
switch(process.env.npm_lifecycle_event) {
    case 'build':
        config = merge(common, {});
    break;
    default:
        config = merge(common, {});
}


// module.exports = config;
module.exports = validate(config);
