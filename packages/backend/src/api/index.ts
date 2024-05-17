import { Router } from 'express';

import farmers from './farmers/farmers.routes';
import products from './products/products.routes';

const router = Router();

router.use('/farmers', farmers);
router.use('/products', products);

export default router;


