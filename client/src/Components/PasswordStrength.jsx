import React from "react"

const PasswordStrength = ({password}) =>{
    const getPasswordStrength = () =>{
        const passwordLength = password.length

        if(passwordLength<1){
            return ""
        }else if(passwordLength<4){
            return "Very weak"
        }else if(passwordLength<8){
            return "Poor"
        }else if(passwordLength<12){
            return "Medium"
        }else if(passwordLength<16){
            return "Strong"
        }else{
            return "Very strong"
        }
    }

    const passwordStren = getPasswordStrength()

    if(!passwordStren) return <React.Fragment/>
    return (
        <div className="md:flex justify-between items-center mb-4 ">
            <div>
            <span className="text-lg">Strength:</span><span className="text-xl font-bold pl-3 text-purple-400">{passwordStren}</span>
            </div>
  
  <div className="flex space-x-1">
    <div className={`h-2 w-8 rounded ${password.length >= 1 ? 'bg-red-500' : 'bg-gray-300'}`}></div>
    <div className={`h-2 w-8 rounded ${password.length >= 5 ? 'bg-orange-500' : 'bg-gray-300'}`}></div>
    <div className={`h-2 w-8 rounded ${password.length >= 9 ? 'bg-yellow-500' : 'bg-gray-300'}`}></div>
    <div className={`h-2 w-8 rounded ${password.length >= 13 ? 'bg-green-500' : 'bg-gray-300'}`}></div>
    <div className={`h-2 w-8 rounded ${password.length >= 17 ? 'bg-green-700' : 'bg-gray-300'}`}></div>
  </div>
</div>

    )
}


export default PasswordStrength