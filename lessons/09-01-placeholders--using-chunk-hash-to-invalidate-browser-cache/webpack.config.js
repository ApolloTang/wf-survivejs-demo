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
    //@ Entry accepts a path or an object of entries.
    //@ the latter form given it's convenient with more complex configurations.
    entry: {
        app: PATHS.app,
        // vendor: ['react'] //@ relocate this to case: 'build': parts.extractBundle
    },

    output: {
        path: PATHS.build,

        //@ [name] will be the entry's attribute's keys
        //@ [chunkhash] tracks the content of file, so use it to invalidate browser's cached.
        filename: '[name].[chunkhash].js'
        //filename: '[name].js?[chunkhash]' //@ Invalid browser's cache via query string is less performant, so don't use this

        //@ This is used for require.ensure. (Not sure how this work thou...)
        chunkFilename: '[chunkhash].js'
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

            parts.setFreeVariable( 'test.env.FOO', 'FOO_VALUE'),                  //@ test.env.FOO         will be available in your code with value 'FOO_VALUE'
            parts.setFreeVariable( 'process.env.NODE_ENV', process.env.NODE_ENV), //@ process.env.NODE_ENV will be available in your code with value defined in sh variable NODE_ENV
            //@ execute 'export NODE_ENV=production' in bash shell will have webpack evoked gzip

            //@ use CommonsChunkPlugin
            parts.extractBundle({
                name: 'vendor',
                entries: ['react']
            }),

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

            parts.setFreeVariable( 'test.env.FOO', 'FOO_VALUE'),                  //@ test.env.FOO         will be available in your code with value 'FOO_VALUE'
            parts.setFreeVariable( 'process.env.NODE_ENV', process.env.NODE_ENV), //@ process.env.NODE_ENV will be available in your code with value defined in sh variable NODE_ENV

            parts.setupCSS(PATHS.app),
            parts.devServer({
                //@ Customize host/port here if needed
                host: process.env.HOST,
                port: process.env.PORT
            })
        )
}

module.exports = validate(config);
