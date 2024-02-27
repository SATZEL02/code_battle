export default function Search() {
    return(
        <div className="flex flex-col md:flex-row">
            <div className="p-7 border-b-2 md:border-r-2 md:min-h-screen ">
                <form className="flex flex-col gap-8">
                    <div className="flex items-center gap-2 ">
                        <label className="whitespace-nowrap font-semibold">Search Term:</label>
                        <input 
                            type="text" 
                            id="searchTerm"
                            placeholder="Search..."
                            className="border rounded-lg p-3 w-full"
                        /> 
                    </div>
                    <div className="flex gap-2 flex-wrap items-center">
                        <label className="font-semibold">Difficulty:</label>
                        <div className="flex gap-2">
                            <input type="checkbox" id='all' className="w-5" />
                            <span className="text-slate-700">Any</span>
                        </div>
                        <div className="flex gap-2">
                            <input type="checkbox" id='Easy' className="w-5" />
                            <span className="text-green-600">Easy</span>
                        </div>
                        <div className="flex gap-2">
                            <input type="checkbox" id='Medium' className="w-5" />
                            <span className="text-yellow-600">Medium</span>
                        </div>
                        <div className="flex gap-2">
                            <input type="checkbox" id='Hard' className="w-5" />
                            <span className="text-red-600">Hard</span>
                        </div>
                    </div>
                    <div className="flex gap-2 flex-wrap items-center">
                        <label className="font-semibold">Tags:</label>
                        <div className="flex gap-2">
                            <input type="checkbox" id='Any' className="w-5" />
                            <span className="text-slate-700">Any</span>
                        </div>
                        <div className="flex gap-2">
                            <input type="checkbox" id='Array' className="w-5" />
                            <span className="text-green-600">Array</span>
                        </div>
                        <div className="flex gap-2">
                            <input type="checkbox" id='String' className="w-5" />
                            <span className="text-yellow-600">String</span>
                        </div>
                        <div className="flex gap-2">
                            <input type="checkbox" id='Searching' className="w-5" />
                            <span className="text-red-600">Searching</span>
                        </div>
                    </div>
                    <div className="flex items-center gap-2">
                        <label className="font-semibold">Sort:</label>
                        <select id="sort_order" className="border rounded-lg p-3">
                            <option>Latest</option>
                            <option>Oldest</option>
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