
//global  error
import { HttpError } from "http-errors";
import { NextFunction, Request, Response } from "express";
import { config } from "../config/config";

const globalerrorhandlers = ((err: HttpError, req: Request, res: Response, next: NextFunction) => {
    const statusCode = err.statusCode || 500;

    return res.json({
        message: err.message,
        errorStack: config.env === 'development' ? err.stack : '',



    })
        .status(statusCode)


})
export default globalerrorhandlers
