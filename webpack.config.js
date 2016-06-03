/* eslint-disable */

//path is a native module that doesnt require to be installed.
var path = require("path");

module.exports =
{
    entry: {
        "js": ["./src/index.jsx"],
        "css": [
            "./node_modules/react-grid-layout/css/styles.css",
            "./node_modules/react-resizable/css/styles.css"
        ]
    },
    target: 'web',
    output: {
        path: path.join(__dirname, "public"),
        publicPath: "/public/",
        filename: "[name].bundle.js",
        chunkFilename: "[id].bundle.js"
    },
    module: {
        loaders: [
            {
                test: /(\.js|\.jsx)$/,
                loader: "babel-loader?presets[]=es2015,presets[]=react,presets[]=stage-1"
            },
            {
                test: /\.css$/,
                loader: "style-loader!css-loader"
            }
        ]
    },
    devServer: {
        proxy: {
            "/graphql": {
                "target": {
                    "host": "localhost",
                    "protocol": 'http:',
                    "port": 3000
                },
                ignorePath: true,
                changeOrigin: true,
                secure: false
            }
        }
    }
};
