import { Router } from "express";
import cardsRouter from "./cardsRouters.js";

const routers = Router()
routers.use(cardsRouter)

export default routers;