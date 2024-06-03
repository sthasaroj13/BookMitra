import express from "express";
import { createBook, getBook, updateBook, getSingleBook, deleteBook, getUserBooks } from "./bookcontroller";
import multer from "multer";
import path from "node:path";
import { authenticate } from "../middlewares/auth";


const bookRouter = express.Router();

//multer 
//file store local  after upload in local then it goes into cloudinary and delete local 
const upload = multer({
    dest: path.resolve(__dirname, '../../public/data/uploads'),
    limits: { fileSize: 10 * 1024 * 1024 } //30MB 30-*1024*1024
})

//routes
bookRouter.post('/', authenticate, upload.fields([
    { name: 'coverImage', maxCount: 1 },
    { name: 'file', maxCount: 1 }
]), createBook)

bookRouter.patch('/:bookId', authenticate, upload.fields([
    { name: 'coverImage', maxCount: 1 },
    { name: 'file', maxCount: 1 }
]), updateBook)

bookRouter.get('/', getBook)
bookRouter.get('/:bookId', getSingleBook)
bookRouter.get('/user/:userId', getUserBooks);
bookRouter.delete('/:bookId', authenticate, deleteBook)



export default bookRouter;