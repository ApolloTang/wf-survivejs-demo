const webpack = require('webpack');

exports.devServer = function(options) {
    return {

        watchOptions: {
              // Delay the rebuild after the first change
              aggregateTimeout: 300,

              //* The setup may be problematic on certain versions of Windows, Ubuntu, and Vagrant.
              //* We can solve this through polling (more resource intensive):
              //*    Poll using interval (in ms, accepts boolean too)
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

            // Parse host and port from env to allow customization.
            //
            // If you use Vagrant or Cloud9, set
            // host: options.host || '0.0.0.0';
            //
            // 0.0.0.0 is available to all network devices
            // unlike default `localhost`.
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
}


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
}
