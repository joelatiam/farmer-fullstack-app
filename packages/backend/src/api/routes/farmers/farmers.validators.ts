import { Joi, celebrate } from 'celebrate';

export const signupValidation = celebrate({
    body: Joi.object({
        name: Joi.string().required().min(3),
        landSize: Joi.number().positive().required(),
        email: Joi.string().email().required(),
        password: Joi.string().min(5).required(),
        walletBalance: Joi.number().min(0)
      }),
});
