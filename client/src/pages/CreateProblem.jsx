import { useState } from "react";
import { useSelector } from "react-redux";
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from 'firebase/storage';
import { app } from "../firebase.js";
import { useNavigate } from "react-router-dom";

export default function CreateProblem() {
    const navigate = useNavigate();
    const { currentUser } = useSelector((state) => state.user)
    const [formData, setFormData] = useState({
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
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        if (e.target.type === "file") {
            if (e.target.id === "finalInput") {
                try {
                    const storage = getStorage(app);
                    const fileName = new Date().getTime() + "input";
                    const storageRef = ref(storage, fileName);
                    const uploadTask = uploadBytesResumable(storageRef, e.target.files[0]);

                    uploadTask.on('state_changed',
                        () => {
                            // const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                            // console.log(Math.round(progress));
                        },
                        (error) => {
                            setError(error);
                        },
                        () => {
                            getDownloadURL(uploadTask.snapshot.ref).then(
                                (downloadURL) => {
                                    setFormData({
                                        ...formData,
                                        finalInput: downloadURL
                                    });
                                    setError(null);
                                })
                        }
                    )
                } catch (error) {
                    setError("Error Uploading File");
                    return;
                }
            }
            else if (e.target.id === "finalOutput") {
                try {
                    const storage = getStorage(app);
                    const fileName = new Date().getTime() + "output";
                    const storageRef = ref(storage, fileName);
                    const uploadTask = uploadBytesResumable(storageRef, e.target.files[0]);
                    uploadTask.on('state_changed',
                        () => {
                            // const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                            // console.log(Math.round(progress));
                        },
                        (error) => {
                            setError(error);
                        },
                        () => {
                            getDownloadURL(uploadTask.snapshot.ref).then(
                                (downloadURL) => {
                                    setFormData({
                                        ...formData,
                                        finalOutput: downloadURL
                                    });
                                    setError(null);
                                })
                        }
                    )
                } catch (error) {
                    setError("Error Uploading File");
                    return;
                }
            }
        }
        if (e.target.id === "Array" || e.target.id === "String" || e.target.id === "Searching" || e.target.id === "Other") {
            setFormData({
                ...formData,
                tag: e.target.id
            });
        }
        if (e.target.id === "Difficulty") {
            setFormData({
                ...formData,
                difficulty: e.target.value
            })
        }
        if (e.target.type === "text" || e.target.type === "textarea") {
            setFormData({
                ...formData,
                [e.target.id]: e.target.value
            })
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            setLoading(true);
            setError(false);
            // console.log(formData);
            const res = await fetch('api/problem/createproblem', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData),
            });
            const data = await res.json();
            if (data.success === false) {
                setLoading(false);
                setError(data.message);
                return;
            }
            setLoading(false);
            navigate('/');
        } catch (error) {
            setError(error.message);
            setLoading(false);
        }
    }
    return (
        <main className="p-3 max-w-4xl mx-auto">
            <h1 className="text-3xl font-semibold text-center my-7">Create A Problem</h1>
            <form className="flex flex-col sm:flex-row gap-4" onSubmit={handleSubmit}>
                <div className="flex flex-col gap-4 flex-1">
                    <input type="text" placeholder="Enter Problem Name" className="border p-3 rounded-lg" id="problemName" maxLength='62' minLength="3" required onChange={handleChange} value={formData.name} />
                    <textarea type="text" placeholder="Enter Description Here" className="border p-3 rounded-lg" id="description" required onChange={handleChange} value={formData.description} />
                    <textarea type="text" placeholder="Input and data constraints" className="border p-3 rounded-lg" id="input_description" required onChange={handleChange} value={formData.input_description} />
                    <textarea type="text" placeholder="Output Structure" className="border p-3 rounded-lg" id="output_description" required onChange={handleChange} value={formData.output_description} />
                    <textarea type="text" placeholder="Example Input Here" className="border p-3 rounded-lg" id="example_input" required onChange={handleChange} value={formData.example_input} />
                    <textarea type="text" placeholder="Example Output Here" className="border p-3 rounded-lg" id="example_output" required onChange={handleChange} value={formData.example_output} />
                    <p className="font-semibold">Select Problem Tag</p>
                    <div className="flex gap-6 flex-wrap">
                        <div className="flex gap-2">
                            <input type="checkbox" id="Array" className="w-5" onChange={handleChange} checked={formData.tag === "Array"} />
                            <span>Array</span>
                        </div>
                        <div className="flex gap-2">
                            <input type="checkbox" id="String" className="w-5" onChange={handleChange} checked={formData.tag === "String"} />
                            <span>String</span>
                        </div>
                        <div className="flex gap-2">
                            <input type="checkbox" id="Searching" className="w-5" onChange={handleChange} checked={formData.tag === "Searching"} />
                            <span>Searching</span>
                        </div>
                        <div className="flex gap-2">
                            <input type="checkbox" id="Other" className="w-5" onChange={handleChange} checked={formData.tag === "Other"} />
                            <span>Other</span>
                        </div>
                    </div>
                </div>
                <div className="flex flex-col flex-1 gap-3">
                    <p className="font-semibold">Select Input File</p>
                    <input className="block w-full text-sm text-slate-500
      file:mr-4 file:py-2 file:px-4
      file:rounded-full file:border-0
      file:text-sm file:font-semibold
      file:bg-violet-50 file:text-violet-700
      hover:file:bg-violet-100" type="file" id="finalInput" accept=".txt" required onChange={handleChange} />
                    <p className="font-semibold">Select Output File</p>
                    <input className="block w-full text-sm text-slate-500
      file:mr-4 file:py-2 file:px-4
      file:rounded-full file:border-0
      file:text-sm file:font-semibold
      file:bg-violet-50 file:text-violet-700
      hover:file:bg-violet-100" type="file" id="finalOutput" accept=".txt" required onChange={handleChange} />
                    <p className="font-semibold">Select Problem Difficulty</p>
                    <select className="rounded-lg" value={formData.difficulty} onChange={handleChange} id="Difficulty" >
                        <option key="Easy" value="Easy">Easy</option>
                        <option key="Medium" value="Medium">Medium</option>
                        <option key="Hard" value="Hard">Hard</option>
                    </select>
                    <div></div>
                    <button className="p-3 bg-slate-700 text-white rounded-lg uppercase hover:opacity-95 disabled:opacity-80" disabled={loading}>{loading ? "Creating..." : "Create Problem"}</button>
                    {error && <p className="text-red-700 text-sm">{error}</p>}
                </div>
            </form>
        </main>
    )
} 