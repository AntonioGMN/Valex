import  express, {json} from "express";
import "express-async-errors";
import cors from 'cors';
import dotenv from "dotenv";
import routers from "./Routers/index.js"
import errorHandlingMiddleware from "./Middlerware/errorHandlingMiddleware.js";
dotenv.config;

const app = express();
app.use(cors())
app.use(json())
app.use(routers)
app.use(errorHandlingMiddleware)

const PORT = process.env.PORT || 4000;
app.listen(PORT, ()=>console.log(`list on ${PORT}`))