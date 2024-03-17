import express from 'express';
import mongoose from 'mongoose';
import dotenv from "dotenv";
import userRouter from './routes/user.route.js';
import authRouter from './routes/auth.route.js';
import problemRouter from './routes/problem.route.js';
import codeRouter from './routes/code.route.js';
import cors  from 'cors';
import cookieParser from 'cookie-parser';
import path from "path";
dotenv.config();

mongoose
    .connect(process.env.MONGODB_URL).then(() => {
        console.log("Connected to MongoDB!");
    })
        .catch((err) => {
            console.error("Error connecting to MongoDB: " + err);
        }
        );


        const __dirname = path.resolve();

const app = express();
const prodOrigins = [
    process.env.ORIGIN_1,
    process.env.ORIGIN_2
  ];
//   const devOrigin = ['http://localhost:5173'];
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
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended:true}));
app.listen(3000, () => {
    console.log('listening on port 3000!');
});

app.get('/',(req,res)=>{
    res.status(200).send({message:"API CONNECTED!"});
})

app.use("/api/user",userRouter);
app.use("/api/auth",authRouter);
app.use("/api/problem",problemRouter);
app.use("/api/code",codeRouter)

// app.use(express.static(path.join(__dirname,'/client/dist')));

// app.get('*', (req,res) =>{
//     res.sendFile(path.join(__dirname,'client','dist','index.html'));
// })

app.use((err,req,res,next) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || 'Internal Server Error';
    return res.status(statusCode).json({
        success: false,
        statusCode,
        message,
    });
});