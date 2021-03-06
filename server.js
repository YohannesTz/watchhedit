const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan");
const dotenv = require("dotenv");
const app = express();

const userRouter = require("./routes/users");
const movieRouter = require("./routes/movie");
const animeRouter = require("./routes/anime");
const bookRouter = require("./routes/book");
const port = process.env.PORT || 3000;

dotenv.config();

mongoose
    .connect(process.env.DATABASE_STRING, {
        useCreateIndex: true,
        useFindAndModify: true,
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => {
        console.log("Connected to the database successfuly");
    });

if (process.env.NODE_ENV == "development") {
    app.use(morgan("dev"));
}

app.use(express.json());

app.get("/", (req, res) => {
    res.send("Server is running")
});

app.use("/api/v1/users", userRouter);
app.use("/api/v1/movies", movieRouter);
app.use("/api/v1/anime", animeRouter);
app.use("/api/v1/book", bookRouter);

app.use("*", (req, res) => {
    res.status(400).json({
        status: "error",
        message: `The requested url ${req.originalUrl} doesnot exist`,
    });
});

app.listen(port, () => {
    console.log("Server is running at http://localhost:" + port);
});