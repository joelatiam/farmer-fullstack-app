import { celebrate, Joi, Segments } from 'celebrate';

export const getProductsValidation = celebrate({
  [Segments.QUERY]: {
    limit: Joi.number().integer().min(1).max(100).default(5),
    offset: Joi.number().integer().min(0).default(0),
    sortBy: Joi.string().valid('name', 'id', 'price').default('name'),
    sortOrder: Joi.string().valid('ASC', 'DESC').default('ASC'),
    type: Joi.string().valid('Fertilizer', 'Seed')
  },
},{
    convert: true,
  });
