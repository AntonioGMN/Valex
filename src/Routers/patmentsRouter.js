import { Router } from "express";
import validateSchema from "../Middlerware/validateSchema.js";
import rechargeSchema from "../Schema/rechargeSchema.js";

const paymentRouter = Router();
paymentRouter.post("/payment");

export default paymentRouter;
