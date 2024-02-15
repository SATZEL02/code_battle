export default function CreateProblem() {
    return (
        <main className="p-3 max-w-4xl mx-auto">
            <h1 className="text-3xl font-semibold text-center my-7">Create A Problem</h1>
            <form className="flex flex-col sm:flex-row gap-4">
                <div className="flex flex-col gap-4 flex-1">
                    <input type="text" placeholder="Enter Problem Name" className="border p-3 rounded-lg" id="name" maxLength='62' minLength="10" required />
                    <textarea type="text" placeholder="Enter Description Here" className="border p-3 rounded-lg" id="description" required />
                    <textarea type="text" placeholder="Input and data constraints" className="border p-3 rounded-lg" id="Please mention the structure of output" required />
                    <textarea type="text" placeholder="Output Structure" className="border p-3 rounded-lg" id="output" required />
                    <textarea type="text" placeholder="Example Input Here" className="border p-3 rounded-lg" id="example_input" required />
                    <textarea type="text" placeholder="Example Output Here" className="border p-3 rounded-lg" id="example_output" required />
                    <div className="flex gap-6 flex-wrap">
                        <div className="flex gap-2">
                            <input type="checkbox" id="tags" className="w-5" />
                            <span>Arrays</span>
                        </div>
                        <div className="flex gap-2">
                            <input type="checkbox" id="tags" className="w-5" />
                            <span>Strings</span>
                        </div>
                        <div className="flex gap-2">
                            <input type="checkbox" id="tags" className="w-5" />
                            <span>Searching</span>
                        </div>
                        <div className="flex gap-2">
                            <input type="checkbox" id="tags" className="w-5" />
                            <span>Other</span>
                        </div>
                    </div>
                </div>
                <div className="flex flex-col flex-1 gap-3">
                    <p className="font-semibold">Input testCase file:</p>
                    <div className="flex gap-4">
                        <input className="p-3 border border-gray-300 rounded w-full" type="file" id='testcase_input' accept='.txt'/>
                        <button className="p-3 text-green-700 border border-green-700 rounded uppercase hover:shadow-lg disabled:opacity-80">Upload</button>
                    </div>
                    <p className="font-semibold">Expected Output testCase file:</p>
                    <div className="flex gap-4">
                        <input className="p-3 border border-gray-300 rounded w-full"  type="file" id='testcase_output' accept='.txt'/>
                    <button className="p-3 text-green-700 border border-green-700 rounded uppercase hover:shadow-lg disabled:opacity-80">Upload</button>
                    </div>
                <button className="p-3 bg-slate-700 text-white rounded-lg uppercase hover:opacity-95 disabled:opacity-80">Create Problem</button>
                </div>
            </form>
        </main>
    )
} 