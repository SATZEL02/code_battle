import * as fs from "fs";
import path from "path";
import { exec } from "child_process";
const __dirname = path.resolve();

export const executeCpp = async(programFile, inputFile)=>{
    const outputPath = path.join(__dirname, "utils/output");
    if (!fs.existsSync(outputPath)) {
        fs.mkdirSync(outputPath, { recursive: true });
    }

    const jobId = path.basename(programFile).split(".")[0];
    const execFile = `${jobId}.out`;
    const outPath = path.join(outputPath,execFile);
    const output =  new Promise((resolve,reject)=>{
        exec(`g++ ${programFile} -o ${outPath} && cd ${outputPath} && ./${execFile} < ${inputFile}`,
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