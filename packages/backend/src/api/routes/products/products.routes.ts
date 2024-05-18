import express from 'express';
import productsController from './products.controllers';
import {getManyItemsValidation} from '../../middlewares/validator';
import orderssController from './orders/orders.controllers';
import ordersValidator from './orders/orders.validators';
import {authenticateFarmer} from '../../middlewares/auth';

const router = express.Router();

router.get('/', getManyItemsValidation, productsController.getProducts);

router
    .route('/:productId/orders')
    .post(ordersValidator.orderValidation, authenticateFarmer, orderssController.placeOrder)
    .get(getManyItemsValidation, orderssController.getOrdersByProductId);

router.get('/orders', getManyItemsValidation, orderssController.getAllOrders);


export default router;
