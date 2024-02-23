import { useRef, useState } from 'react';
import Editor from '@monaco-editor/react';
import { LanguageSelector } from './LanguageSelector';
import { IostreamContainer } from './IostreamContainer';
import { CODE_SNIPPETS } from "../assets/languagesSupported"
// const code_snippets = Object.entries(CODE_SNIPPETS)
export const CodeEditor = () => {
    const [code,setCode] = useState(CODE_SNIPPETS['cpp']);
    const [language,setLanguage] = useState('cpp');

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
        <IostreamContainer />
        </div>
    );
}