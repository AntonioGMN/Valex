import { Request, Response } from 'express';
import { faker } from '@faker-js/faker';
import * as cardsServices from "../Services/cardsServices.js"

export async function createCard(req: Request, res: Response) {
  const {employeeId, cardType} = req.body;

  const card = await cardsServices.createCard(employeeId, cardType)

  res.sendStatus(201)
}

export async function ativateCard(req: Request, res: Response) {
  const {number,cardholderName,expirationDate, cvc, password} = req.body;

  await cardsServices.ativateCard(number, cardholderName, expirationDate, cvc, password )

  res.sendStatus(200)
}