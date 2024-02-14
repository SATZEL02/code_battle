import express from 'express';
import mongoose from 'mongoose';
import dotenv from "dotenv";
import userRouter from './routes/user.route.js';
import authRouter from './routes/auth.route.js';
import problemRouter from './routes/problem.route.js';
import cors  from 'cors';
import cookieParser from 'cookie-parser';
dotenv.config();

mongoose
    .connect(process.env.MONGODB_URL).then(() => {
        console.log("Connected to MongoDB!");
    })
        .catch((err) => {
            console.error("Error connecting to MongoDB: " + err);
        }
        );


const app = express();
app.use(cors());
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended:true}));
app.listen(3000, () => {
    console.log('listening on port 3000!');
});


app.use("/api/user",userRouter);
app.use("/api/auth",authRouter);
app.use("/api/problem",problemRouter);

app.use((err,req,res,next) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || 'Internal Server Error';
    return res.status(statusCode).json({
        success: false,
        statusCode,
        message,
    });
});