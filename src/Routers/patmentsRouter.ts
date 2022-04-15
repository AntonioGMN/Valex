import { Router } from "express";
import { payment } from "../Controllers/paymentController.js";
import validateSchema from "../Middlerware/validateSchema.js";
import rechargeSchema from "../Schema/rechargeSchema.js";

const paymentRouter = Router();
paymentRouter.post("/payment", payment);

export default paymentRouter;
