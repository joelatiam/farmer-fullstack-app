import { Request, Response } from 'express';

import Product from '../../../../common/database/models/Product';
import Order from '../../../../common/database/models/Order';
import Farmer from '../../../../common/database/models/Farmer';
import {OrderStatus} from '../../../../common/constants/features';
import { ListQuery } from '../../../../types/api';

async function placeOrder(req: Request, res: Response) {
  const productId = req.params.productId as unknown as number;
  const { quantity } = req.body;
  const farmer = req.farmer as Farmer;
  const { landSize, id: farmerId, walletBalance } = farmer;

  try {
    const product = await Product.findByPk(productId);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    const orderPrice = product.price * quantity

    if(walletBalance < orderPrice){
        return res.status(404).json({ message: `insufficient Wallet Balance: ${walletBalance}, Order Price: ${orderPrice}`})
    }

    const productOrderWeigth = product.weigthInKg * quantity;

    if (product.type === 'Fertilizer' && productOrderWeigth > landSize * 3) {
      return res.status(401).json({ message: 'Fertilizer quantity exceeds limit for your land size' });
    } else if (product.type === 'Seed' && productOrderWeigth > landSize) {
      return res.status(401).json({ message: 'Seed quantity exceeds limit for your land size' });
    }

    const order = await Order.create({
      farmerId,
      productId,
      productUnitPrice: product.price,
      quantity,
      status: OrderStatus.Pending,
    });

    res.status(201).json(order);
  } catch (error: any) {
    console.log(error);
    res.status(500).json({ message: 'Error placing order', error: error.message });
  }
}

async function getAllOrders (req: Request, res: Response) {
    const query = req.query as Partial<ListQuery>;
  
    const { limit, offset, sortOrder, sortBy, status } = query as ListQuery;
    try {
      const modelAttributes = Order.getAttributes();
        const sortColumn = sortBy in modelAttributes ? sortBy : 'id';
      const where = status ? { status } : undefined;
      const orders = await Order.findAll({
        where,
        limit,
        offset,
        order: [[sortColumn, sortOrder]],
        include: [
            { model: Product },{
                model: Farmer,
                attributes: {
                    exclude: ['password']
                }
            },
        ],
      });
      res.json(orders);
    } catch (error: any) {
      res.status(500).json({ message: 'Error fetching orders', error: error.message });
    }
  };

 async function getOrdersByProductId (req: Request, res: Response){
    const query = req.query as Partial<ListQuery>;
    const { productId } = req.params;

    const { limit, offset, sortBy, sortOrder, status } = query as ListQuery;
    
    try { 
    const modelAttributes = Order.getAttributes();
     const sortColumn = sortBy in modelAttributes ? sortBy : 'id';
    const where = status ? { status } : undefined;
      const orders = await Order.findAll({
        where: {productId, ...where},
        limit,
        offset,
        order: [[sortColumn, sortOrder]],
        include: [
            { model: Product },{
                model: Farmer,
                attributes: {
                    exclude: ['password']
                }
            },
        ],
      });
      res.json(orders);
    } catch (error: any) {
      res.status(500).json({ message: 'Error fetching orders', error: error.message });
    }
  };

export default {placeOrder, getAllOrders, getOrdersByProductId};
