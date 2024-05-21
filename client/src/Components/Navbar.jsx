// src/Components/Navbar.jsx or Navbar.tsx
import React, { useState } from 'react';
import {  Link, useNavigate} from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignInAlt } from '@fortawesome/free-solid-svg-icons';
import Login from './Login';
import { useDispatch, useSelector } from 'react-redux';
import { userLogout } from '../Redux/slices/userAuth';
import toast from 'react-hot-toast';

const Navbar = () => {
    const [dropdownVisible, setDropdownVisible] = useState(false);
    const [isModalVisible, setIsModalVisible] = useState(false);
    let  {userInfo} = useSelector((state) => state.userAuth);
    const navigate = useNavigate()
    const dispatch=useDispatch()

    const toggleDropdown = () => {
        setDropdownVisible(!dropdownVisible);
    };

    const openModal = () => {
        setIsModalVisible(true);
    };

    const closeModal = () => {
        setIsModalVisible(false);
    };

    const handleLogout = () => {
        dispatch(userLogout());
        toast.success('Logged Out Successfully');
        navigate("/");
     };

    return (
        <div className='w-full bg-[#121c30] text-[#F4F4F9]'>
            
            <nav className='h-16 flex justify-end items-center pr-5'>
                
                {userInfo?(<div className="relative">
                    <img
                        id="avatarButton"
                        onClick={toggleDropdown}
                        className="w-10 h-10 rounded-full cursor-pointer"
                        src="https://flowbite.com/docs/images/people/profile-picture-5.jpg"
                        alt="User dropdown"
                    />
                    {dropdownVisible && (
                        <div id="userDropdown" className="absolute right-0 z-10 bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700 dark:divide-gray-600">
                            <div className="px-4 py-3 text-sm text-gray-900 dark:text-white">
                                <div>{userInfo.name}</div>
                                <div className="font-medium truncate">{userInfo.email}</div>
                            </div>
                            <ul className="py-2 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="avatarButton">
                                <li>
                                    <a href="" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Account</a>
                                </li>
                                <li>
                                    <Link to={"/savedPasswords"}  className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Saved Passwords</Link>
                                </li>
                                
                            </ul>
                            <div className="py-1">
                                <a  onClick={handleLogout} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Sign out</a>
                            </div>
                        </div>
                    )}
                </div>):(<div className='cursor-pointer' onClick={openModal}>
                <FontAwesomeIcon icon={faSignInAlt} className="mr-2" />Login
                </div>)}
                
            
                
            </nav>
            <Login isVisible={isModalVisible} onClose={closeModal}/>
        </div>
    );
};

export default Navbar;
