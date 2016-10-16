import Express from 'express';
import bodyParser from 'body-parser';
import expressJWT from 'express-jwt';
import jwt from 'jsonwebtoken';
import api from './api/index';

const app = new Express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(expressJWT({ secret: 'shoehari' })
  .unless({ 
    path: ['/api/login', '/api/products'] 
  }));

app.use('/api', api);



const server = app.listen(1337, () => {
  console.log(`app is running on port ${server.address().port}`)
});



export default app;