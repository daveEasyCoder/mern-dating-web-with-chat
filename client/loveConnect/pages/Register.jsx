import React from 'react'

const Register = () => {
  return (
    <div className='min-h-screen flex items-center justify-center bg-gray-100'>
       <form action="" className='max-w-2xl flex-1 bg-white shadow rounded p-6'>
        <div>
            <h2 className='text-2xl text-center mb-6 font-semibold text-gray-800'>Create Your Profile</h2>
        </div>
          <div className='grid grid-cols-6 gap-2'>
              <div className='col-span-3'>
                 <label htmlFor="fullname" className='font-semibold text-gray-700'>Full name:</label>
                 <input type="text" className='border border-gray-200 rounded px-2 py-2 mt-1 text-sm w-full' />
              </div>
              <div className='col-span-3'>
                 <label htmlFor="email" className='font-semibold text-gray-700'>Email</label>
                 <input type="text" className='border border-gray-200 rounded px-2 py-2 mt-1 text-sm w-full' />
              </div>
              <div className='col-span-2'>
                 <label htmlFor="fullname" className='font-semibold text-gray-700'> Gender</label>
                 <select name="gender" id="gender" className='border border-gray-300 rounded px-2 py-2 mt-1 text-sm w-full'>
                    <option value="male">Select Gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                 </select>
              </div>
              <div className='col-span-2'>
                 <label htmlFor="age" className='font-semibold text-gray-700'>Age</label>
                 <input type="text" min={18} className='border border-gray-200 rounded px-2 py-2 mt-1 text-sm w-full' />
              </div>
              <div className='col-span-2'>
                 <label htmlFor="height" className='font-semibold text-gray-700'>Height</label>
                 <input type="text" min={1} placeholder='e.g, 5.8' name='height' className='border border-gray-200 rounded px-2 py-2 mt-1 text-sm w-full' />
              </div>
              <div className='col-span-3'>
                 <label htmlFor="skinColor" className='font-semibold text-gray-700'>Skin Color</label>
                 <input type="text" placeholder='e.g, Fair, Medium, Dark' className='border border-gray-300 rounded px-2 py-2 mt-1 text-sm w-full' />
              </div>
              <div className='col-span-3'>
                 <label htmlFor="job" className='font-semibold text-gray-700'>Job</label>
                 <input type="text" className='border border-gray-300 rounded px-2 py-2 mt-1 text-sm w-full' />
              </div>
              <div className='col-span-6'>
                 <label htmlFor="job" className='font-semibold text-gray-700'>Interests(comma-separated)</label>
                 <textarea rows={5} type="text" placeholder='e.g, Photography,Hiking, Cooking, Travel' className='border border-gray-300 rounded px-2 py-2 mt-1 text-sm w-full' />
              </div>
          </div>
          <button type='submit' className='w-full py-2 bg-black rounded text-white mt-3 cursor-pointer hover:bg-gray-800 duration-300'>Create Profile</button>
       </form>
    </div>
  )
}

export default Register
