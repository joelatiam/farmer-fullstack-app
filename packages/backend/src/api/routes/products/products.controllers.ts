import { Request, Response } from 'express';

import Product from '../../../common/database/models/Product';
import { ListQuery } from '../../../types/routes';

const getProducts = async (req: Request, res: Response): Promise<Response> => {
    const query = req.query as Partial<ListQuery>;
  
    const { limit, offset, sortBy, sortOrder, type } = query as {
    limit: number;
    offset: number;
    sortBy: string;
    sortOrder: string;
    type?: string;
  };

  try {
    const where = type ? { type } : undefined;

    const products = await Product.findAll({
      where,
      limit,
      offset,
      order: [[sortBy, sortOrder]],
    });

    return res.json({ data: products });
  } catch (error: any) {
    console.error(error);
    return res.status(500).send({ message: "Failed to retrieve products", error: error.message });
  }
};

export default {
  getProducts,
}
