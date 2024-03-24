import { Link } from "react-router-dom";
import { TiUserOutline } from "react-icons/ti";
export const ProblemItem = ({problem}) =>{
    var imageURL = "https://miro.medium.com/v2/resize:fit:1400/0*f2p6gIQ2RepRRCLW.png"
    if(problem.tag ==='String') imageURL = "https://blog.hubspot.com/hubfs/Copy%20of%20Featured%20Image%20Template%20Backgrounds%20%284%29.png";
    if(problem.tag ==='Searching')  imageURL = "https://files.realpython.com/media/How-to-Do-a-Binary-Search-in-Python_Watermarked.e44b17443dd2.jpg";
    if(problem.tag ==='Array') imageURL = "https://www.hubspot.com/hubfs/how-to-start-coding-1.jpg";
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