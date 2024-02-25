import express from 'express';
import {runCode,submitCode,storeSubmission} from "../controllers/code.controller.js";
import { verifyToken } from '../utils/verifyUser.js';

const router = express.Router();

router.post('/run',verifyToken,runCode);
router.post('/submit',verifyToken,submitCode);
router.post('/submission',verifyToken,storeSubmission);

export default router;