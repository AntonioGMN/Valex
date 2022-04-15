import joi from "joi";

const rechargeSchema = joi.object({
	number: joi.string().required(),
	cardholderName: joi.string().required(),
	expirationDate: joi.string().required(),
  cvc:  joi.string().required(),
  amount: joi.number().min(1).required(),
});

export default rechargeSchema;