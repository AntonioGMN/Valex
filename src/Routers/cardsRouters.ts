import { Router } from "express";
import * as cardsControllers from "../Controllers/cardsControlles.js"
import validateSchema from "../Middlerware/validateSchema.js";
import updateCardSchema from "../Schema/cardsSchemas.js";


const cardsRouter = Router()
cardsRouter.get('/cards/balance', cardsControllers.balance)
cardsRouter.post("/cards", cardsControllers.createCard)
cardsRouter.post("/cards/ativate", 
  validateSchema(updateCardSchema),
  cardsControllers.ativateCard)

export default cardsRouter;