import db from '../queries';
import { Router } from 'express';


const router = new Router({
  mergeParams: true
});

router.get('/', db.getAllProducts);

export default router;
