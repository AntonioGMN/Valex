import { Router } from "express";
import cardsRouter from "./cardsRouters.js";
import paymentRouter from "./patmentsRouter.js";
import rechargeRouter from "./rechargeRouters.js";
import ValidateCompanyApiKey from "../Middlerware/ValidationCompanyApikey.js";


const routers = Router()
routers.use(ValidateCompanyApiKey)
routers.use(cardsRouter)
routers.use(rechargeRouter)
routers.use(paymentRouter)

export default routers;