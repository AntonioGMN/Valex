import { Request, Response } from 'express';
import { faker } from '@faker-js/faker';
import * as cardsServices from "../Services/cardsServices.js"

export async function createCard(req: Request, res: Response) {
  //const randomCard = faker.helpers.createCard();
  //cardsServices.createCard()

  res.send("toto")
}