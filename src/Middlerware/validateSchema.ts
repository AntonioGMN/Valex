import updateCardSchema from "../Schema/cardsSchemas.js";

export default function validateUpdateCardSchema(req, res, next) {
  const validation = updateCardSchema.validate(req.body);
 
	if (validation.error) {
		const messageErro = validation.error.details.map((m) => m.message);
		return res.status(422).send(messageErro);
	}

  next();
}