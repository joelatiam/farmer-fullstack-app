import { Router } from 'express';

import farmers from './routes/farmers/farmers.routes';
import products from './routes/products/products.routes';

const router = Router();

router.use('/farmers', farmers);
router.use('/products', products);

export default router;


