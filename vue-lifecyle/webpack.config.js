module.exports = {
    entry: './src/index.js',
    output: {
        publicPath: 'xuni',
        filename: 'index.js',
    },
    devServer: {
        port: 8989,
        contentBase: 'www',
    },
}
