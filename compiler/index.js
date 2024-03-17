import express from 'express';
import dotenv from "dotenv";
import cors  from 'cors';
import cookieParser from 'cookie-parser';
import codeRouter from './routes/code.route.js';
dotenv.config();

const app = express();
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended:true}));

app.listen(8080, (req,res) => {
    console.log('listening on port 8080!');
});
const prodOrigins = [
    process.env.ORIGIN_1,
    process.env.ORIGIN_2
  ];
  const allowedOrigins = prodOrigins;
  app.use(
    cors({
      origin: (origin, callback) => {
        if (process.env.NODE_ENV === 'production') {
          if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
          } else {
            callback(new Error(`${origin} not allowed by cors`));
          }
        } else {
          callback(null, true);
        }
      },
      optionsSuccessStatus: 200,
      credentials: true,
      methods: ['GET', 'POST', 'PUT', 'DELETE'],
    }),
  );
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