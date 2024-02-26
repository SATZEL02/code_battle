import express from 'express';
import {test,createProblem,deleteProblem,updateProblem,getProblem,getProblems} from "../controllers/problem.controller.js";
import { verifyToken } from '../utils/verifyUser.js';


const router = express.Router();

router.post("/createproblem",verifyToken, createProblem);
router.delete("/deleteproblem/:id",verifyToken, deleteProblem);
router.get("/test",test);
router.post("/updateproblem/:id",verifyToken, updateProblem);
router.get('/getproblem/:id',getProblem);
router.get("/get",getProblems);

export default router;