import express from 'express';
import productsController from './products.controllers';
import productsValidator from './products.validators';
import orderssController from './orders/orders.controllers';
import ordersValidator from './orders/orders.validators';
import {authenticateFarmer} from '../../middlewares/auth';

const router = express.Router();

router.get('/', productsValidator.getProductsValidation, productsController.getProducts);

router.post('/:productId/orders', ordersValidator.orderValidation, authenticateFarmer, orderssController.placeOrder);


export default router;
