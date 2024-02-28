import { Link } from "react-router-dom";
import { TiUserOutline } from "react-icons/ti";
export const ProblemItem = ({problem}) =>{
    var imageURL = "https://simpleprogrammer.com/wp-content/uploads/2022/08/Basic-Programming-Interview-Questions.png"
    return(
        <div className="bg-white shadow-md hover:shadow-lg transition-shadow overflow-hidden rounded-lg w-full sm:w-[330px]">
            <Link to ={`/problem/${problem._id}`}>
                <img src={imageURL} alt="problem cover" className="h-[320px] sm:h-[220px] w-full object-cover hover:scale-105 transition-scale duration-300"/>
                <div className="p-3 flex flex-col gap-2 w-full h-full">
                    <div className="flex flex-row justify-between">
                        <p className="text-lg font-semibold text-slate-700 truncate uppercase">{problem.problemName}</p>
                        {problem.difficulty ==="Medium" && <p className="text-md text-yellow-500">{problem.difficulty}</p>}
                        {problem.difficulty ==="Hard" && <p className="text-md text-red-500">{problem.difficulty}</p>}
                        {problem.difficulty ==="Easy" && <p className="text-md text-green-500">{problem.difficulty}</p>}
                    </div>
                    <div className="flex items-center gap-1">
                        <TiUserOutline className="h-5 w-5 text-blue-700"/>
                        <p className="text-sm text-cyan-500 truncate w-full">{problem.author}</p> 
                    </div>
                    <p className="text-sm text-gray-600 line-clamp-2">{problem.description}</p>
                    <p className="text-slate-500 font-semibold mt-2 items-center">{problem.tag}</p>
                </div>
            </Link>
        </div>
    )
}