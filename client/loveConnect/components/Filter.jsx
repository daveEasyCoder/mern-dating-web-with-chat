import React from 'react'

const Filter = () => {
    const Interests = ['photography','hiking','travel','fitness','reading','music','gaming','movie','dancing','art','yoga','sports','books','technology','gardening','food','dogs']
  return (
    <div className='mb-3 bg-white px-3 py-5 rounded-sm shadow-sm'>
        <h2 className='text-xl text-gray-800 font-semibold mb-3'>Filter</h2>
        <div>
             <p className='text-sm'>Age Range: 20-50</p>
        </div>
        <div className='mt-3'>
           <p className='text-md text-gray-700 mb-1'>Interests</p>
            <div className='flex flex-wrap gap-3'>
                {
                    Interests.map((interest,index) => (
                        <button key={index} className='px-3 py-1 rounded-full border cursor-pointer border-gray-400 text-sm'>{interest}</button>
                    ))
                }
            </div>
        </div>
    </div>
  )
}

export default Filter