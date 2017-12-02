/*eslint-disable no-console*/

import webpack from 'webpack';
import colors from 'colors';
import webpackConfig from '../webpack.config.prod';

process.env.NODE_ENV = 'production';

console.log('Generating minified bundle for production for WebPack. This will take a moment ....');

webpack(webpackConfig).run((err, stats) => {
    if(err){
        console.log(err.bold.red);
        return 1;
    }

    const jsonStats = stats.toJson();

    if(jsonStats.hasErrors){
        return jsonStats.errors.map(error => console.log(error.red));
    }

    if(jsonStats.hasWarnings){
        console.log('Webpack generated the following warnings: '.bold.yellow);
        jsonStats.warnings.map(warning => console.log(warning.yellow));
    }

    console.log(`WEbpack stats: ${stats}`);

    console.log('Your app has been compiled in production mode and written to /dist. It is ready to roll'.green);

    return 0;
});
