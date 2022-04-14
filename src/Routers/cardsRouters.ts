import { Router } from "express";
import * as cardsControllers from "../Controllers/cardsControlles.js"
import ValidateCompanyApiKey from "../Middlerware/ValidationCompanyApikey.js";

const cardsRouter = Router()
cardsRouter.post("/cards",ValidateCompanyApiKey, cardsControllers.createCard)

export default cardsRouter;