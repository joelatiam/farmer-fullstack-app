import { Sequelize, Model, DataTypes } from 'sequelize';
import {sequelize} from '../index';

enum ProductType {
  Fertilizer = 'Fertilizer',
  Seed = 'Seed',
}

interface ProductAttributes {
  id: number;
  name: string;
  type: ProductType;
  price: number;
  weigthInKg: number;
}

class Product extends Model<ProductAttributes> implements ProductAttributes {
  public id!: number;
  public name!: string;
  public type!: ProductType;
  public price!: number;
  public weigthInKg!: number;

}

Product.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    type: {
      type: DataTypes.ENUM(...Object.values(ProductType)),
      allowNull: false,
    },
    price: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
      validate: {
        min: 0.01,
      },
    },
    weigthInKg: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
      validate: {
        min: 0.01,
      },
    },
  },
  { sequelize, modelName: 'products' }
);

export default Product;
