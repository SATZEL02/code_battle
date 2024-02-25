import { errorHandler } from "../utils/error.js";
import {generateFile} from "../utils/generateFile.js";
import {executeCpp} from "../utils/executeCpp.js";
import * as https from 'https';

function retrieveTextFileFromURL(downloadURL) {
    return new Promise((resolve, reject) => {
      https.get(downloadURL, response => {
        let data = '';
  
        response.on('data', chunk => {
          data += chunk;
        });
  
        response.on('end', () => {
          resolve(data);
        });
      }).on('error', error => {
        reject(error);
      });
    });
  }

export const runCode = async(req,res,next)=>{
    const code = req.body.code;
    const stdin = req.body.stdin;
    const language = req.body.language;
    const testInput = await  retrieveTextFileFromURL(req.body.testInput);
    console.log(testInput);
    
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