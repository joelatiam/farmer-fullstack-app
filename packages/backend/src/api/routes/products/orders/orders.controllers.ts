import { Request, Response } from 'express';

import Product from '../../../../common/database/models/Product';
import Order from '../../../../common/database/models/Order';
import Farmer from '../../../../common/database/models/Farmer';
import Transaction from '../../../../common/database/models/Transaction';
import {OrderStatus, TransactionType} from '../../../../common/constants/features';
import { ListQuery } from '../../../../types/api';
import {validateFarmerOrder} from '../../../../common/helpers/orders';

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

    try {
      await validateFarmerOrder({orderQuantity: quantity,product, farmer});
    } catch (error: any) {
      return res.status(400).json({ message: error.message });
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

async function approveOrRejectOrder (req: Request, res: Response) {
  const { orderId } = req.params;
  const { status, password } = req.body;

  const adminPassword = process.env.ADMIN_PASSWORD

  if (password !== adminPassword) {
    return res.status(403).json({ message: 'Wrong credentials' });
  }

  try {
    const order = await Order.findOne({
      where: {
        id: orderId,
        status: OrderStatus.Pending,
      },
      include: [{ model: Farmer, required: true, attributes:{exclude: ['password']} }, { model: Product, required: true }],
    });

    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    let transaction;

    if (status === 'Approved') {
      const farmer = order.farmer!;
      const product = order.product!;

      const totalCost = order.productUnitPrice * order.quantity;

      if (farmer.walletBalance < totalCost) {
        return res.status(400).json({ message: `insufficient Wallet Balance: ${farmer.walletBalance}, Order Price: ${totalCost}` });
      }

      try {
        await validateFarmerOrder({orderQuantity: order.quantity, product, farmer});
      } catch (error: any) {
        return res.status(400).json({ message: error.message });
      }

      await farmer.decrement({walletBalance: totalCost});

      transaction = await Transaction.create({
        orderId: order.id,
        farmerId: farmer.id,
        productId: product.id,
        amount: totalCost,
        type: TransactionType.Purchase,
      });
    }

    order.status = status;
    await order.save();



    res.status(200).json({ message: 'Order status updated successfully', data: {order, transaction} });
  } catch (error: any) {
    res.status(500).json({ message: 'Error updating order status', error: error.message });
  }
};

export default {placeOrder, getAllOrders, getOrdersByProductId, approveOrRejectOrder};
