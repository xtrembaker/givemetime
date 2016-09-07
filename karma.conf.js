// From https://github.com/dwmkerr/react-es6-starter

var path = require('path')

module.exports = function (config) {
    config.set({
        browsers: ['PhantomJS'],
        files: [
            //  We need to polyfill as PhantomJS doesn't support 'bind'.
            './node_modules/phantomjs-polyfill/bind-polyfill.js',
            './node_modules/phantomjs-polyfill-object-assign/object-assign-polyfill.js',
            './src/**/*.spec.js*',
        ],
        frameworks: ['mocha'],
        preprocessors: {
            './src/**/*.spec.js*': ['webpack'],
            './src/**/*.js*': ['webpack'],
        },
        reporters: ['progress', 'coverage', 'coveralls','verbose', 'junit'],
        singleRun: true,
        webpack: {
            entry: {},
            module: {
                externals: {
                    'jsdom': 'window',
                    'cheerio': 'window',
                    'react/lib/ExecutionEnvironment': true,
                },
                preLoaders: [
                    {
                        test: /\.jsx?$/,
                        exclude: [
                            /node_modules/,
                            /\.spec\.js/,
                        ],
                        loader: 'isparta-instrumenter-loader',
                    },
                ],
                loaders: [
                    {
                        test: /\.jsx?$/,
                        loader: 'babel-loader',
                        include: path.resolve(__dirname, './src'),
                    },
                ],
            },
        },
        webpackMiddleware: {
            stats: 'errors-only',
        },
        coverageReporter: {
            dir: './build/coverage/',
            reporters: [
                { type: 'html', subdir: 'html' },
                { type: 'lcov', subdir: 'lcov' },
            ],
        },
    })
}