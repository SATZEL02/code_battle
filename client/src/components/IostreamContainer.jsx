import { useState } from "react"

export const IostreamContainer = ()=>{
    const [inputShown,setInputShown] = useState(false);
    {return(
        <div className="my-2">
            <div className="inline-flex gap-2">
                <button onClick ={()=>setInputShown(!inputShown)} className="bg-slate-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-l">Input</button>        
                <button onClick ={()=>setInputShown(!inputShown)} className="bg-slate-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-l">Output</button>
            </div>
        {inputShown ? (<div>Input</div>):(<div>Output</div>)}
        </div>
        
    )}
}