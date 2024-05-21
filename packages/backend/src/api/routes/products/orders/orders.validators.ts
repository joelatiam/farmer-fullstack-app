import { celebrate, Joi, Segments } from 'celebrate';

const orderValidation = celebrate({
  [Segments.PARAMS]: {
    productId: Joi.number().positive().required()
    },
  [Segments.BODY]: {
    email: Joi.string().email().required(),
    password: Joi.string().required(),
    quantity: Joi.number().min(1).required()
  }
},{
    convert: true,
});

const updateOrderValidation = celebrate({
  params: Joi.object({
    orderId: Joi.number().required(),
  }),
  body: Joi.object({
    status: Joi.string().valid('Approved', 'Rejected').required(),
    password: Joi.string().required(),
  }),
});

export default {
    orderValidation,
    updateOrderValidation,
}
