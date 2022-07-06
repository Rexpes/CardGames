const path = require('path');
const glob = require('glob');

module.exports = {
    mode: "development",
    watch: true,

    entry: {
        maumau: "./typescript/mau-mau.ts"
    },
    output: {
        filename: "[name].js", 
        path:path.resolve(__dirname, "./mau_mau/static/js"),
    },
    resolve: {
        extensions: ['.ts', '.js'],
    }
}