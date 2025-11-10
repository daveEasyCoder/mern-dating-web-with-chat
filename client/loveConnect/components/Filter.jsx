import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import { useGlobalContext } from '../context/Context';

const Filter = ({setFilteredPeople}) => {
    const Interests = ['photography','hiking','travel','fitness','reading','music','gaming','movie','dancing','art','yoga','sports','books','technology','gardening','food','dogs']
    const [value, setValue] = useState(50); 
    const [selectedInterests, setSelectedInterests] = useState([])

    const {people} = useGlobalContext()
     
    
    const handleChange = (e) => {
        setValue(e.target.value);
    };

    const handleSelectInterest = (interest) => {
        if(selectedInterests.includes(interest)){
            setSelectedInterests(prev => prev.filter(i => i !== interest))
        }else{
            setSelectedInterests(prev => [...prev,interest])
        }
    }


    useEffect(() => {
        let filtered = people.filter(person => person.age <= value);

        if (selectedInterests.length > 0) {
        filtered = filtered.filter(person =>
            person.hobbies.some(i => selectedInterests.includes(i.toLowerCase()))
         );
       }
    setFilteredPeople(filtered);
    },[value,selectedInterests,people])
    
  return (
    <div className='mb-3 bg-white px-3 py-5 rounded-sm shadow-sm'>
        <h2 className='text-xl text-gray-800 font-semibold mb-3'>Filter</h2>
        <div>
             <p className='text-sm'>Age Range: {value}</p>
                <input
                type="range"
                min="20"
                max="50"
                value={value}
                onChange={handleChange}
                className="accent-gray-800 w-full"
            />
        </div>
        <div className='mt-3'>
           <p className='text-md text-gray-700 mb-1'>Interests</p>
            <div className='flex flex-wrap gap-3'>
                {
                    Interests.map((interest,index) => (
                        <button key={index} onClick={() => handleSelectInterest(interest)} className={`px-3 py-1 ${selectedInterests.includes(interest) ? 'bg-gray-200' : ''} rounded-full border cursor-pointer border-gray-400 text-sm`}>{interest}</button>
                    ))
                }
            </div>
        </div>
    </div>
  )
}

export default Filter