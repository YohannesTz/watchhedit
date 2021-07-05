const Movie = require("../models/Movie");
const { validationResult } = require("express-validator");
const multer = require("multer");
const path = require("path");
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(__dirname, "../../public/img"));
    },
    filename: function (req, file, cb) {
        cb(null, `movie-${Date.now()}-cover${path.extname(file.originalname)}`);
    },
});

const upload = multer({
    storage
});

exports.uploadImage = upload.single("img");

exports.getAllMovies = async (req, res, next) => {
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
        const result = await Movie.paginate({},
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
};

exports.getMovie = async (req, res, next) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            res.status(400).json({
                status: "error",
                message: errors.array()[0].msg,
            });
        }
        const movie = await Movie.findById(req.params.id);
        if (!movie) {
            res.status(404).json({
                status: "error",
                message: "Movie with this ID does not exist",
            });
        }

        res.status(200).json({
            status: "success",
            movie,
        });
    } catch (error) {
        //TODO
        console.log(error);
    }
};

exports.createMovie = async (req, res, next) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            res.status(400).json({
                status: "error",
                message: errors.array()[0].msg,
            });
        }

        const movie = await Movie.create({
            ...req.body,
            cover_image: req.file.filename,
            creator: req.user._id
        });

        res.status(201).json({
            status: "success",
            movie
        });
    } catch (error) {

    }
};

exports.updateMovie = async (req, res, next) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            res.status(400).json({
                status: "error",
                message: errors.array()[0].msg,
            });
        }

        const movie = await Movie.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
        });

        if (!movie) {
            res.status(404).json({
                status: "error",
                message: "Movie with this ID does not exist",
            });
        }

        res.status(200).json({
            status: "success",
            movie
        });
    } catch (error) {

    }
};

exports.deleteMovie = async (req, res, next) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            res.status(400).json({
                status: "error",
                message: errors.array()[0].msg,
            });
        }

        const movie = await Movie.findByIdAndDelete(req.params.id);
        if (!movie) {
            res.status(404).json({
                status: "error",
                message: "Movie with this ID does not exist",
            });
        }

        res.status(204).json({
            status: "success",
            movie: null,
        });
    } catch (error) {

    }
};

exports.searchMovie = async (req, res) => {
    try {
        const regex = new RegExp(req.query.q);
        const movies = await Movie.find({
            firstName: {
                $regex: regex,
                $options: "si",
            },
        });

        res.status(200).json({
            status: "success",
            movies
        });
    } catch (error) {
        res.status(500).json({
            status: "error",
            message: error
        });
    }
};

exports.createMovieList = async (req, res) => {
    try {
        
    } catch (error) {
        
    }
};