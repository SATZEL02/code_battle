import {useEffect, useState} from 'react';
import {Link} from 'react-router-dom';
import { ProblemItem } from '../components/ProblemItem';
export default function Home(){
    const [arrayProblems,setArrayProblems] = useState([]);
    const [stringProblems,setStringProblems] = useState([]);
    const [searchingProblems,setSearchingProblems] = useState([]);
    useEffect(()=>{
        const fetchArrayProblems = async()=>{
            try{
            const res = await fetch(`/api/problem/get?tag=Array&limit=4`);
            const data = await res.json();
            setArrayProblems(data);
            fetchStringProblems();
            } catch(error){
                console.log(error);
            }
        }
        const fetchStringProblems = async()=>{
            try{
            const res = await fetch(`/api/problem/get?tag=String&limit=4`);
            const data = await res.json();
            setStringProblems(data);
            fetchSearchingProblems();
            } catch(error){
                console.log(error);
            }
        }
        const fetchSearchingProblems = async()=>{
            try{
            const res = await fetch(`/api/problem/get?tag=Searching&limit=4`);
            const data = await res.json();
            setSearchingProblems(data);
            } catch(error){
                console.log(error);
            }
        }
        fetchArrayProblems();
    },[]);
    console.log(arrayProblems);
    console.log(stringProblems);
    console.log(searchingProblems);
  return(
    <div>
        {/*top*/}
        <div className="flex flex-col gap-6 p-28 px-3 max-w-6xl mx-auto">
            <h1 className="text-slate-700 font-bold text-3xl lg:text-6xl">
                Lets get better at <span className="text-slate-500">Problem Solving</span>
                <br/>
                with ease
            </h1>
            <div className="text-gray-400 text-xs sm:text-sm">
                Code Battle Welcomes and admires all the ecstatic coders out there, Let us join you in your journey to be a 
                software developer
                <br/>
                We have a wide range of Problems for you to solve.
            </div>
            <Link to={"/search"} className="text-xs sm:text-sm text-blue-800 font-bold hover:underline">
                Lets get started...
            </Link>
        </div>
        {/*Problems*/}
        <div className='max-w-6xl mx-auto p-3 flex flex-col gap-8 my-10'>
            {arrayProblems && arrayProblems.length>0 &&( 
                <div>
                    <div className='my-3'>
                        <h2 className='text-2xl font-semibold text-slate-600'>Array Problems</h2>
                        <Link className='text-sm text-blue-800 hover:underline' to={"/search?tag=Array"}>
                            Show more Problems
                        </Link>
                    </div>
                    <div className='flex flex-wrap gap-4'>
                    {
                        arrayProblems.map((problem)=>(
                            <ProblemItem key={problem.problemName} problem={problem}/>
                        ))
                    }
                    </div>
                </div>
            )}
            {stringProblems && stringProblems.length>0 &&( 
                <div>
                    <div className='my-3'>
                        <h2 className='text-2xl font-semibold text-slate-600'>String Problems</h2>
                        <Link className='text-sm text-blue-800 hover:underline' to={"/search?tag=String"}>
                            Show more Problems
                        </Link>
                    </div>
                    <div className='flex flex-wrap gap-4'>
                    {
                        stringProblems.map((problem)=>(
                            <ProblemItem key={problem.problemName} problem={problem}/>
                        ))
                    }
                    </div>
                </div>
            )}
            {searchingProblems && searchingProblems.length>0 &&( 
                <div>
                    <div className='my-3'>
                        <h2 className='text-2xl font-semibold text-slate-600'>Searching Problems</h2>
                        <Link className='text-sm text-blue-800 hover:underline' to={"/search?tag=Searching"}>
                            Show more Problems
                        </Link>
                    </div>
                    <div className='flex flex-wrap gap-4'>
                    {
                        searchingProblems.map((problem)=>(
                            <ProblemItem key={problem.problemName} problem={problem}/>
                        ))
                    }
                    </div>
                </div>
            )}
        </div>
    </div>
  )
}