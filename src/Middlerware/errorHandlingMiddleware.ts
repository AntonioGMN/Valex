import { Request, Response, NextFunction } from 'express';


export default function errorHandlingMiddleware(error, req: Request, res: Response, next:NextFunction) {
	if (error.type === "error_not_found") return res.sendStatus(404);
	if (error.type === "Conflict") return res.status(409).send(error.message);

	return res.sendStatus(500);
}