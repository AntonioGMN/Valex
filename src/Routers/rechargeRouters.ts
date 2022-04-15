import { Router } from "express";
import * as rechargeControlles from "../Controllers/rechargeControlles.js";
import validateSchema from "../Middlerware/validateSchema.js";
import rechargeSchema from "../Schema/rechargeSchema.js";

const rechargeRouter = Router();
rechargeRouter.post("/recharge", validateSchema(rechargeSchema), rechargeControlles.recharge)

export default rechargeRouter;