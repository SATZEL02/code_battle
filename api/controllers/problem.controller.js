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

export const updateProblem = async(req, res, next) => {
    const problem = await Problem.findById(req.params.id);
    if(!problem){
        return next(errorHandler(404,"Problem Not Found!"));
    }
    if(req.user.id !== problem.userRef){
        return next(errorHandler(401,"Unauthorized!"));
    }
    try{
        const updatedProblem = await Problem.findByIdAndUpdate(
            req.params.id,
            req.body,
            {new:true},
        );
        res.status(200).json(updatedProblem);
    } catch(error){
        next(error);
    }
}

export const getProblem = async(req, res,next) =>{
    try{
        const problem = await Problem.findById(req.params.id);
        if(!problem){
            return next(errorHandler(404,"Problem Not Found!"));
        }
        res.status(200).json(problem);
    } catch(error){
        next(error);    
    }
}

export const getProblems = async(req, res,next) =>{
    try{
        const limit = parseInt(req.query.limit) || 9;
        const startIndex = parseInt(req.query.limit) || 0;
        let tag = req.query.tag;
        let difficulty = req.query.difficulty;
        console.log(difficulty);
        if(tag ===undefined || tag ==="all"){
            tag = { $in:['Array' , 'String', 'Searching', 'Other']};
        }
        if(difficulty ===undefined || difficulty ==="all"){
            difficulty = { $in:['Easy' , 'Medium', 'Hard']};
        }
        const searchTerm = req.query.searchTerm || '';
        const sort = req.query.sort || "createdAt";
        const order = req.query.order || "desc";

        const problems = await Problem.find({
            problemName: { $regex: searchTerm, $options:'i'},
            tag,
            difficulty
        }).sort(
            {
                [sort]:order
            }
        ).limit(limit).skip(startIndex);

        res.status(200).json(problems);
    } catch(error){
        next(error);    
    }
}