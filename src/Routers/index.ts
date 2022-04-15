import { Router } from "express";
import cardsRouter from "./cardsRouters.js";
import rechargeRouter from "./rechargeRouters.js";

const routers = Router()
routers.use(cardsRouter)
routers.use(rechargeRouter)

export default routers;