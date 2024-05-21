import React, { useEffect, useState } from 'react'
import Navbar from '../Navbar';
import { userApiRequest } from '../../api/axios';
import toast from 'react-hot-toast';
import { Link } from 'react-router-dom';

const SavedPassword = () => {

    const [passwords,setPasswords]  = useState([])

    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(10);
  
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = passwords.slice(indexOfFirstItem, indexOfLastItem);
  
    const paginate = (pageNumber) => setCurrentPage(pageNumber);
  
    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(passwords.length / itemsPerPage); i++) {
      pageNumbers.push(i);
    }

    const deletePassword = async(id) =>{
        try {
            const response = await userApiRequest({
                method: 'delete',
                url: '/deletePasswords',
                data:{
                    id:id
                }
            });
            if (response.data) {
                toast.success("Password Deleted")
                fetchData()
                
            }

        } catch (error) {
            console.error("Error deleting passwords:", error);
        }
    }
    const fetchData = async () => {
        try {
            const responsed = await userApiRequest({
                method: 'get',
                url: '/getPasswords',
            });
            if (responsed.data) {
                setPasswords(responsed.data);
            }
        } catch (error) {
            console.error("Error fetching passwords:", error);
        }
    };

    useEffect( ()=>{
        

        fetchData();
    },[])


  return (
    <div className='bg-[#173553] min-h-screen '>
      <Navbar />
      <div className='flex justify-center mt-5'>
       <Link to={'/'}><h1 className='text-left text-white cursor-pointer'> Back to Home  </h1></Link>
        <div className='bg-[#1B263B] items-center w-[70%] p-[24px] font-serif m-5 mt-10 text-white '>
        <h1>Saved Passwords</h1>
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                        <th scope="col" className="px-6 py-3">Passwords</th>
                        <th scope="col" className="px-6 py-3">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {currentItems.map((product, index) => (
                        <tr
                            key={index}
                            className={`${index % 2 === 0 ? 'bg-white dark:bg-gray-900' : 'bg-gray-50 dark:bg-gray-800'} border-b dark:border-gray-700`}
                        >
                            <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                {product.password}
                            </th>
                            
                            <td className="px-6 py-4">
                                <a onClick={()=>{deletePassword(product._id)}} className="font-medium text-blue-600 dark:text-blue-500 hover:underline">Delete</a>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
        <div>
              {pageNumbers.map((number) => (
                <button key={number} onClick={() => paginate(number)} className="rounded-md bg-green-400 text-white m-1 md:m-2 px-3 py-1 hover:bg-green-600">
                  {number}
                </button>
              ))}
            </div>
        </div>
      </div>
      
    </div>

  )
}

export default SavedPassword
