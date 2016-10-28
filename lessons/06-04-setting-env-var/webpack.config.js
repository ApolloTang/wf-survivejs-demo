const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const merge = require('webpack-merge');
const validate = require('webpack-validator');

const parts = require('./libs/parts');


const PATHS = {
    app: path.join(__dirname, 'app'),
    build: path.join(__dirname, 'build')
};

const test={
    env : {
        NODE_ENV : 'production'
    }
};

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
switch(process.env.npm_lifecycle_event) {
    case 'build':

        config = merge(
            common,
            {
                //@ Generate separate sourcemap to load when browser required, thus keeping bundle size small
                devtool: 'source-map'
            },

            parts.setFreeVariable( 'test.env.NODE_ENV', 'PRODUCTION'),            //@ test.env.NODE_ENV    will be available in your code with value 'PRODUCTION'
            parts.setFreeVariable( 'test.env.FOO', 'FOO_VALUE'),                  //@ test.env.FOO         will be available in your code with value 'FOO_VALUE'
            parts.setFreeVariable( 'process.env.NODE_ENV', process.env.NODE_ENV), //@ process.env.NODE_ENV will be available in your code with value defined in sh variable NODE_ENV

            parts.minify(),
            parts.setupCSS(PATHS.app)
        );
    break;

    default:
        config = merge(
            common,
            {
                //@ Will generate inline sourcemap for better performance
                devtool: 'eval-source-map'
            },
            parts.setupCSS(PATHS.app),
            parts.devServer({
                //@ Customize host/port here if needed
                host: process.env.HOST,
                port: process.env.PORT
            })
        )
}

module.exports = validate(config);
