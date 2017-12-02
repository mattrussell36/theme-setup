const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const argv = require('minimist')(process.argv.slice(2));
const THEMES = require('./config.themes.json');

console.log(process.argv);

const styleConfig = {
    fallback: 'style-loader',
    use: [
        {
            loader: 'css-loader',
        },
        {
            loader: 'sass-loader',
        },
    ],
};

function createConfig (theme) {
    const extractStyles = new ExtractTextPlugin('styles.css');
    const extractStylesRTL = new ExtractTextPlugin('styles.rtl.css');
    const extractStylesLegacy = new ExtractTextPlugin('styles.legacy.css');
    const extractStylesLegacyRTL = new ExtractTextPlugin('styles.legacy.rtl.css');
    
    const plugins = [
        extractStyles,
        extractStylesRTL,
        extractStylesLegacy,
        extractStylesLegacyRTL,
    ];

    const entry = theme.entry.reduce((obj, file) => {
        obj[file] = path.join(__dirname, 'src', 'themes', theme.name, file);
        return obj;
    }, {});

    return {
        entry,
        output: {
            filename: '[name].bundle.js',
            path: path.join(__dirname, 'build', theme.name),
            publicPath: path.join(__dirname, 'build', theme.name),
        },
        module: {
            rules: [
                {
                    test: /\.js$/,
                    use: {
                        loader: 'babel-loader',
                    },
                },
                {
                    test: /styles\.scss$/,
                    use: extractStyles.extract(styleConfig),
                },
                {
                    test: /styles\.rtl\.scss$/,
                    use: extractStylesRTL.extract(styleConfig),
                },
                {
                    test: /styles\.legacy\.scss$/,
                    use: extractStylesLegacy.extract(styleConfig),
                },
                {
                    test: /styles\.legacy\.rtl\.scss$/,
                    use: extractStylesLegacyRTL.extract(styleConfig),
                }
            ],
        },
        plugins: plugins,
    };
}

module.exports = THEMES.map(createConfig);