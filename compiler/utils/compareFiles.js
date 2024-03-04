import * as fs from "fs";
export const compareFiles = async(file1,file2)=>{
    
    var message = "Failed";
    console.log("comparing files");
    var contents1 = fs.readFileSync(file1,"utf8");
    var contents2 = fs.readFileSync(file2,"utf8");
    contents1 = contents1.replace(/[\r\n]+/gm,"");
    contents2 = contents2.replace(/[\r\n]+/gm,"");
    if(contents1 === contents2)    message = "ACC";
    console.log("Files Compared");
    return message;
}