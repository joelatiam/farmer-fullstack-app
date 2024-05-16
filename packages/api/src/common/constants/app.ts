import 'dotenv/config';

export const APP_PORT = parseInt(process.env.APP_PORT || '4000');
export const {NODE_ENV = 'development', DATABASE_URL} = process.env;
