import { Sequelize, Options } from 'sequelize';

import {NODE_ENV, DATABASE_URL} from '../constants/app';
import {config} from './config/config'


const sequelizeConfig = config[NODE_ENV as 'development'|'production'];

export const sequelize = new Sequelize(DATABASE_URL as string, sequelizeConfig as Options);

