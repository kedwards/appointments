const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
    devServer: {
        contentBase: path.join(__dirname, "public"),
        port: 3000,
        compress: true,
        index: "index.html",
        historyApiFallback: true,
        hotOnly: true,
        open: true,
    },
    entry: ["webpack/hot/dev-server", "./src/index.js"],
    mode: "development",
    module: {
        rules: [
            { test: /\.(jsx?)$/, exclude: /node_modules/, use: "babel-loader" },
            {
                test: /\.s?css$/,
                exclude: /node_modules/,
                use: ["style-loader", "css-loader"],
            },
            {
                test: /\.(png|svg|jpg|gif)$/,
                exclude: /node_modules/,
                use: ["file-loader"],
            },
        ],
    },
    output: {
        path: path.resolve(__dirname, "dist"),
        publicPath: "/",
        filename: "[name].bundle.js",
        chunkFilename: "[id].chunk.js",
        sourceMapFilename: "[name].map",
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new HtmlWebpackPlugin({
            template: path.join(__dirname, "src/index.template.html"),
        }),
    ],
    resolve: { extensions: ["*", ".js", ".jsx", ".css", ".scss"] },
};
