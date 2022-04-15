import { Request, Response, NextFunction } from 'express';
import { findByApiKey } from "../Repositories/companyRepository.js";

export default async function ValidateCompanyApiKey(req: Request, res: Response, nest: NextFunction) {
  const apiKey = req.headers['x-api-key'].toString();
  
  const company = await findByApiKey(apiKey);
  if(!company) throw {
    type: "error_not_found",
		message: `Could not find specified company!`
  }

  nest();
}