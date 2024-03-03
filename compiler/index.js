import express from 'express';
import dotenv from "dotenv";
import cors  from 'cors';
import cookieParser from 'cookie-parser';
import codeRouter from './routes/code.route.js';
dotenv.config();

const app = express();
app.use(cors());
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended:true}));

app.listen(8080, (req,res) => {
    console.log('listening on port 8080!');
});


app.use("/compiler/code",codeRouter);

app.use((err,req,res,next) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || 'Internal Server Error';
    return res.status(statusCode).json({
        success: false,
        statusCode,
        message,
    });
});