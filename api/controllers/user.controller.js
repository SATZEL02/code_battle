import bcryptjs from 'bcryptjs';
import User from '../models/user.model.js';
import { errorHandler } from '../utils/error.js'
import Problem from '../models/problem.model.js';

export const test = (req, res) => {
    res.json({message: 'Test Route'});
};


export const updateUser = async(req,res,next) =>{
    if(req.user.id !== req.params.id )  return next(errorHandler(401, 'You can only update your own account!'));
    try{
        if(req.body.password!== undefined)
        {
            if(req.body.password ==="" || req.body.password.match(" ")){
                return next(errorHandler(402, 'Password Cannot have space or be empty!')); 
            }
            req.body.password = bcryptjs.hashSync(req.body.password,10);
        }
        const specialChars = /^[!@#$%^&*() +\-=\[\]{};':"\\|,.<>\/?]*$/;
        if(req.body.username !== undefined){
            if(req.body.username.match(specialChars)){
                return next(errorHandler(402, 'Username Cannot have special Characters!'));
            }
            if(req.body.username===""){
                return next(errorHandler(402, 'Username Cannot be empty!'));
            }
        }
        if(req.body.email !== undefined && req.body.email===""){
            return next(errorHandler(402, 'Email Cannot be empty!'));
        }
        const updatedUser = await User.findByIdAndUpdate(req.params.id,{
            $set:{
                username: req.body.username,
                email: req.body.email,
                password: req.body.password,
                avatar: req.body.avatar,
            }
        },{new:true})
        const {password, ...rest} = updatedUser._doc;

        return res.status(200).json(rest);
    } catch(error){
        next(error);
    }
}

export const deleteUser = async(req, res,next) =>{
    if(req.user.id !== req.params.id )  return next(errorHandler(401, 'You can only delete your own account!'));
    try{
        await User.findByIdAndDelete(req.params.id);
        res.clearCookie("access_token");
        res.status(200).json({message:"User deleted successfully!"});
    } catch(error){
        next(error);
    }
}

export const getUserProblems = async(req, res,next) => {
    if(req.user.id !==req.params.id)    return next(errorHandler(401, 'You can only get your own problems!'));
    try{
        const problems = await Problem.find({userRef:req.params.id})
        res.status(200).json(problems);
    } catch(error){
        next(error);
    }
}

export const submitUserSolution = async(req,res,next) =>{
    if(req.user.id !==req.params.userId)    return next(errorHandler(401, 'You can only submit from your oqn account!'));
    try{
        
        res.status(200).json({"format":req.body.language,
        "code":req.body.code,"input":req.body.inputFile,"output":req.body.outputFile});
    } catch(error){
        next(error);
    }
}