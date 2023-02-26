import joi from 'joi';

const transactionSchema = joi.object({
  userId: joi.string().required(),
  description: joi.string().required(),
  value: joi.number().required(),
  type: joi.string().valid('+', '-').required(),
  transactionId: joi.string()
});

export default transactionSchema;
