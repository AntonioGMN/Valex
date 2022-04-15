import { Router } from "express";
import * as cardsControllers from "../Controllers/cardsControlles.js"
import ValidateCompanyApiKey from "../Middlerware/ValidationCompanyApikey.js";
import validateUpdateCardSchema from "../Middlerware/validateSchema.js";

const cardsRouter = Router()
cardsRouter.post("/cards",ValidateCompanyApiKey, cardsControllers.createCard)
cardsRouter.post("/cards/ativate", 
  ValidateCompanyApiKey,
  validateUpdateCardSchema,
  cardsControllers.ativateCard)

export default cardsRouter;