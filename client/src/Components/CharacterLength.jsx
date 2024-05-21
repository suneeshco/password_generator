import React from 'react'

const CharacterLength = ({length,setLength}) => {
  return (
    <div className='flex flex-col text-white pt-8 pb-[24px]'>
        <span className='flex justify-between pb-[24px]'>
            <label>Character Length</label>
            <label>{length}</label>
        </span>
        <input type="range" min="4" max="50" value={length} onChange={(e)=>{setLength(e.target.value)}}/>
      </div>
  )
}

export default CharacterLength
