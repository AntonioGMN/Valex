export default function validateSchema(schema){
  return ( req, res, next) => {
		const validation = schema.validate(req.body);
		
	  if (validation.error) {
		const messageErro = validation.error.details.map((m) => m.message);
		return res.status(422).send(messageErro);
	  }
		
	  next();	
  }
}