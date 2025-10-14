import React, { useEffect, useState } from 'react'
import { useGlobalContext } from '../context/Context';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { toastWarning } from '../utility/toast';
import { BiDotsVertical, BiX } from 'react-icons/bi';


const ProfileView = () => {

    const { baseURL,user,setUser } = useGlobalContext()
    const [profile, setProfile] = useState(null)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')

    const [showImage,setShowImage] = useState(false)
    const [selectedImage,setSelectedImage] = useState("")


    const [image,setImage] = useState("")

    const navigate = useNavigate()

    const getProfile = async () => {
        try {
            setLoading(true)
            const res = await axios.get(`${baseURL}/api/users/get-profile`, { withCredentials: true });
            if (res.data.success) {
                setProfile(res.data.user)
            }
            setLoading(false)
        } catch (err) {
            setLoading(false)
            if (err.response) {
              if(err.response.status === 401 || err.response.status === 403){
                console.log("You are not authenticated. please login");
                localStorage.removeItem("user")
                setUser(null)
                navigate("/login")
             }
             if (err.response.data.message) {
                 setError(err.response.data.message)
             }
            } else {
                setError("Server is not responding. try again!")
            }
        }
    }

    const handleFileChange = (e) => {
      setImage(e.target.files[0])
    }

    const uploadImage = async (e) => {
        e.preventDefault()
        try {
            if(!image){
              toastWarning("image required!")
            }else{
                 const formData = new FormData()
                 formData.append("image",image)
                 const res = await axios.post(`${baseURL}/api/users/upload-photo`, formData,{ withCredentials: true });
                 if(res.data.success){
                    setProfile(res.data.user)
                 }
            }

        } catch (err) {
            console.log(err);
            
        }
    }

    const handleShowImage = (photo) => {
      setShowImage(true)
      setSelectedImage(photo)
    }

    useEffect(() => {
        if(!user || !user.email){
            navigate("/login")
        }
        getProfile()
    }, [])
    return (
        <div className="min-h-screen bg-gray-100 py-8 px-4">
            <div className="max-w-2xl mx-auto">
                {/* Main Profile Card */}
                <div className="bg-white  rounded-3xl shadow-sm overflow-hidden border border-white/30">
                    {/* Header with Gradient Background */}
                    <div className="bg-gradient-to-r from-purple-500 to-pink-500 pt-8 pb-16 px-6 relative">
                        {/* Decorative Elements */}
                        <div className="absolute top-4 right-4 w-20 h-20 bg-white/10 rounded-full"></div>
                        <div className="absolute bottom-4 left-4 w-12 h-12 bg-white/10 rounded-full"></div>

                        {/* Profile Picture */}
                        <div className="relative z-10 flex justify-center -mb-20">
                            <div className="relative">
                                <img
                                    src={
                                        profile?.profilePicture
                                            ? `${baseURL}/uploads/${profile?.profilePicture}`
                                            : 'default-avatar.jpg'
                                    }
                                    alt="Profile"
                                    className="w-40 h-40 rounded-full object-cover border-4 border-white shadow-2xl transform hover:scale-105 transition-transform duration-300"
                                />
                                <div className="absolute -bottom-2 -right-2 bg-green-500 w-6 h-6 rounded-full border-2 border-white"></div>
                            </div>
                        </div>
                    </div>

                    {/* Profile Content */}
                    <div className="pt-20 px-6 pb-6">
                        {/* Name & Basic Info */}
                        <div className="text-center mb-6">
                            <h1 className="text-3xl font-bold text-gray-800 mb-2">
                                {profile?.fullname}
                                {profile?.age && <span className="text-pink-500 ml-2">, {profile?.age}</span>}
                            </h1>
                            {profile?.location && (
                                <div className="flex items-center justify-center text-gray-600 mb-3">
                                    <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                                    </svg>
                                    {profile?.location}
                                </div>
                            )}
                        </div>

                        {/* Bio Section */}
                        {profile?.bio && (
                            <div className="bg-white/50 rounded-2xl p-6 mb-6 shadow-lg">
                                <h3 className="text-lg font-semibold text-gray-800 mb-3 flex items-center">
                                    <svg className="w-5 h-5 mr-2 text-purple-500" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                                    </svg>
                                    About Me
                                </h3>
                                <p className="text-gray-700 leading-relaxed">{profile?.bio}</p>
                            </div>
                        )}

                        {/* Details Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                            {profile?.gender && (
                                <div className="bg-white/50 rounded-xl p-4 shadow-lg">
                                    <div className="flex items-center text-gray-600 mb-1">
                                        <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z" clipRule="evenodd" />
                                        </svg>
                                        Gender
                                    </div>
                                    <p className="font-semibold text-gray-800">{profile.gender}</p>
                                </div>
                            )}
                            {profile?.height && (
                                <div className="bg-white/50 rounded-xl p-4 shadow-lg">
                                    <div className="flex items-center text-gray-600 mb-1">
                                        <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                                        </svg>
                                        Height
                                    </div>
                                    <p className="font-semibold text-gray-800">{profile.height} m</p>
                                </div>
                            )}
                            {profile?.skinColor && (
                                <div className="bg-white/50 rounded-xl p-4 shadow-lg">
                                    <div className="flex items-center text-gray-600 mb-1">
                                        <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                                        </svg>
                                        Skin Tone
                                    </div>
                                    <p className="font-semibold text-gray-800">{profile.skinColor}</p>
                                </div>
                            )}
                            {profile?.job && (
                                <div className="bg-white/50 rounded-xl p-4 shadow-lg">
                                    <div className="flex items-center text-gray-600 mb-1">
                                        <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M6 6V5a3 3 0 013-3h2a3 3 0 013 3v1h2a2 2 0 012 2v3.57A22.952 22.952 0 0110 13a22.95 22.95 0 01-8-1.43V8a2 2 0 012-2h2zm2-1a1 1 0 011-1h2a1 1 0 011 1v1H8V5zm1 5a1 1 0 011-1h.01a1 1 0 110 2H10a1 1 0 01-1-1z" clipRule="evenodd" />
                                        </svg>
                                        Profession
                                    </div>
                                    <p className="font-semibold text-gray-800">{profile.job}</p>
                                </div>
                            )}
                        </div>

                        {/* Hobbies Section */}
                        {profile?.hobbies && profile?.hobbies?.length > 0 && (
                            <div className="bg-white/50 rounded-2xl p-6 mb-6 shadow-lg">
                                <h3 className="text-lg font-semibold text-gray-800 mb-3 flex items-center">
                                    <svg className="w-5 h-5 mr-2 text-purple-500" fill="currentColor" viewBox="0 0 20 20">
                                        <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z" />
                                    </svg>
                                    Interests & Hobbies
                                </h3>
                                <p className="text-gray-700">{profile.hobbies.map((h,index) => <span key={index} className='mr-3 border px-2 py-1 rounded-full text-sm'>{h}</span>)}</p>
                            </div>
                        )}

                        {/* Looking For Section */}
                        {profile?.lookingFor && (
                            <div className="bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl p-6 mb-6 text-white shadow-lg">
                                <h3 className="text-lg font-semibold mb-3 flex items-center">
                                    <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
                                    </svg>
                                    Looking For
                                </h3>
                                <p className="opacity-90">{profile.lookingFor}</p>
                            </div>
                        )}

                        <div className=" mt-6">
                            <Link to='/profile-edit' className="flex items-center justify-center bg-gradient-to-r from-purple-500 to-pink-500 text-white w-full py-3 rounded-lg font-semibold shadow-lg hover:from-purple-600 hover:to-pink-600 transition-all duration-300 transform hover:shadow-xl gap-2">
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                </svg>
                                <span> Edit Profile</span>
                            </Link>
                        </div>

                        {/* Photo Gallery */}
                        {profile?.photos && profile?.photos?.length ? (
                            <div className="bg-white/50 rounded-2xl py-6">
                                <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                                    <svg className="w-5 h-5 mr-2 text-purple-500" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
                                    </svg>
                                    Gallery
                                </h3>
                                <div className="grid grid-cols-3 gap-3">
                                    {profile.photos.map((photo, idx) => (
                                        <div onClick={() => handleShowImage(photo)} key={idx} className="relative group">
                                            <img
                                                src={`${baseURL}/uploads/${photo}`}
                                                alt={`Photo ${idx + 1}`}
                                                className="w-full h-34 object-cover rounded-lg shadow-md transform group-hover:scale-105 transition-transform duration-300"
                                            />
                                            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 rounded-lg transition-all duration-300"></div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ) : null
                        }
                        <form className='mt-4' onSubmit={uploadImage}>
                            <input onChange={handleFileChange} className='' type="file" accept='image/*' />
                            <button type='submit' className='rounded bg-gray-700 text-white px-5 py-1.5 cursor-pointer  block mt-2 text-sm'>Upload Photos</button>
                        </form>
                    </div>
                </div>
            </div>

            {/*  Full Image view */}
            {
                showImage && 
                    <div className='fixed inset-0 flex items-center justify-center h-[100vh] w-[100%] bg-black/70 z-40'>
                        <div className='h-[90%] w-2xl relative'>
                           <img className={`h-full w-full object-cover rounded`} src={`${baseURL}/uploads/${selectedImage}`} alt="Image" />
                           <BiDotsVertical className='absolute bottom-0 -right-8 text-white text-4xl cursor-pointer' />
                        </div>
                        <BiX onClick={() => setShowImage(false)} className='absolute top-8 right-8 text-4xl cursor-pointer text-white' />
                    </div>
            }
        
        </div>
    )
}

export default ProfileView