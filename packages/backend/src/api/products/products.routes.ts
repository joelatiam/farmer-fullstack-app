import express from 'express';
import { getProducts } from './products.controllers';
import { getProductsValidation } from './products.validators';

const router = express.Router();

router.get('/', getProductsValidation, getProducts);

export default router;
