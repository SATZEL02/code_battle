import mongoose from "mongoose";

const submissionSchema = new mongoose.Schema({
    userId:{
        type:String,
        required:true
    },
    problemId:{
        type:String,
        required:true
    },
    verdict:{
        type:String,
        required:true
    },
    code:{
        type:String,
        required:true
    }
},{timestamps:true});

const Submission = mongoose.model('Submission',submissionSchema);

export default Submission;