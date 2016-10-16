import express from 'express';
import path from 'path';
import bodyParser from 'body-parser';
import expressJWT from 'express-jwt';
import jwt from 'jsonwebtoken';
import api from './api/index';
import webpack from 'webpack';
import webpackMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
import webpackConfig from '../../webpack.config';

const isDevelopment = process.env.NODE_ENV !== 'production';
const port = isDevelopment ? 1337 : process.env.PORT

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

const jwtMiddleware = expressJWT({ secret: 'shoehari' })
  .unless({ 
    path: ['/api/login', '/api/products'] 
  });

app.use('/api', jwtMiddleware, api);

if (isDevelopment) {
  const compiler = webpack(webpackConfig);
  const middleware = webpackMiddleware(compiler, {
    publicPath: webpackConfig.output.publicPath,
    contentBase: 'src',
    stats: {
      colors: true,
      hash: false,
      timings: true,
      chunks: false,
      chunkModules: false,
      modules: false
    }
  });

  app.use(middleware);
  app.use(webpackHotMiddleware(compiler));
  app.get('*', function response(req, res) {

    res.write(middleware.fileSystem.readFileSync(path.join(__dirname, '/../../dist/index.html')));
    res.end();
  });

} else {
  app.use(express.static(__dirname + '/../../dist'));
  app.get('*', function response(req, res) {
    res.sendFile(path.join(__dirname, '/../../dist/index.html'));
  });
}




app.listen(port, () => {
  console.log(`⚡  Express started on port ${port}`)
});



export default app;