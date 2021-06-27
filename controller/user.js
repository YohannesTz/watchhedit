const User = require("../models/User");
const jwt = require("jsonwebtoken");
const { validationResult } = require("express-validator");

const getToken = (id) => {
    console.log("Vars: " + process.env.JWT_SECRET_KEY + ", " + process.env.JWT_SECRET_IN);
    return jwt.sign({ id }, process.env.JWT_SECRET_KEY, {
        expiresIn: process.env.JWT_SECRET_IN,
    });
}

exports.login = async (req, res) => {
    try {
        const errors = validationResult(req);
        console.log("errors: " + errors);
        if (!errors.isEmpty()) {
            console.log("error happened here!");
            res.status(400).json({
                status: "error",
                message: errors.array()[0].msg,
            });
        }

        const user = await User.findOne({ email: req.body.email }).select("password");

        if (!user || !(await user.verifyPassword(req.body.password, user.password))) {
            res.status(401).json({
                status: "error", message: "Invalid email or password"
            });
        } else {
            const token = getToken(user._id);
            res.status(201).json({
                status: "sucess",
                token,
                user,
            });
        }
    } catch (error) {
        res.status(500).json({
            status: "error",
            message: error
        });
    }
}

exports.signup = async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            res.status(400).json({
                status: "error",
                message: errors.array()[0].msg,
            });
        } else {
            const payLoad = {
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                email: req.body.email,
                password: req.body.password,
                movieList: [],
                animeList: []
            }

            const user = await User.create(payLoad);
            const token = getToken(user._id);
            res.status(201).json({
                status: "success",
                token,
                user,
            });
        }
    } catch (error) {
        res.status(500).json({
            status: "error",
            message: error
        });
    }
};

exports.searchUser = async (req, res) => {
    try {
        const regex = new RegExp(req.query.q);
        const users = await User.find({
            firstName: {
                $regex: regex,
                $options: "si",
            },
        });

        res.status(200).json({
            status: "success",
            users
        });
    } catch (error) {
        res.status(500).json({
            status: "error",
            message: error
        });
    }
}