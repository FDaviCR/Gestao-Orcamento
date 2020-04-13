const path = require('path');


module.exports = {
    mode: 'development',
    entry: './index.js',
    target: 'node',
    output: {
        filename: 'main.js',
        path: path.join(__dirname, 'dist'),
    },
};
