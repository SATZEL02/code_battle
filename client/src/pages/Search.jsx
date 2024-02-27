import { useEffect, useState } from 'react';
import {useNavigate} from 'react-router-dom';

export default function Search() {
    const navigate = useNavigate();
    const [sidebarData,setSidebarData] = useState({
        searchTerm:"",
        Easy:false,
        Medium:false,
        Hard:false,
        Array:false,
        String:false,
        Searching:false,
        Other:false,
        order:"desc"
    });
    const [loading,setLoading] = useState(false);
    const [problems,setProblems] = useState([]);
    useEffect(()=>{
        const urlParams = new URLSearchParams(location.search);
        const searchTermFromURL = urlParams.get('searchTerm');
        const sortFromURL = urlParams.get('sort');
        const orderFromURL = urlParams.get('order');
        const difficultystring = urlParams.get('difficulty');
        const tagstring = urlParams.get('tag');
        let difficulty = [],tag=[];
        if(difficultystring)    difficulty = difficultystring.split(',');
        if(tagstring)   tag = tagstring.split(',');
        let Easy=false,Medium=false,Hard=false,array=false,string=false,Searching=false,Other=false;
        for(let i = 0;i<difficulty.length;i++){
            if(difficulty[i]==='Easy') {Easy=true;}
            if(difficulty[i]==='Medium') {Medium=true;}
            if(difficulty[i]==='Hard') {Hard=true;}
        }
        for(let i = 0;i<tag.length;i++){
            if(tag[i]==='Array') {array=true;}
            if(tag[i]==='String') {string=true;}
            if(tag[i]==='Searching') {Searching=true;}
            if(tag[i]==='Other'){Other=true;}
        }
        if(searchTermFromURL || sortFromURL || orderFromURL || difficulty || tag){
            setSidebarData({
                ...sidebarData,
                searchTerm:searchTermFromURL || "",
                sort:sortFromURL || "createdAt",
                order:orderFromURL || "desc",
                Easy:Easy ,
                Medium:Medium,
                Hard:Hard,
                Array:array,
                String:string,
                Searching:Searching,
                Other:Other
            });
        }
        const fetchProblems = async()=>{
            setLoading(true);
            const searchQuery = urlParams.toString();
            const res = await fetch(`/api/problem/get?${searchQuery}`);
            const data = await res.json();
            setProblems(data);
            setLoading(false);
        } 
        fetchProblems();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[location.search]);
    const handleChange = (e)=>{
        if(e.target.id==='searchTerm'){
            setSidebarData({...sidebarData,searchTerm:e.target.value})
        }
        if(e.target.id==='sort_order'){
            const order = e.target.value || "desc";
            setSidebarData({...sidebarData,order});
        }
        if(e.target.id==='Easy' || e.target.id==='Medium' || e.target.id==='Hard'){
            setSidebarData({...sidebarData,[e.target.id]:e.target.checked || e.target.checked==='true'? true:false});
        }
        if(e.target.id==='Array' || e.target.id==='String' || e.target.id==='Searching' || e.target.id==='Other'){
            setSidebarData({...sidebarData,[e.target.id]:e.target.checked || e.target.checked==='true'? true:false});
        }
    };
    const handleSubmit = async(e)=>{
        e.preventDefault();
        const urlParams = new URLSearchParams();
        let difficulty = [];
        if(sidebarData.Easy) difficulty.push('Easy');
        if(sidebarData.Medium) difficulty.push('Medium');    
        if(sidebarData.Hard) difficulty.push('Hard');    
        let tag = [];
        if(sidebarData.Array)   tag.push('Array');
        if(sidebarData.String)   tag.push("String");
        if(sidebarData.Searching)   tag.push("Searching");
        if(sidebarData.Other)   tag.push("Other");
        urlParams.set('searchTerm',sidebarData.searchTerm);
        urlParams.set('difficulty',difficulty);
        urlParams.set('tag',tag);
        urlParams.set('order',sidebarData.order);
        const searchQuery=urlParams.toString();
        navigate(`/search?${searchQuery}`);
    }
    return(
        <div className="flex flex-col md:flex-row">
            <div className="p-7 border-b-2 md:border-r-2 md:min-h-screen ">
                <form onSubmit={handleSubmit} className="flex flex-col gap-8">
                    <div className="flex items-center gap-2 ">
                        <label className="whitespace-nowrap font-semibold">Search Term:</label>
                        <input 
                            type="text" 
                            id="searchTerm"
                            placeholder="Search..."
                            className="border rounded-lg p-3 w-full"
                            value={sidebarData.searchTerm}
                            onChange={handleChange}
                        /> 
                    </div>
                    <div className="flex gap-2 flex-wrap items-center">
                        <label className="font-semibold">Difficulty:</label>
                        <div className="flex gap-2">
                            <input type="checkbox" id='Easy' className="w-5" 
                            onChange={handleChange}
                            checked={sidebarData.Easy}/>
                            <span className="text-green-600">Easy</span>
                        </div>
                        <div className="flex gap-2">
                            <input type="checkbox" id='Medium' className="w-5" 
                            onChange={handleChange}
                            checked={sidebarData.Medium}/>
                            <span className="text-yellow-600">Medium</span>
                        </div>
                        <div className="flex gap-2">
                            <input type="checkbox" id='Hard' className="w-5" 
                            onChange={handleChange}
                            checked={sidebarData.Hard}/>
                            <span className="text-red-600">Hard</span>
                        </div>
                    </div>
                    <div className="flex gap-2 flex-wrap items-center">
                        <label className="font-semibold">Tags:</label>
                        <div className="flex gap-2">
                            <input type="checkbox" id='Array' className="w-5" 
                            onChange={handleChange}
                            checked={sidebarData.Array}/>
                            <span className="text-green-600">Array</span>
                        </div>
                        <div className="flex gap-2">
                            <input type="checkbox" id='String' className="w-5" 
                            onChange={handleChange}
                            checked={sidebarData.String}/>
                            <span className="text-yellow-600">String</span>
                        </div>
                        <div className="flex gap-2">
                            <input type="checkbox" id='Searching' className="w-5" 
                            onChange={handleChange}
                            checked={sidebarData.Searching}/>
                            <span className="text-red-600">Searching</span>
                        </div>
                        <div className="flex gap-2">
                            <input type="checkbox" id='Other' className="w-5" 
                            onChange={handleChange}
                            checked={sidebarData.Other}/>
                            <span className="text-slate-700">Other</span>
                        </div>
                    </div>
                    <div className="flex items-center gap-2">
                        <label className="font-semibold">Sort:</label>
                        <select id="sort_order" className="border rounded-lg p-3" onChange={handleChange} defaultValue="desc">
                            <option value='desc'>Latest</option>
                            <option value='asc'>Oldest</option>
                        </select>
                    </div>
                    <button className="bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95">Search</button>
                </form>
            </div>
            <div className="flex flex-col flex-1">
                <h1 className="text-3xl font-semibold border-b p-3 text-slate-600 mt-5">Problem Results:</h1>
            </div>
        </div>
    )
}