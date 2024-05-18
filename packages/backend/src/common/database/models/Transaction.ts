import { Sequelize, Model, DataTypes } from 'sequelize';
import {sequelize} from '../index';

import Farmer from './Farmer';
import Product from './Product';
import Order from './Order';

enum TransactionType {
    Purchase = 'Purchase',
    Refund = 'Refund',
  }

interface TransactionAttributes {
  id: number;
  orderId: number;
  farmerId: number;
  productId: number;
  amount: number;
  type: TransactionType;

}

class Transaction extends Model<TransactionAttributes>
  implements TransactionAttributes {
  public id!: number;
  public orderId!: number;
  public farmerId!: number;
  public productId!: number;
  public amount!: number;
  public type!: TransactionType;

}

Transaction.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    orderId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'order',
        key: 'id',
      },
    },
    farmerId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'farmer',
        key: 'id',
      },
    },
    productId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'product',
        key: 'id',
      },
    },
    amount: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    type: {
      type: DataTypes.ENUM(...Object.values(TransactionType)),
      allowNull: false,
    },
  },
  { sequelize, modelName: 'transactions' }
);


Transaction.belongsTo(Farmer, { foreignKey: 'farmerId' });
Transaction.belongsTo(Product, { foreignKey: 'productId' });
Transaction.belongsTo(Order, { foreignKey: 'orderId' });

export default Transaction;
