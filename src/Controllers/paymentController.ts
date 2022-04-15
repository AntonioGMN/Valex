import { Request, Response } from 'express';
import * as paymentServices from "../Services/paymentService.js"

export async function payment(req: Request, res: Response) {
  const {number, cardholderName, expirationDate,cvc,password, businessId, amount} = req.body

  
  await paymentServices.payment(number, cardholderName, expirationDate,cvc, password, businessId, amount)
  
  res.sendStatus(200)
}