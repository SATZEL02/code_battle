import { useRef, useState } from 'react';
import Editor from '@monaco-editor/react';
import { LanguageSelector } from './LanguageSelector';
import { IostreamContainer } from './IostreamContainer';
import { CODE_SNIPPETS } from "../assets/languagesSupported";

export const CodeEditor = () => {
    const [code,setCode] = useState(CODE_SNIPPETS['cpp']);
    const [language,setLanguage] = useState('cpp');
    const [userStdin, setUserStdin] = useState();
    const [userStdout, setUserStdout] = useState("Run Your Code to Check Output");

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
    const handleRun =()=>{
        const res = "Your Output";
        setUserStdout(res);
    }

    const handleSubmit =()=>{
        setUserStdout("Code Submitted");
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
                <button className="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800 uppercase" onClick={handleRun}>Run</button>
                <button className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900 uppercase" onClick={handleSubmit}>Submit</button>
            </div>
        </div>
    );
}