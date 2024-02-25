import { errorHandler } from "../utils/error.js";
import { generateFile } from "../utils/generateFile.js";
import { executeCpp } from "../utils/executeCpp.js";
import * as https from 'https';
import Submission from '../models/submission.model.js';

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

export const runCode = async (req, res, next) => {
  const code = req.body.code;
  const stdin = req.body.stdin;
  const language = req.body.language;

  try {
    const program = await generateFile(code, language);
    const input = await generateFile(stdin, "txt");
    var output, outPath = "";
    if (language === "cpp") {
      output = await executeCpp(program, input)
    } /*else if(language==="java"){

        } else if(language==="python"){

        }*/
    if (program === "error") {
      throw errorHandler(500, "Error Compiling Code");
    }
    res.status(200).json(output);
  } catch (error) {
    res.status(200).json(error.message);
  }
}

export const submitCode = async (req, res, next) => {
  try {
    const code = req.body.code;
    const language = req.body.language;
    const testInput = await retrieveTextFileFromURL(req.body.testInput);
    const ExpectedOutput = await retrieveTextFileFromURL(req.body.testOutput);
    const program = await generateFile(code, language);
    const input = await generateFile(testInput, "txt");
    var output, outPath = "";
    if (language === "cpp") {
      output = await executeCpp(program, input);
    } /*else if(language==="java"){

    } else if(language==="python"){

    }*/
    if (program === "error") {
      throw errorHandler(500, "Error Compiling Code");
    }
    if (output === ExpectedOutput) {
      res.status(200).json({ message: "Passed" });
      return;
    }
    res.status(200).json({ message: "Failed" });
  } catch (error) {
    res.status(200).json({ message: error.message });
  }
}

export const storeSubmission = async (req, res, next) => {
  const { code, verdict, userId, problemId } = req.body;
  const newSubmission = new Submission({ code, verdict, userId, problemId });
  try {
    await newSubmission.save();
    res.status(201).json({ message: "Submission Successful" });
  } catch (error) {
    next(error);
  }
}