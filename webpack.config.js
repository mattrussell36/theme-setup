const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const argv = require('minimist')(process.argv.slice(2));

const extractStyles = new ExtractTextPlugin('styles.css');
const extractStylesRTL = new ExtractTextPlugin('styles.rtl.css');
const extractStylesLegacy = new ExtractTextPlugin('styles.legacy.css');
const extractStylesLegacyRTL = new ExtractTextPlugin('styles.legacy.rtl.css');

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

module.exports = () => {
    const theme = argv.theme || 'b';
    console.log(`Using theme: ${theme}`);
    const srcDir = path.join(__dirname, 'src', 'themes', theme);
    const buildDir = path.join(__dirname, 'build', theme);

    return {
        entry: {
            app: path.join(srcDir, 'app.js'),
            'app.legacy': path.join(srcDir, 'app.legacy.js'),
        },
        output: {
            filename: '[name].bundle.js',
            path: buildDir,
            publicPath: buildDir,
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
        plugins: [
            extractStyles,
            extractStylesRTL,
            extractStylesLegacy,
            extractStylesLegacyRTL,
        ],
    };
};
