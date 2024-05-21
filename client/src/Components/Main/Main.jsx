import React, { useEffect, useState } from 'react'
import useGeneratePassword from '../../Hooks/useGeneratePassword'
import toast from 'react-hot-toast';
import PasswordStrength from '../PasswordStrength';
import CheckBox from '../CheckBox';
import CharacterLength from '../CharacterLength';
import Navbar from '../Navbar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRefresh , faCopy } from '@fortawesome/free-solid-svg-icons';
import { userApiRequest } from '../../api/axios';
import { useDispatch, useSelector } from 'react-redux';

const Main = () => {

  const [length, setLength] = useState(4)
  let  {userInfo} = useSelector((state) => state.userAuth);

  const [checkboxData, setCheckboxData] = useState([
    { title: "Include Uppercase Letters", state: true },
    { title: "Include Lowercase Letters", state: false },
    { title: "Include Numbers", state: false },
    { title: "Include Symbols", state: false }
  ])

  const handleCheckboxChange = (i) => {
    const updatedCheckboxData = [...checkboxData]
    updatedCheckboxData[i].state = !updatedCheckboxData[i].state
    setCheckboxData(updatedCheckboxData)
  }

  const { password, errorMessage, generatePassword } = useGeneratePassword()

  // if(errorMessage){
  //   toast.error(`${errorMessage}`)
  // }

  const handleCopy = () => {
    navigator.clipboard.writeText(password)
    toast.success("Copied")
  }

  const handleRefresh = () => {
    generatePassword(checkboxData, length)
  }


  const handleSavePassword = async() =>{
    if(userInfo){
      const response = await userApiRequest({
        method: 'post',
        url: '/savePassword',
        data: {
          password: password,
        }
      })
      if(response.newPassword){
        toast.success("Password Saved")
      }
    }else{
      toast.error("Please Login To Save Password")
    }
    
  }

  useEffect(() => {
    generatePassword(checkboxData, length)
  }, [checkboxData, length])


  return (
    <div className='bg-[#173553] min-h-screen '>
      <Navbar />
      <div className='flex justify-center'>
        <div className='bg-[#1B263B] items-center w-[70%] p-[24px] font-serif m-5 text-white '>
          <h1 className='text-4xl font-bold mb-2 text-center'>Password Generator</h1>
          <p className='text-xl mb-6 text-center'>Generate strong and random passwords to keep your accounts safe online!</p>

          {/* Password text and copy */}
          {password && (
            <div className='flex items-center justify-between text-white text-2xl font-bold pb-2 pt-8'>

              <div className=" flex justify-between md:rounded-full rounded-lg mb-0  w-full bg-gray-900 text-xl text-white border-2 border-purple-500 p-4 placeholder-purple-400 focus:text-violet-950 focus:border-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500">
               <div className='w-11/12 overflow-hidden break-words px-4'>
               {password}
               </div>
               <div className=' flex justify-around w-1/12 mr-5'>
                <div className='mr-4'>
                  <FontAwesomeIcon className='cursor-pointer' onClick={handleRefresh} icon={faRefresh} />
                </div>
                
                <FontAwesomeIcon className='cursor-pointer' onClick={() => { handleCopy() }} icon={faCopy} />
              </div>
                
              </div>
            
            </div>
          )}


          {/* Character length */}
          <CharacterLength length={length} setLength={setLength} />

          {/* Checkboxes */}
          <CheckBox checkboxData={checkboxData} handleCheckboxChange={handleCheckboxChange} />

          {/* Strength */}
          <PasswordStrength password={password} />

          {/* Error handling */}
          {errorMessage && <div className='text-red-600'>{errorMessage}</div>}

          {/* Generate button */}
          <div className='flex justify-center pt-10'>
            <button
              className='ml-4 bg-green-400 hover:bg-green-500 text-black font-thin py-2 px-4 rounded-xl transition duration-300 ease-in-out'
              onClick={ handleSavePassword}
            >
              Save Password
            </button>
          </div>
        </div>
      </div>
      
    </div>

  )
}

export default Main
