import { Request, Response, NextFunction } from 'express';


export default function errorHandlingMiddleware(error, req: Request, res: Response, next:NextFunction) {
	if (error.type === "error_not_found") return res.sendStatus(404);

	return res.sendStatus(500);
}