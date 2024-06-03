import express from "express";
import createHttpError from "http-errors";

import globalerrorhandlers from "./middlewares/globalerrorhandlers";
import userRouter from "./user/user.router";
import bookRouter from "./book/bookrouter"
import { config } from "./config/config";
import cors from 'cors'
import morgan from "morgan"

const app = express();
app.use(
    cors({
        origin: '*',

    })
)
app.use(express.json());
app.use(morgan("dev"))
//routes

app.get('/', (req, res, next) => {
    const error = createHttpError(400, "something went wrong !!!")
    throw error;


    res.json({ message: 'Welcome to Elips api where    i am coding  t learn Api' }



    )

})
app.use("/api/users", userRouter)
app.use("/api/books", bookRouter)

app.use(globalerrorhandlers)


export default app;