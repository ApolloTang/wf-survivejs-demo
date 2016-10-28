const webpack = require('webpack');

exports.devServer = function(options) {
    return {

        watchOptions: {
              // Delay the rebuild after the first change
              aggregateTimeout: 300,

              //@ The setup may be problematic on certain versions of Windows, Ubuntu, and Vagrant.
              //@ We can solve this through polling (more resource intensive):
              //@    Poll using interval (in ms, accepts boolean too)
              // poll: 1000
        },

        devServer: {
            // Enable history API fallback so HTML5 History API based
            // routing works. This is a good default that will come
            // in handy in more complicated setups.
            historyApiFallback: true,

            // Unlike the cli flag, this doesn't set
            // HotModuleReplacementPlugin!
            hot: true,
            inline: true,

            // Display only errors to reduce the amount of output.
            stats: 'errors-only',

            //@ Parse host and port from env to allow customization.
            //@
            //@ If you use Vagrant or Cloud9, set
            //host: options.host || '0.0.0.0';
            //@ 0.0.0.0 is available to all network devices
            //@ unlike default `localhost`.
            host: options.host, // Defaults to `localhost`
            port: options.port  // Defaults to 8080
        },

        plugins: [
            // Enable multi-pass compilation for enhanced performance
            // in larger projects. Good default.
            new webpack.HotModuleReplacementPlugin({
                multiStep: true })
        ]
    };
};


exports.minify = function() {
    // You don't have to install any npm module to enable minify
    return {
        plugins: [
            new webpack.optimize.UglifyJsPlugin({
                //@ Don't beautify output (enable for neater output)
                beautify: false,

                //@ Eliminate comments
                comments: false,

                //@ Compression specific options
                compress: {
                    //@ Uglify will output a lot of warnings and they don’t provide value in this case, we’ll be disabling them.
                    //@ However, these warnings can help you to understand how it processes the code.
                    //@ Therefore it may be beneficial to have a peek at the full output every once in a while.
                    warnings: false,

                    //@ Drop `console` statements, will remove all console.log from your code
                    //@ Dropping the console statements can be achieved through Babel too by using the 'babel-plugin-remove-console' plugin.
                    drop_console: false
                },

                //@ Mangling specific options
                //@ Mangling will reduce local function and variable names to a minimum.
                //@ [!] it can rewrite properties, can potentially brack your code
                //@
                //@ Mangling is on by default, because it rewrite properties and break you code, you need to carefully configure it
                mangle: {
                    //@ Don't mangle $
                    except: [
                        '$',

                        //@ avoid mangling the webpack runtime
                        'webpackJsonp'
                    ],

                    //@ Don't care about IE8
                    screw_ie8 : true,

                    //@ Don't mangle function names
                    keep_fnames: true
                }
            })
        ]
    }
    //@ another way to control uglify would be to use the 'uglify-loader'
};


exports.setupCSS = function(paths) {
    return {
        module: {
            loaders: [
                {
                    test: /\.css$/,
                    loaders: ['style', 'css?modules'],
                    include: paths //If include isn’t set, Webpack will traverse all files within the base directory
                } ]
        } };
};


exports.setFreeVariable = function(key, value) {
    const env = {};
    env[key] = JSON.stringify(value);
    return {
        plugins: [
            //@ See example in:
            //@ http://stackoverflow.com/questions/34479372/use-node-env-in-source-code-to-control-build-process-with-webpack
            //@ http://stackoverflow.com/questions/30030031/passing-environment-dependent-variables-in-webpack
            new webpack.DefinePlugin(env)
        ]
    };
}
