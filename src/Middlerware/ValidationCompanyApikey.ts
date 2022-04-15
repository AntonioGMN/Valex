import { Request, Response, NextFunction } from 'express';
import { findByApiKey } from "../Repositories/companyRepository.js";

export default async function ValidateCompanyApiKey(req: Request, res: Response, nest: NextFunction) {
  const apiKey = req.headers['x-api-key'];
  let apiKeyString;
  
  if(apiKey) apiKeyString = req.headers['x-api-key'].toString();
  else throw {
    type: "Unauthorized",
		message: `Header need of a api key company`
  }

  const company = await findByApiKey(apiKeyString);
  if(!company) throw {
    type: "Not Found",
		message: `Could not find specified company!`
  }

  nest();
}