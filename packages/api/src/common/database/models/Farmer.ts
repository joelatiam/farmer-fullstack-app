import { Sequelize, Model, DataTypes } from 'sequelize';
import {sequelize} from '../index';

interface FarmerAttributes {
  id: number;
  name: string;
  landSize: number;
  email: string;
  password: string;
  walletBalance: number;
}

class Farmer extends Model<FarmerAttributes> implements FarmerAttributes {
  public id!: number;
  public name!: string;
  public landSize!: number;
  public email!: string;
  public password!: string;
  public walletBalance!: number;

}

Farmer.init(
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
      landSize: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          isEmail: true,
        },
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      walletBalance: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
        defaultValue: 0,
      },
    },
    { sequelize, modelName: 'farmers' }
  );

export default Farmer;
