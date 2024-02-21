import { useEffect,useState} from "react";
import { useNavigate,useParams } from "react-router-dom";
import { useSelector } from "react-redux";

export default function ProblemPage(){
    const { currentUser } = useSelector((state) => state.user)
    const [tagShown, setTagShown] = useState(false);
    const [problemData, setProblemData] = useState({
        problemName: "",
        description: "",
        input_description: "",
        output_description: "",
        example_input: "",
        example_output: "",
        tag: "Array",
        difficulty: "Easy",
        author: currentUser.username,
        finalInput: "",
        finalOutput: "",
        userRef: currentUser._id
    });
    const params = useParams();
    const navigate = useNavigate();
    const problemId = params.problemId;
    useEffect(() =>{
        const fetchProblemData = async() =>{
            const res = await fetch(`/api/problem/getproblem/${problemId}`);
            const data = await res.json();
            if(data.success === false){
                console.log(data.message);
                navigate('/');
                return;
            }
            setProblemData({...problemData,...data});
        }
        fetchProblemData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[problemId]);
    return(
        <main className="flex flex-col sm:flex-row">
                <div className="flex flex-col flex-1 gap-4 my-7 p-3">
                    <div className="flex flex-row items-start justify-between">
                        <h1 className="text-2xl text-slate-700 font-semibold uppercase">{problemData.problemName}
                        </h1>
                        <h3 className="text-slate-500"> ~{problemData.author}</h3>
                    </div>
                    { problemData.difficulty === "Hard" &&
                        <span className="text-red-700 ">{problemData.difficulty}</span>
                    }
                    { problemData.difficulty === "Medium" &&
                        <span className="text-yellow-500 ">{problemData.difficulty}</span>
                    }
                    { problemData.difficulty === "Easy" &&
                        <span className="text-green-700 ">{problemData.difficulty}</span>
                    }
                    <p className="text-lg text-slate-500">{problemData.description}</p>
                    <p className="text-xl text-slate-700">Input And Constraints</p>
                    <p className="text-lg text-slate-500">{problemData.input_description}</p>
                    <p className="text-xl text-slate-700">Output Structure</p>
                    <p className="text-lg text-slate-500">{problemData.output_description}</p>
                    <p className="text-xl text-slate-700">Sample Input</p>
                    <p className="text-lg text-slate-500">{problemData.example_input}</p>
                    <p className="text-xl text-slate-700">Sample Output</p>
                    <p className="text-lg text-slate-500">{problemData.example_output}</p>
                    {   !tagShown && 
                    <button className="text-red-700 items-start" onClick={()=>(setTagShown(!tagShown))}>Show related tag</button>
                    }
                    {   tagShown && 
                    <button className="text-green-700 items-start" onClick={()=>(setTagShown(!tagShown))}>Hide related tag</button>
                    }
                    {
                        tagShown &&
                        <span className="text-slate-500">{problemData.tag}</span>
                    }
                </div>
                <div className="flex flex-col flex-1 justify-normal">
                    <h1 className="font-semibold my-7">Editor</h1>
                </div>
        </main>
    )
}