import { Router } from 'express';

import farmers from './farmers/farmers.routes';

const router = Router();

router.use('/farmers', farmers);

export default router;


