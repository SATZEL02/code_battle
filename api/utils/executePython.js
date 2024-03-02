import { exec } from "child_process";

export const executePython = async(programFile, inputFile)=>{
    const output =  new Promise((resolve,reject)=>{
        exec(`python3 ${programFile} ${inputFile}`,
        (error,stdout,stderr)=>{
            if(error){
                reject(error);
            }
            if(stderr){
                reject(stderr);
            }
            resolve(stdout);
        });
    });
    return output;
}