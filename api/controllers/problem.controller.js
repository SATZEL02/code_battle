import Problem from '../models/problem.model.js';
import { errorHandler } from '../utils/error.js';

export const test = (req, res) => {
    res.json({message: 'Test Route'});
};

export const createProblem= async(req,res,next) =>{
    try{
        const problem = await Problem.create(req.body);
        return res.status(200).json({
            success:true,
            problem
        });
    } catch(error){
        next(error);
    }
}

export const deleteProblem = async(req, res, next) => {
    const problem = await Problem.findById(req.params.id);
    if(!problem){
        return next(errorHandler(404,"Problem Not Found!"));
    }
    if(req.user.id !== problem.userRef){
        return next(errorHandler(401,"Unauthorized!"));
    }
    try{
        await Problem.findByIdAndDelete(req.params.id);
        res.status(200).json({message:"Problem Deleted Successfully!"});
    } catch(error){
        next(error);
    }
}