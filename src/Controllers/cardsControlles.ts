import { Request, Response } from 'express';
import { faker } from '@faker-js/faker';
import * as cardsServices from "../Services/cardsServices.js"

export async function createCard(req: Request, res: Response) {
  const {employeeId, cardType} = req.body;
  //const card = faker.helpers.createCard();

  const card = await cardsServices.createCard(employeeId, cardType)

  res.send(card)
}