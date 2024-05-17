import { Sequelize, Model, DataTypes } from 'sequelize';

import Farmer from './Farmer';
import Product from './Product';

enum OrderStatus {
    Pending = 'Pending',
    Approved = 'Approved',
    Rejected = 'Rejected',
    Failed = 'Failed',
  }

interface OrderAttributes {
  id: number;
  farmerId: number;
  landSize: number;
  productId: number;
  productUnitPrice: number;
  quantity: number;
  status: OrderStatus;

}

class Order extends Model<OrderAttributes> implements OrderAttributes {
  public id!: number;
  public farmerId!: number;
  public landSize!: number;
  public productId!: number;
  public productUnitPrice!: number;
  public quantity!: number;
  public status!: OrderStatus;

  static initModel(sequelize: Sequelize) {
    Order.init(
      {
        id: {
          type: DataTypes.INTEGER,
          autoIncrement: true,
          primaryKey: true,
        },
        farmerId: {
          type: DataTypes.INTEGER,
          allowNull: false,
          references: {
            model: 'farmer',
            key: 'id',
          },
        },
        landSize: {
          type: DataTypes.DECIMAL(10, 2),
          allowNull: false,
          validate: {
            min: 0,
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
        quantity: {
          type: DataTypes.INTEGER,
          allowNull: false,
          validate: {
            min: 1,
          },
        },
        productUnitPrice: {
          type: DataTypes.DECIMAL(10, 2),
          allowNull: false,
          defaultValue: 0,
        },
        status: {
          type: DataTypes.ENUM(...Object.values(OrderStatus)),
          allowNull: false,
          defaultValue: 'Pending',
        },
      },
      { sequelize, modelName: 'orders' }
    );

    
    Order.belongsTo(Farmer, { foreignKey: 'farmerId' });
    Order.belongsTo(Product, { foreignKey: 'productId' });

  }
}

export default Order;
