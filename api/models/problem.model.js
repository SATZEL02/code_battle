import mongoose from "mongoose";

const problemSchema = new mongoose.Schema({
    problemName:{
        type: String,
        required: true,
        unique: true,
    },
    description:{
        type: String,
        required: true,
    },
    input_description:{
        type: String,
        required: true,
    },
    output_description:{
        type: String,
        required: true,
    },
    author:{
        type: String,
        required: true,
    },
    example_input:{
        type: String,
        required: true,
    },
    example_output:{
        type: String,
        required: true,
    },
    difficulty:{
        type: String,
        required: true,
    },
    tag:{
        type: Array,
        required: true,
    },
    finalInput:{
        type:String,
        required: true,
    },
    finalOutput:{
        type:String,
        required: true,
    },
}, {timestamps: true});

const Problem = mongoose.model('Problem',problemSchema); 

export default Problem;