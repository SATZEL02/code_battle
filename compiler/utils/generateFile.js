import * as fs from "fs";
import path from "path";
import {v4 as uuidv4} from 'uuid';

const __dirname = path.resolve();

export const generateFile = async (code, language) => {
    try{
        const dirCode = path.join(__dirname, "utils/codes");
        if (!fs.existsSync(dirCode)) {
            fs.mkdirSync(dirCode, { recursive: true });
        }
        const jobid = uuidv4();
        var format ="txt";
        if (language === "cpp" || language === "java" || language === "bashrc") format = language;
        else if (language === "python") format = "py";
        const fileName = `${jobid}.${format}`;
        const filePath = path.join(dirCode, fileName);
        fs.writeFileSync(filePath, code);
        return filePath;
    } catch(error){
        console.log(error);
        return "error";
    }
}