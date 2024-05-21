import { Op, QueryTypes } from 'sequelize';
import { sequelize } from '../database';

import Order from '../database/models/Order';
import Farmer from '../database/models/Farmer';
import Transaction from '../database/models/Transaction';
import Product from '../database/models/Product';


export async function validateFarmerOrder  ({orderQuantity, product, farmer}: {orderQuantity: number, product: Product, farmer: Farmer}) {

  const {type: productType} = product;

 const [{weight}]: {weight: string}[]  =  await sequelize.query(`
    SELECT COALESCE(SUM((p."weigthInKg" * o."quantity")), 0) "weight"
    FROM products p
    INNER JOIN orders o ON p.id = o."productId"
    WHERE o.status = 'Approved'
    AND o."farmerId" = $1 AND p.type = $2

  `,
  {
    type: QueryTypes.SELECT,
    bind: [farmer.id, productType],
  },);

  const isFertilizer =  productType === 'Fertilizer';

  const {landSize} = farmer;
  const productsWeight = parseInt(weight);
  const currentOrderWeight = product.weigthInKg * orderQuantity;
  const allProductsWeight = productsWeight + currentOrderWeight;

  const weigthExceeded = isFertilizer ? allProductsWeight > landSize * 3 : allProductsWeight > landSize;
  
  console.log(weight, farmer.id, productType, currentOrderWeight, allProductsWeight, weigthExceeded);

  if (weigthExceeded) {
    throw new Error(`Products Type ${productType} weight : ${productsWeight} + ${currentOrderWeight} exceeds land size limit ${landSize}`);
  }

};
