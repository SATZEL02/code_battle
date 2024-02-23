export const IostreamContainer = ({ userStdin,handleInputChange,userStdout }) => {
    return (
        <div className="my-2 flex flex-col gap-2">
            <div className="bg-slate-300 text-gray-800 font-bold py-2 px-4 rounded-lg">Input</div>
            <textarea type="text" placeholder="Input Here" className='min-h-32' value={userStdin} onChange={handleInputChange} />
            <div className="bg-slate-300 text-gray-800 font-bold py-2 px-4 rounded-lg">Output</div>
            <textarea className="min-h-32" value={userStdout} readOnly />
        </div>
    )
}