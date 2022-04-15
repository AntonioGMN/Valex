import joi from "joi";

const updateCardSchema = joi.object({
	number: joi.string().required(),
	cardholderName: joi.string().required(),
	expirationDate: joi.string().required(),
  cvc:  joi.string().required(),
  password: joi.string().max(4).required(),
});

export default updateCardSchema;