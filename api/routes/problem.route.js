import express from 'express';
import {test,createProblem} from "../controllers/problem.controller.js";
import { verifyToken } from '../utils/verifyUser.js';


const router = express.Router();

router.post("/createproblem",verifyToken, createProblem);
router.get("/test",test);

export default router;