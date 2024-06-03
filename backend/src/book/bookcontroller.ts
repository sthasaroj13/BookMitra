import { NextFunction, Request, Response } from "express";
import cloudinary from "../config/cloudinary";
import path from "node:path";
import fs from "node:fs"
import createHttpError from "http-errors";
import bookModel from "./bookModel";
import { AuthRequest } from "../middlewares/auth";
import mongoose from "mongoose";


const createBook = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { title, genre, description } = req.body
        // console.log('files', req.files);

        const file = req.files as { [filename: string]: Express.Multer.File[] }

        const coverImageMimeType = file.coverImage[0].mimetype.split('/').at(-1)
        const fileName = file.coverImage[0].filename
        const filePath = path.resolve(__dirname, '../../public/data/uploads', fileName)


        const uploadResult = await cloudinary.uploader.upload(filePath, {


            filename_override: fileName,
            folder: "book-covers",
            format: coverImageMimeType,


        })


        const bookFileName = file.file[0].filename;
        const bookFilePath = path.resolve(__dirname, '../../public/data/uploads', bookFileName)

        const bookFileUploadResult = await cloudinary.uploader.upload(bookFilePath, {
            resource_type: 'raw',
            filename_override: bookFileName,
            folder: 'book-pdf',
            format: 'pdf'


        })
        // console.log(bookFileUploadResult);
        // console.log('uploadResult', uploadResult)
        // //@ts-ignore
        // console.log('userId', req.userId);

        // create a newbook in database
        const _req = req as AuthRequest
        const newBook = await bookModel.create({
            title,
            genre,
            description,
            author: _req.userId,
            coverImage: uploadResult.secure_url,
            file: bookFileUploadResult.secure_url,


        })
        // after creating newbook then delete file from uploads folder
        await fs.promises.unlink(filePath)
        await fs.promises.unlink(bookFilePath)

        res.status(201).json({ id: newBook._id, message: "files uploaded successfully" })
    } catch (error) {
        console.error('error', error)

        return next(createHttpError(500, "Error while uploading files"))

    }
}


//for  update 

const updateBook = async (req: Request, res: Response, next: NextFunction) => {
    const { title, genre, description } = req.body

    const bookId = req.params.bookId
    const book = await bookModel.findOne({ _id: bookId })
    if (!book) {
        return next(createHttpError(404, "Book is  not found"))


    }
    //check access the author is same who is requsting 
    const _req = req as AuthRequest
    if (book.author.toString() != _req.userId) {

        return next(createHttpError(403, "You cannnot access to update others  book"))

    }

    // check if images  are exists
    const files = req.files as { [filename: string]: Express.Multer.File[] }

    let completeCoverImage = "";
    if (files.coverImage) {
        const fileName = files.coverImage[0].filename
        const coverMimeType = files.coverImage[0].mimetype.split('/').at(-1)

        //sending file in cloudinary
        const filePath = path.resolve(__dirname, '../../public/data/uploads', fileName)

        completeCoverImage = fileName
        const uploadResult = await cloudinary.uploader.upload(filePath, {

            filename_override: completeCoverImage,
            folder: "book-covers",
            format: coverMimeType,
        })
        completeCoverImage = uploadResult.secure_url;
        await fs.promises.unlink(filePath)

    }

    // for file


    let CompleteFile = "";
    if (files.file) {

        const bookFileName = files.file[0].filename;

        //sending in cloudinary
        const bookFilePath = path.resolve(__dirname, '../../public/data/uploads', bookFileName)
        CompleteFile = bookFileName;
        const uploadResult = await cloudinary.uploader.upload(bookFilePath, {
            resource_type: 'raw',
            filename_override: bookFileName,
            folder: 'book-pdf',
            format: 'pdf'


        })
        CompleteFile = uploadResult.secure_url;
        await fs.promises.unlink(bookFilePath)



    }

    const UpdateBook = await bookModel.findOneAndUpdate({

        _id: bookId,

    },
        {
            title: title,
            genre: genre,
            description: description,
            coverImage: completeCoverImage ? completeCoverImage : book.coverImage,
            file: CompleteFile ? CompleteFile : book.file

        },
        { new: true }
    )
    res.json(UpdateBook)
}
//get file from DB

const getBook = async (req: Request, res: Response, next: NextFunction) => {

    try {
        //adding pagination
        // const page = parseInt(req.query.page as string) || 1;
        // const limit = parseInt(req.query.limit as string) || 3;
        // const skip = (page - 1) * limit;
        // const totalBooks = await bookModel.countDocuments();

        // const book = await bookModel.find().skip(skip).limit(limit);
        // res.json(
        //     {
        //         totalBooks,
        //         book
        //     }
        // )

        const book = await bookModel.find().populate('author', "name")
        res.json(book)
        // console.log("boook", book);

    } catch (error) {
        return next(createHttpError(500, "Error while getting book"))

    }
}

//getsinglebook

const getSingleBook = async (req: Request, res: Response, next: NextFunction) => {
    const bookId = req.params.bookId;
    console.log(bookId);


    // Check if the bookId is a valid MongoDB ObjectId
    if (!mongoose.Types.ObjectId.isValid(bookId)) {
        return next(createHttpError(400, "Invalid Book ID"));
    }

    try {
        const book = await bookModel.findOne({ _id: bookId }).populate("author", "name email");

        if (!book) {
            return next(createHttpError(404, "Book not found"));
        }

        return res.json(book);
    } catch (error) {
        console.error('Error while getting book:', error); // Log the error for debugging purposes
        return next(createHttpError(500, "Error while getting book."));
    }
};
const getUserBooks = async (req: Request, res: Response, next: NextFunction) => {
    const userId = req.params.userId;
    try {
        const UserBooks = await bookModel.find({ author: userId }).sort({ createdAt: -1 });
        console.log(UserBooks);


        if (!UserBooks) {

            return next(createHttpError(404, "Bo books is found for user"))
        }
        return res.json(UserBooks)
    } catch (error) {
        return next(createHttpError(500, "Error while getting book."))
    }

}

const deleteBook = async (req: Request, res: Response, next: NextFunction) => {

    const bookId = req.params.bookId;

    const book = await bookModel.findOne({ _id: bookId })

    if (!book) {
        return next(createHttpError(404, "book is not found"))

    }

    // check access 
    const _req = req as AuthRequest
    if (book.author.toString() != _req.userId) {

        return next(createHttpError(403, "You cannnot access to delete others  book"))

    }

    /// delete from cloudinary

    const coverfileSplits = book.coverImage.split('/')

    const coverImagePublicId = coverfileSplits.at(-2) + "/" + coverfileSplits.at(-1)?.split(".").at(-2)
    // selecting the publicId of coverimage in cloudinary
    console.log(coverImagePublicId);

    const bookfileSplit = book.file.split("/");
    const bookfilePublicId = bookfileSplit.at(-2) + "/" + bookfileSplit.at(-1)

    //selecting the publicid of pdf file in cloudinary
    console.log(bookfilePublicId);

    try {
        await cloudinary.uploader.destroy(coverImagePublicId);
        await cloudinary.uploader.destroy(bookfilePublicId, {
            resource_type: "raw"
        });


        //delete from DB
        await bookModel.deleteOne({ _id: bookId })
        res.status(204)
            .json({ message: "your  have deleted" })
    } catch (error) {
        return next(createHttpError(400, " something error while deleting image or file"))

    }




}
export { createBook, updateBook, getBook, getSingleBook, deleteBook, getUserBooks }