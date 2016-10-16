import { Router } from 'express';
import products from './products';

const router = new Router({
  mergeParams: true
});

router.get('/login', (req, res) => {
  res.send('test');
});

router.use('/products', products);



export default router;