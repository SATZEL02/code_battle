import Problem from '../models/problem.model.js';

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