import { User } from "../user/userTypes";

export interface Book {

    _id: string,
    title: string,
    author: User,
    genre: string,
    coverImage: string,
    file: string,
    createAt: Date,
    updatedAt: Date,
    description: string
}