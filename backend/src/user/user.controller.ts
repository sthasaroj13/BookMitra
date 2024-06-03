import { NextFunction, Request, Response } from "express";
import createHttpError from "http-errors";
import userModel from "./userModel";
import bcrypt from 'bcrypt'
import { sign } from "jsonwebtoken";
import { config } from "../config/config";
import { User } from './userTypes'

//user register
const createUser = async (req: Request, res: Response, next: NextFunction) => {
    const { name, email, password } = req.body;

    //validation
    if (!name || !email || !password) {
        const error = createHttpError(400, "All fields are required")
        return next(error)


    }
    //datbase call
    try {
        const user = await userModel.findOne({ email })
        if (user) {
            const error = createHttpError(400, "user already exists with this email")
            return next(error)

        }
    } catch (error) {
        return next(createHttpError(500, "Error while getting user."))

    }
    //hashing password
    const hashPassword = await bcrypt.hash(password, 10)
    let newUser: User;
    try {

        newUser = await userModel.create({
            name,
            email,
            password: hashPassword
        })
    } catch (error) {
        return next(createHttpError(500, "Error while creating user."))

    }

    //token genertation
    let token: string;
    try {
        token = sign({ sub: newUser._id }, config.jwtSecret as string, { expiresIn: '1d' })

    } catch (error) {
        return next(createHttpError(500, "Error while generating token."))

    }




    res.status(201)
        .json({ accessToken: token });

};

const loginUser = async (req: Request, res: Response, next: NextFunction) => {

    const { email, password } = req.body;
    // console.log(req.body);


    if (!email || !password) {
        return next(createHttpError(400, "All fields are required"))

    }


    const user = await userModel.findOne({ email })
    if (!user) {
        return next(createHttpError(404, "User not found"))

    }

    const isMatch = await bcrypt.compare(password, user.password)
    if (!isMatch) {
        return next(createHttpError(400, "Email or password incorrect"))

    }
    //if match then create new accesstoken
    const token = sign({ sub: user._id }, config.jwtSecret as string, { expiresIn: "1d" })

    res.status(200)
        .json({ message: "login successful", accessToken: token, userId: user._id })
}







export { createUser, loginUser }