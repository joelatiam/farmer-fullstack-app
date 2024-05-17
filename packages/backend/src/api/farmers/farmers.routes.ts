import { Router } from 'express';
import { signupValidation } from './farmers.validators';
import { signup } from './farmers.controllers';

const router = Router();

router.post('/signup', signupValidation, signup);

export default router;
