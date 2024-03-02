import * as fs from "fs";
import path from "path";
import { exec } from "child_process";
const __dirname = path.resolve();

export const executeJava = async(programFile, inputFile)=>{
    const outputPath = path.join(__dirname, "api/utils/output");
    if (!fs.existsSync(outputPath)) {
        fs.mkdirSync(outputPath, { recursive: true });
    }

    const jobId = path.basename(programFile).split('.')[0];
    const execFile = `${jobId}.java`;
    const outPath = path.join(outputPath,execFile);
    const output =  new Promise((resolve,reject)=>{
        exec(`javac ${programFile} && java ${programFile} < ${inputFile}`,
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