const Book = require("../models/Book");
const { validationResult } = require("express-validator");
const multer = require("multer");
const path = require("path");
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(__dirname, "../../public/img"));
    },
    filename: function (req, file, cb) {
        cb(null, `book-${Date.now()}-cover${path.extname(file.originalname)}`);
    },
});

const upload = multer({
    storage
});

exports.uploadImage = upload.single("img");

exports.getAllBooks = async (req, res, next) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            res.status(400).json({
                status: "error",
                message: errors.array()[0].msg,
            });
        }

        const page = req.query.page * 1 || 1;
        const limit = req.query.limit * 1 || 10;
        const result = await Book.paginate(
            {
                $or: [
                    {
                        creator: {
                            $eq: req.user._id
                        }
                    }
                ]
            },
            {
                page,
                limit,
                sort: "-createdAt",
            }
        );

        res.status(200).json({
            status: "success",
            result,
        });

    } catch (error) {
        console.log(error);
    }
}

exports.getBook = async (req, res, next) => {
    try {
        const errors = validationResult(req);
        if(!errors.isEmpty()) {
            res.status(400).json({
                status: "error",
                message: errors.array()[0].msg,
            });
        }

        const book = await Book.findById(req.params.id);
        if(!book) {
            res.status(404).json({
                status: "Error",
                message: "Book with this ID does not exist",
            });
        }

        res.status(200).json({
            status: "success",
            book,
        });
    } catch (error) {
        console.log(error);
    }
};

exports.createBook = async (req, res, next) => {
    try {
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            res.status(400).json({
                status: "error",
                message: errors.array()[0].msg,
            });
        }

        const book = await Book.create({
            ...req.body,
            cover_image: req.file.filename,
            creator: req.user._id,
        });

        res.status(201).json({
            status: "success",
            book
        });
    } catch (error) {
        
    }
}

exports.updateBook = async (req, res, next) => {
    try {
        const errors = validationResult(req);

        if(!errors.isEmpty()) {
            res.status(400).json({
                status: "error",
                message: errors.array()[0].msg,
            });
        }

        const book = await Book.findByIdAndUpdate(req.params.id, req.body, {
            new: true
        });

        if (!book) {
            res.status(404).json({
                status: "error",
                message: "Book with this ID does not exist",
            });
        }

        res.status(200).json({
            status: "success",
            book
        });
    } catch (error) {
        
    }
};

exports.deleteBook = async(req, res, next) => {
    try {
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            res.status(400).json({
                status: "error",
                message: errors.array()[0].msg,
            });
        }

        const book = await Book.findByIdAndDelete(req.params.id);

        if (!book) {
            res.status(404).json({
                status: "error",
                message: "Book with this ID does not exist",
            });
        }

        res.status(204).json({
            status: "success",
            book: null,
        });
    } catch (error) {
        
    }
}