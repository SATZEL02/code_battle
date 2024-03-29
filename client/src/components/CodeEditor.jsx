import { useRef, useState } from 'react';
import Editor from '@monaco-editor/react';
import { LanguageSelector } from './LanguageSelector';
import { IostreamContainer } from './IostreamContainer';
import { CODE_SNIPPETS } from "../assets/languagesSupported";

export const CodeEditor = ({problemData,user}) => {
    const [code,setCode] = useState(CODE_SNIPPETS['cpp']);
    const [language,setLanguage] = useState('cpp');
    const [userStdin, setUserStdin] = useState("");
    const [userStdout, setUserStdout] = useState("Run Your Code to Check Output");
    const [compiling,setCompiling] = useState(false); 
    const editorRef = useRef();
    const onMount =(editor)=>{
        editorRef.current = editor;
        editor.focus();
    }

    const onLanguageSelect=(Language)=>{
        setLanguage(Language);
        setCode(
            CODE_SNIPPETS[Language]
        );
    }
    const handleInputChange = (e)=>{
        setUserStdin(e.target.value);
    }
    const handleRun =async()=>{
        try{
            setCompiling(true);
            setUserStdout("Compiling");
            const res = await fetch('/compiler/code/run',{
                method: 'POST',
                headers:{
                'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    code:code,
                    stdin:userStdin,
                    language:language,
                    testInput:problemData.finalInput,
                    testOutput:problemData.finalOutput
                }),
            });
            const data = await res.json();
            setCompiling(false);
            setUserStdout(data);
        } catch(error){
            setUserStdout(error);
        }
    }

    const handleSubmit = async()=>{
        try{
            setCompiling(true);
            setUserStdout("Compiling");
            const res = await fetch('/compiler/code/submit',{
                method: 'POST',
                headers:{
                'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    code:code,
                    language:language,
                    testInput:problemData.finalInput,
                    testOutput:problemData.finalOutput
                }),
            });
            const data = await res.json();
            var verdict ="";
            if(data.message==="ACC")  verdict = "ACC";
            else    verdict = "Failed";
            await fetch('/api/code/submission',{
                method:'POST',
                headers:{
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    code:code,
                    verdict:verdict,
                    userId: user,
                    problemId:problemData._id,
                    language:language,
                    problemName:problemData.problemName
                }),
            });
            setCompiling(false);
            setUserStdout(data.message);
        } catch(error){
            setUserStdout(error);
        }
    }

    return (
        <div>
        <LanguageSelector Language={language} onLanguageSelect={onLanguageSelect}/>
        <Editor 
            height="55vh" 
            theme="vs-dark" 
            language={language}
            value={code}
            onMount={onMount}
            onChange={(value)=>setCode(value)}
        />
        <IostreamContainer userStdin={userStdin} handleInputChange={handleInputChange} userStdout={userStdout}/>
        <div className="inline-flex">
                <button className="text-white bg-green-700 hover:bg-green-800 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700  uppercase disabled:opacity-75"  onClick={handleRun}>Run</button>
                <button className="text-white bg-red-700 hover:bg-red-800 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:hover:bg-red-700 dark:bg-red-600 uppercase " disabled={compiling} onClick={handleSubmit}>Submit</button>
            </div>
        </div>
    ); 
}