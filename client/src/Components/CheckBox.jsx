import React from 'react'

const CheckBox = ({ checkboxData, handleCheckboxChange }) => {
  return (
    <div className='p-5'>
      <div className='grid grid-cols-2 gap-6 pb-5'>
        {checkboxData.map((checkbox, index) => {
          return (
            <div key={index} className='flex items-center space-x-3'>
              <input
                type="checkbox"
                onChange={() => handleCheckboxChange(index)}
                checked={checkbox.state}
                className=" h-5 w-5 text-purple-600 rounded focus:ring-2 focus:ring-purple-500"
              />
              <label className="text-lg text-white">{checkbox.title}</label>
            </div>
          );
        })}
      </div>
    </div>


  )
}

export default CheckBox
