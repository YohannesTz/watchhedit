const Anime = require("../models/Anime");
const { validationResult } = require("express-validator");
const multer = require("multer");
const path = require("path");
const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, path.join(__dirname, "../../public/img"));
    },
    filename: function(req, file, cb) {
        cb(null, `anime-${Date.now()}-cover${path.extname(file.originalname)}`);
    },
});

const upload = multer({
    storage 
});

exports.uploadImage = upload.single("img");

exports.getAllAnime = async (req, res, next) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()){
            res.status(400).json({
                status: "error",
                message: errors.array()[0].msg,
            });
        }

        const page = req.query.page * 1 || 1;
        const limit = req.query.limit * 1 || 10;
        const result = await Anime.paginate(
            {
                $or: [
                    {
                        creator: { $eq: req.user._id },
                    }
                ],
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
};

exports.getAnime = async (req, res, next) => {
    try {
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            res.status(400).json({
                status: "error",
                message: errors.array()[0],
            });
        }

        const anime = (await Anime.findById(req.params.id));
        if(!anime){
            res.status(404).json({
                status: "error",
                message: "Anime with this ID does not exist",
            });
        }

        res.status(200).json({
            status: "success",
            anime,
        });
    } catch (error) {
        console.log(error);
    }
};

exports.createAnime = async (req, res, next) => {
    try {
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            res.status(400).json({
                status: "error",
                message: errors.array()[0].msg,
            });
        }

        const anime = await Anime.create({
            ...req.body,
            cover_image: req.file.filename,
            creator: req.user._id
        });

        res.status(201).json({
            status: "success",
            anime,
        });
    } catch (error) {
        
    }
};

exports.updateAnime = async (req, res, next) => {
    try {
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            res.status(400).json({
                status: "error",
                message: errors.array()[0].msg,
            });
        }

        const anime = await Anime.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
        }); 
        if (!movie){
            res.status(404).json({
                status: "error",
                message: "Anime with this ID does not exist",
            });
        }

        res.status(200).json({
            status: "sucess",
            anime,
        });
    } catch (error) {
        
    }
};

exports.deleteAnime = async (req, res, next) => {
    try {
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            res.status(400).json({
                status: "error",
                message: errors.array()[0].msg,
            });
        }

        const anime = await Anime.findByIdAndDelete(req.params.id);
        if(!anime){
            res.status(404).json({
                status: "error",
                message: "Anime with this ID does not exist",
            });
        }

        res.status(204).json({
            status: "success",
            anime: null,
        });
    } catch (error) {
        
    }
};