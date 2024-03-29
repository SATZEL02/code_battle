import { useSelector } from "react-redux";
import { useRef, useState, useEffect } from "react";
import { deleteObject, getDownloadURL, getStorage, ref, uploadBytesResumable } from 'firebase/storage';
import { app } from "../firebase.js";
import { updateUserStart, updateUserSuccess, updateUserFailure } from '../redux/user/userSlice.js';
import { deleteUserStart, deleteUserSuccess, deleteUserFailure } from '../redux/user/userSlice.js';
import { signOutUserStart, signOutUserSuccess, signOutUserFailure } from '../redux/user/userSlice.js';
import { Link } from 'react-router-dom';

import { useDispatch } from "react-redux";

export default function Profile() {
  const fileRef = useRef(null);
  const { currentUser, loading, error } = useSelector((state) => state.user);
  const [updateSuccess, setUpdateSuccess] = useState(false);
  const [file, setFile] = useState(undefined)
  const [filePerc, setFilePerc] = useState(0);
  const [fileUploadError, setFileUploadError] = useState(null);
  const [formData, setFormData] = useState({});
  const [userProblems, setUserProblems] = useState();
  const [userProblemShown, setUserProblemShown] = useState(false);
  const dispatch = useDispatch();
  const [showProblemsError, setShowProblemsError] = useState(false);
  const [userSubmissions, setUserSubmissions] = useState();
  const [userSubmissionsShown, setUserSubmissionsShown] = useState(false);
  const [showSubmissionsError, setShowSubmissionsError] = useState(false);
  const [imageFileName, setImageFileName] = useState("");
  useEffect(() => {
    const handleFileUpload = (file) => {
      const storage = getStorage(app);
      if (imageFileName !== "") {
        const deleteRef = ref(storage, imageFileName);
        deleteObject(deleteRef).then(() => {
          console.log("File deleted successfully");
        }).catch((error) => {
          console.log(error);
        })
      }
      const fileName = new Date().getTime() + file.name;
      setImageFileName(fileName);
      const storageRef = ref(storage, fileName);
      const uploadTask = uploadBytesResumable(storageRef, file);
      uploadTask.on('state_changed',
        (snapshot) => {
          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          setFilePerc(Math.round(progress));

        },
        (error) => {
          setFileUploadError(error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then(
            (downloadURL) => {
              setFormData({ ...formData, avatar: downloadURL });
              setFileUploadError(null);
            })
        }
      )
    }
    if (file) {
      handleFileUpload(file);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [file])

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(updateUserStart());
      const res = await fetch(`/api/user/update/${currentUser._id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success === false) {
        dispatch(updateUserFailure(data.message));
        return;
      }
      dispatch(updateUserSuccess(data));
      setUpdateSuccess(true);
    } catch (error) {
      dispatch(updateUserFailure(error.message));
    }
  }

  const handleDeleteUser = async () => {
    try {
      dispatch(deleteUserStart());
      const res = await fetch(`/api/user/delete/${currentUser._id}`, {
        method: 'DELETE',
      });
      const data = res.json();
      if (data.success === false) {
        dispatch(deleteUserFailure(data.message));
        return;
      }
      dispatch(deleteUserSuccess(data));
    } catch (error) {
      dispatch(deleteUserFailure(error.message));
    }
  }

  const handleSignOutUser = async () => {
    try {
      dispatch(signOutUserStart());
      const res = await fetch('api/auth/signout');
      const data = await res.json();
      if (data.success === false) {
        dispatch(signOutUserFailure(data.message));
        return;
      }
      dispatch(signOutUserSuccess(data.message));
    } catch (error) {
      dispatch(signOutUserFailure(error.message));
    }
  }

  const handleShowProblems = async () => {
    try {
      setShowProblemsError(false);
      setUserSubmissionsShown(false)
      setUserProblemShown(!userProblemShown)
      const res = await fetch(`/api/user/problems/${currentUser._id}`);
      const data = await res.json();
      if (data.success === false) {
        setShowProblemsError(true);
        return;
      }
      setUserProblems(data);
      return;
    } catch (error) {
      setShowProblemsError(true);
    }
  }

  const handleShowSubmissions = async () => {
    try {
      setShowSubmissionsError(false);
      setUserProblemShown(false);
      setUserSubmissionsShown(!userSubmissionsShown)
      const res = await fetch(`/api/user/submissions/${currentUser._id}`);
      const data = await res.json();
      if (data.success === false) {
        setShowSubmissionsError(true);
        return;
      }
      setUserSubmissions(data);
      return;
    } catch (error) {
      setShowSubmissionsError(true);
    }
  }

  const handleDeleteProblem = async (problemId) => {
    try {
      const res = await fetch(`/api/problem/deleteproblem/${problemId}`, {
        method: 'DELETE',
      });
      const data = res.json();
      if (data.success === false) {
        console.log(data.message);
        return;
      }
      setUserProblems((prev) => prev.filter((problem) => problem._id !== problemId));
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl font-semibold text-center my-7">
        Profile
      </h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input onChange={(e) => setFile(e.target.files[0])}
          type="file" ref={fileRef} hidden accept="image/*" />
        <img src={formData.avatar || currentUser.avatar} onClick={() => fileRef.current.click()}
          alt="profile" className="rounded-full h-24 w-24 object-cover cursor-pointer self-center mt-2" />
        <p className="text-sm self-center">
          {fileUploadError ?
            (<span className="textt-red-700">Image must me less than 2 Mb.</span>) :
            (filePerc > 0 && filePerc < 100) ? (
              <span className="text-slate-700">{`Uploading ${filePerc}%`}</span>) :
              (filePerc === 100) ? (<span className="text-green-700">Image Successfully Uploaded!</span>) : ""
          }
        </p>
        <input type="text" placeholder="username"
          defaultValue={currentUser.username} onChange={handleChange}
          id="username" className="border p-3 rounded-lg" />
        <input type="email" placeholder="email"
          defaultValue={currentUser.email} onChange={handleChange}
          id="email" className="border p-3 rounded-lg" />
        <input type="password" placeholder="password" id="password"
          onChange={handleChange}
          className="border p-3 rounded-lg" />
        <button disabled={loading} className="bg-slate-700 text-white rounded-lg p-3 uppercase hover:opacity-95 disabled:opacity-80">
          {loading ? 'Loading...' : 'Update'}
        </button>
        <Link to={"/create-problem"} className="bg-blue-700 text-white text-center uppercase rounded-lg p-3 hover:opacity-95">Create Your Own Problem
        </Link>
      </form>

      <div className="flex justify-between mt-5">
        <span onClick={handleDeleteUser} className="text-red-700 cursor-pointer">Delete this Account</span>
        <span onClick={handleSignOutUser} className="text-green-700 cursor-pointer">Sign Out!</span>
      </div>
      <p className="text-red-700 mt-5">{error ? error : ''}</p>
      <p className="text-green-700 mt-5">{updateSuccess ? "User Updated Successfully" : ''}</p>
      <button onClick={handleShowProblems}
        className="text text-green-700 w-full text-1xl">{userProblemShown ? "Hide Created Problems" : "Show Created Problems"}</button>
      <p className="text-red-700 mt-5">{showProblemsError ?
        'Error Showing Problems' : ""}</p>
      <div className="gap-2">
        {userProblemShown && userProblems && userProblems.length > 0 &&
          userProblems.map((problem, index) =>
            <div key={problem._id} className="border rounded-lg p-3 flex justify-between items-center gap-4">
              <Link className="text-slate-600 p-3" to={`/problem/${problem._id}`}>
                <p>{index + 1}</p>
              </Link>
              <Link to={`/problem/${problem._id}`} >
                <p className="text-slate-600 font-semibold hover:underline truncate">{problem.problemName}</p>
              </Link>
              <div className="flex flex-col">
                <button onClick={() => handleDeleteProblem(problem._id)} className="text-red-600 uppercase">Delete</button>
                <Link to={`/update-problem/${problem._id}`}>
                  <button className="text-green-600 uppercase">Edit</button>
                </Link>
              </div>
            </div>
          )
        }
      </div>
      <button onClick={handleShowSubmissions}
        className="text text-green-700 w-full text-1xl">{userSubmissionsShown ? "Hide Submissions" : "Show Submissions"}</button>
      <p className="text-red-700 mt-5">{showSubmissionsError ?
        'Error Showing Submissions' : ""}</p>
      {userSubmissionsShown && userSubmissions && userSubmissions.length > 0 &&
        userSubmissions.map((submission, index) =>
          <div key={submission._id}>
            {submission.verdict === "ACC" ? (
              <Link className="text-slate-700" to={`/problem/${submission.problemId}`}>
                <div className="border rounded-lg p-3 flex justify-between items-center bg-green-300">
                  <p>{index + 1}</p>
                  <p className="text-slate-700 font-semibold hover:underline truncate">{submission.problemName}</p>
                  <p className="text-slate-700 font-semibold hover:underline truncate">{submission.language}</p>
                </div>
              </Link>
            ) : (
              <Link className="text-slate-700" to={`/problem/${submission.problemId}`}>
                <div key={submission._id} className="border rounded-lg p-3 flex justify-between items-center bg-red-300">
                  <p>{index + 1}</p>
                  <p className="text-slate-700 font-semibold hover:underline truncate">{submission.problemName}</p>
                  <p className="text-slate-700 font-semibold hover:underline truncate">{submission.language}</p>
                </div>
              </Link>
            )}
          </div>
        )
      }
    </div>
    // </div>
  )
}