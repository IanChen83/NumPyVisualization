/* eslint-disable no-console */
import path from 'path';
import bodyParser from 'body-parser';
import express from 'express';
import config from './webpack.config';

const NODE_ENV = process.env.NODE_ENV || 'production';

console.log('__dirname: ', __dirname);

const port = process.env.PORT || 3000;

const app = express();

app.use('/dist', express.static(path.join(__dirname, '/public')));

app.use(bodyParser.urlencoded({
    extended: true,
}));
app.use(bodyParser.json());

// Development use
if(process.env.NODE_ENV === 'development') {
    const webpack = require('webpack');
    const compiler = webpack(config);
    app.use(require('webpack-dev-middleware')(compiler, {
        publicPath: config.output.publicPath,
        stats: {
            colors: true,
        },
    }));

    app.use(require('webpack-hot-middleware')(compiler, {
        log: console.log,
        path: '/__webpack_hmr',
        heartbeat: 10 * 1000,
    }));
}


app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(port, (err) => {
    if(err) {
        console.log(err);
        return;
    }

    console.log(`Listening at http://localhost:${port}`);
});
