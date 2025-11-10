import React from 'react';
import { FaHeart, FaRegHeart, FaSearch } from 'react-icons/fa';
import { FiMapPin } from 'react-icons/fi';
import { BiMessageRounded } from 'react-icons/bi'
import { useGlobalContext } from '../context/Context';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toastError, toastSuccess } from '../utility/toast';

const PersonCard = ({ person }) => {

  const {baseURL,user,handleLike} = useGlobalContext()
  const navigate = useNavigate()



  return (
    <div  className="bg-white rounded-lg  shadow p-4">
      {/* Profile Image Placeholder */}
      <div onClick={() => navigate(`/detail-person/${person._id}`)} className="h-96 md:h-48 bg-gray-200 rounded-md relative mb-4 flex items-center justify-center">
        {/* <span className="text-gray-400">Image</span> */}
        <img className='h-full w-full object-cover' src={`${baseURL}/uploads/${person?.profilePicture}`} alt="Image" />
      </div>

      {/* Details */}
      <h2 className="text-lg font-semibold">{person.fullname}, {person.age}</h2>
      <p className="text-sm text-gray-600">{person.job}</p>
      <div className="flex items-center text-gray-500 text-sm mt-1">
        <FiMapPin className="mr-1" /> {person.location}
      </div>

      {/* Interests */}
      <div className="flex flex-wrap gap-2 mt-3">
            {person.hobbies.map((h,index) => <span key={index} className="bg-gray-100 text-sm px-2 py-1 rounded">{h}</span>)}
          <span className="bg-gray-200 text-sm px-2 py-1 rounded">+{person.hobbies.length - 1}</span>
      </div>

      {/* Buttons */}
      <div className="mt-4 flex justify-between items-center">
        <button onClick={() => handleLike(person._id)} className="flex-1 bg-gray-100 hover:bg-gray-200 py-2 rounded-md text-sm font-medium">
          <FaHeart className={`${person?.likedBy.includes(user.id) ? 'text-red-600' : 'text-gray-500'} inline-block mr-2`} />
          Interested
        </button>
        <button onClick={() => navigate(`/chat/${person._id}`)} className="ml-2 bg-white border cursor-pointer rounded-md p-2 hover:bg-gray-100">
          <BiMessageRounded />
        </button>
      </div>
    </div>
  );
};

export default PersonCard;
