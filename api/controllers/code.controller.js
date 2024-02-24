import { errorHandler } from "../utils/error.js";
import {generateFile} from "../utils/generateFile.js";
import {executeCpp} from "../utils/executeCpp.js";

export const runCode = async(req,res,next)=>{
    const code = req.body.code;
    const stdin = req.body.stdin;
    const language = req.body.language;
    try{
        const program = await generateFile(code,language);
        const input = await generateFile(stdin,"txt");
        var output,outPath="";
        if(language==="cpp"){
            output = await executeCpp(program,input)
        } /*else if(language==="java"){

        } else if(language==="python"){

        }*/
     if(program==="error"){
        throw errorHandler(500,"Internal Server Error");
     }
     res.status(200).json(output);
    } catch(error){
        next(error);
    }
}