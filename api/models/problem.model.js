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
    input:{
        type: String,
        required: true,
    },
    output:{
        type: String,
        required: true,
    },
    author:{
        type: String,
        required: true,
    },
    testCase:{
        type: String,
        required: true,
    },
    tags:{
        type: Array,
        required: true,
    }
}, {timestamps: true});

const Problem = mongoose.model('Problem',problemSchema); 

export default Problem;