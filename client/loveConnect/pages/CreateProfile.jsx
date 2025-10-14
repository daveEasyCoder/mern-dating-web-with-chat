import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useGlobalContext } from '../context/Context';
import axios from 'axios';
import { toastSuccess } from '../utility/toast';

const CreateProfile = () => {

  const {user,baseURL} = useGlobalContext()
  const navigate = useNavigate()

  const [formData, setFormData] = useState({
    fullname:'',
    gender: '',
    age: '',
    height: '',
    skinColor: '',
    job: '',
    bio: '',
    location: '',
    profilePicture: '',
    lookingFor: ''
  });
  const [interests,setInterests] = useState('')
  
  const [error,setError] = useState('')
  const [fetchingProfileError,setFetchingProfileError] = useState('')
  const [loading,setLoading] = useState(false)

      const getProfile = async () => {
        console.log("profile fetched");
        
        try {
            const res = await axios.get(`${baseURL}/api/users/get-profile`, { withCredentials: true });
            if (res.data.success) {
                const {fullname,gender,age,height,skinColor,job,hobbies,bio,location,lookingFor} = res.data.user
               
                setFormData({
                  fullname:fullname,
                  gender:gender,
                  age:age,
                  height:height,
                  skinColor:skinColor,
                  job:job,
                  bio:bio,
                  location:location,
                  lookingFor:lookingFor
                })
                setInterests(hobbies.join(", "))
            }
        } catch (err) {
            if (err.response) {
                if (err.response.data.message) {
                    setFetchingProfileError(err.response.data.message)
                }
            } else {
                setFetchingProfileError("Server is not responding. try again!")
            }
        }
    }


  const handleChange = (e) => {
    setFormData({
       ...formData,
        [e.target.name]: e.target.type === 'file' ? e.target.files[0] : e.target.value 
      });
  };

  const handleInterestsChange = (e) => {
    setInterests(e.target.value)
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('')
    if(!formData.gender || !formData.age || !formData.height || !formData.skinColor || !formData.job || !interests || !formData.bio || !formData.location || !formData.lookingFor){
      setError('Please fill all the fields')
    }else if(Number(formData.height) <= 0){
      setError('Please enter a valid height')
    } else{
       try {
          setLoading(true)
          const hobbies = interests.split(",").map(h => h.trim())
         
          const data = new FormData()
          data.append("fullname",formData.fullname)
          data.append("gender",formData.gender)
          data.append("age",formData.age)
          data.append("height",formData.height)
          data.append("skinColor",formData.skinColor)
          data.append("job",formData.job)
          data.append("bio",formData.bio)
          data.append("location",formData.location)
          data.append("lookingFor",formData.lookingFor)
          data.append("hobbies", JSON.stringify(hobbies));
          if(formData.profilePicture){
            data.append("profilePicture",formData.profilePicture)
          }
          const res = await axios.post(`${baseURL}/api/users/create-profile`, data, {withCredentials:true});
          if(res.data.success){
          toastSuccess("Profile created successfully")
          }
         setLoading(false)
         
       } catch (err) {
          setLoading(false)
         if(err.response){
           if(err.response.data.message){
            setError(err.response.data.message)
           }
         }else{
          setError('Server Error. Please try again later.')
          console.log(err);
          
         }
       }
    }
  };

    useEffect(() => {
      window.scrollTo(0,0)
      if(!user?.email){
        navigate('/login')
      }
      getProfile()
    },[])

  return (
    <div className="min-h-screen bg-pink-50 flex items-center justify-center px-4 py-8">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-2xl bg-white p-8 rounded-2xl shadow"
      >
        <h2 className="text-3xl font-bold text-center text-pink-600 mb-8">💖 Create Your LoveConnect Profile</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700">Full Name</label>
            <input
              type="text"
              name="fullname"
              value={formData.fullname}
              onChange={handleChange}
              className="mt-1 w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-300"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              name="email"
              value={user?.email}
              disabled
              className="mt-1 w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-300"
            />
          </div>

   

          <div>
            <label className="block text-sm font-medium text-gray-700">Gender</label>
            <select
              name="gender"
              onChange={handleChange}
              value={formData.gender}
              className="mt-1 w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-300"
            >
              <option value="">Select Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Age</label>
            <input
              type="number"
              name="age"
              min="18"
              max="40"
              value={formData.age}
              onChange={handleChange}
              className="mt-1 w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-300"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Height (e.g., 1.7)</label>
            <input
              type="text"
              name="height"
              value={formData.height}
              onChange={handleChange}
              className="mt-1 w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-300"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Skin Color</label>
            <input
              type="text"
              name="skinColor"
              placeholder="Fair, Medium, Dark"
              value={formData.skinColor}
              onChange={handleChange}
              className="mt-1 w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-300"
            />
          </div>

          <div className='md:col-span-2'>
            <label className="block text-sm font-medium text-gray-700">Job</label>
            <input
              type="text"
              name="job"
              value={formData.job}
              onChange={handleChange}
              className="mt-1 w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-300"
            />
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700">Interests (comma-separated)</label>
            <input
              type="text"
              name="hobbies"
              placeholder="e.g., Photography, Hiking"
              value={interests}
              onChange={handleInterestsChange}
              className="mt-1 w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-300"
            />
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700">Bio</label>
            <textarea
              name="bio"
              rows="4"
              placeholder="Tell us about yourself..."
              value={formData.bio}
              onChange={handleChange}
              className="mt-1 w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-300"
            ></textarea>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Location</label>
            <input
              type="text"
              name="location"
              value={formData.location}
              onChange={handleChange}
              className="mt-1 w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-300"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Looking For</label>
            <select
              name="lookingFor"
              value={formData.lookingFor}
              onChange={handleChange}
              className="mt-1 w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-300"
            >
              <option value="">Select</option>
              <option value="Friendship">Friendship</option>
              <option value="Dating">Dating</option>
              <option value="Marriage">Marriage</option>
            </select>
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700">Profile Picture URL</label>
            <input
              type="file"
              name="profilePicture"
              accept="image/*"
              onChange={handleChange}
              className="mt-1 w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-300"
            />
          </div>
        </div>

        {error ? <p className='text-red-500 mt-4'>{error}</p> : ''}
        <button
          type="submit"
          disabled = {loading}
          className={`mt-8 w-full ${ loading ? 'opacity-45 cursor-not-allowed' : 'cursor-pointer'} bg-pink-600 hover:bg-pink-700 text-white font-semibold py-3 rounded-lg transition duration-300`}
        >
          ❤️ Create Profile
        </button>
      </form>
    </div>
  );
};

export default CreateProfile;
