import { useSelector } from "react-redux";
import { useRef, useState, useEffect } from "react";
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from 'firebase/storage';
import { app } from "../firebase.js";
import {updateUserStart, updateUserSuccess, updateUserFailure} from '../redux/user/userSlice.js';
import {deleteUserStart, deleteUserSuccess, deleteUserFailure} from '../redux/user/userSlice.js';
import {signOutUserStart, signOutUserSuccess, signOutUserFailure} from '../redux/user/userSlice.js';
import {Link} from 'react-router-dom';

import { useDispatch } from "react-redux";

export default function Profile() {
  const fileRef = useRef(null);
  const { currentUser,loading,error } = useSelector((state) => state.user);
  const [updateSuccess,setUpdateSuccess] = useState(false);
  const [file,setFile] = useState(undefined)
  const [filePerc, setFilePerc] = useState(0);
  const [fileUploadError,setFileUploadError] = useState(null);
  const [formData,setFormData] = useState({});
  const dispatch = useDispatch();

  useEffect(() => {
    const handleFileUpload = (file) => {
      const storage = getStorage(app);
      const fileName = new Date().getTime() +file.name;
      const storageRef = ref(storage,fileName);
      const uploadTask = uploadBytesResumable(storageRef,file);
      uploadTask.on('state_changed',
      (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes)*100;
        setFilePerc(Math.round(progress));
        
      },
      (error) =>{
        setFileUploadError(error);
      },
      ()=>{
        getDownloadURL(uploadTask.snapshot.ref).then(
          (downloadURL)=>{
            setFormData({ ...formData, avatar: downloadURL});
            setFileUploadError(null);
          })
      }
      )
    }
    if(file){
      handleFileUpload(file);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[file])

  const handleChange = (e) =>{
    setFormData({...formData, [e.target.id]: e.target.value});
  }

  const handleSubmit = async(e) =>{
    e.preventDefault();
    try{
      dispatch(updateUserStart());
      const res = await fetch(`/api/user/update/${currentUser._id}`, {
        method:'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if(data.success===false){
        dispatch(updateUserFailure(data.message));
        return;
      }
      dispatch(updateUserSuccess(data));
      setUpdateSuccess(true);
    } catch (error){
      dispatch(updateUserFailure(error.message));
    }
  }

  const handleDeleteUser = async() =>{
    try{
      dispatch(deleteUserStart());
      const res = await fetch(`/api/user/delete/${currentUser._id}`, {
        method:'DELETE',
      });
      const data = res.json();
      if(data.success === false){
        dispatch(deleteUserFailure(data.message));
        return;
      }
      dispatch(deleteUserSuccess(data));
    } catch(error){
      dispatch(deleteUserFailure(error.message));
    }
  }

  const handleSignOutUser = async() =>{
    try{
      dispatch(signOutUserStart());
      const res = await fetch('api/auth/signout');
      const data = await res.json();
      if(data.success === false){
        dispatch(signOutUserFailure(data.message));
        return;
      }
      dispatch(signOutUserSuccess(data.message));
     } catch(error){
      dispatch(signOutUserFailure(error.message));
    }
  }

  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl font-semibold text-center my-7">
        Profile
      </h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input onChange={(e) => setFile(e.target.files[0])} 
        type="file" ref = {fileRef} hidden accept="image/*" />
        <img src={formData.avatar || currentUser.avatar} onClick = {()=> fileRef.current.click()}
          alt="profile" className="rounded-full h-24 w-24 object-cover cursor-pointer self-center mt-2" />
          <p className="text-sm self-center">
            {fileUploadError ?
              (<span className="textt-red-700">Image must me less than 2 Mb.</span>) :
              (filePerc>0 && filePerc <100) ? (
                <span className="text-slate-700">{`Uploading ${filePerc}%`}</span>) :
              (filePerc ===100) ? (<span className="text-green-700">Image Successfully Uploaded!</span>) : ""
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
          {loading? 'Loading...':'Update'}
        </button>
        <Link to ={"/create-problem"} className="bg-blue-700 text-white text-center uppercase rounded-lg p-3 hover:opacity-95">Create Your Own Problem
        </Link>
      </form>

      <div className="flex justify-between mt-5">
        <span onClick={handleDeleteUser} className="text-red-700 cursor-pointer">Delete this Account</span>
        <span onClick={handleSignOutUser} className="text-green-700 cursor-pointer">Sign Out!</span>
      </div>
      <p className="text-red-700 mt-5">{error ? error :''}</p>
      <p className="text-green-700 mt-5">{updateSuccess ? "User Updated Successfully" :''}</p>
    </div>
  )
}