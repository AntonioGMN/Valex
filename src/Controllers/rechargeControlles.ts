import { Request, Response } from 'express';
import * as rechargeServivices from "../Services/rechargeServices.js"

export async function recharge(req: Request, res: Response) {
  const {number, cardholderName, expirationDate,cvc, amount} = req.body
  console.log(req.body)

  await rechargeServivices.recharge(number, cardholderName, expirationDate,cvc, amount)
  
  res.sendStatus(200)
}