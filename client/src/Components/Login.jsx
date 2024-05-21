// src/Components/Modal.jsx or Modal.tsx
import React, { useEffect, useState } from 'react';
import { useFormik } from 'formik';
import { SignUpSchema } from '../validations/signupschema';
import toast from 'react-hot-toast'
import { apiRequest } from '../api/axios';
import { useDispatch } from 'react-redux';
import { setUserCredentials } from '../Redux/slices/userAuth';



const Login = ({ isVisible, onClose }) => {
  const [signUpEnable, setSignUpEnable] = useState(false)
  const [loginEmail,setLoginEmail] = useState("")
  const [loginPassword, setLoginPassword] = useState("")
  const dispatch = useDispatch();

  useEffect(()=>{
    setLoginEmail("")
    setLoginPassword("")
  },[])

  const loginFunction=async()=>{
    if(loginEmail&&loginPassword){
      const responsed = await apiRequest({
        method: 'post',
        url: '/login',
        data: {
          email: loginEmail,
          password: loginPassword,
        }
      })
      console.log(responsed);
      if(responsed.token){
        toast.success("Login Successful")
        dispatch(setUserCredentials(responsed.user))
        localStorage.setItem('Token',responsed.token)
        onClose()
      }
      if(responsed.error){
        toast.error(`${responsed.error}`)
      }
    }else{
      toast.error("Fill the fields")
    }
  
  }


  const { values, errors, touched, handleBlur, handleChange, handleSubmit } = useFormik({
    initialValues: {
      name: "",
      email: "",
      mobile: "",
      password: "",
      confirmPassword: ""
    },
    validationSchema: SignUpSchema,
    onSubmit: async (values) => {
      console.log(values.mobile);


      const response = await apiRequest({
        method: 'post',
        url: '/signup',
        data: {
          name: values.name,
          email: values.email,
          mobile: values.mobile,
          password: values.password,
          confirmPassword: values.confirmPassword,
        }
      })

      if(response.user){
        toast.success("User Registered")
        onClose()
      }
      if(response.error){
        toast.error(`${response.error}`)
      }
    }
  })

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center">
      {signUpEnable ? (<div className="bg-gray-800 rounded-lg w-1/3">
        <div className="flex justify-end p-2">
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">✕</button>
        </div>
        <div className="max-w-lg w-full bg-gray-800 rounded-lg shadow-xl overflow-hidden">
          <div className="p-8">
            <h2 className="text-center text-3xl font-extrabold text-white">
              Create New Account
            </h2>
            <form method="POST" action="#" className="mt-8 space-y-6" onSubmit={handleSubmit}>
              <div className="rounded-md shadow-sm">
                <div >
                  <label className="sr-only" htmlFor="name">Name</label>
                  <input
                    placeholder="Name"
                    className="appearance-none relative block w-full px-3 py-3 border border-gray-700 bg-gray-700 text-white rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                    required
                    autoComplete="current-password"
                    type="text"
                    name="name"
                    id="name"
                    value={values.name}
                        onChange={handleChange}
                        onBlur={handleBlur}
                  />
                </div>
                {errors.name && touched.name && <p className='text-red-500'>{errors.name}</p>}
                <div className="mt-4">
                  <label className="sr-only" htmlFor="email">Email address</label>
                  <input
                    placeholder="Email address"
                    className="appearance-none relative block w-full px-3 py-3 border border-gray-700 bg-gray-700 text-white rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                    required
                    autoComplete="email"
                    type="email"
                    name="email"
                    id="email"
                    value={values.email}
                        onChange={handleChange}
                        onBlur={handleBlur}
                  />
                </div>
                {errors.email && touched.email && <p className='text-red-500'>{errors.email}</p>}
                <div className="mt-4">
                  <label className="sr-only" htmlFor="mobile">Mobile</label>
                  <input
                    placeholder="Mobile"
                    className="appearance-none relative block w-full px-3 py-3 border border-gray-700 bg-gray-700 text-white rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                    required
                    autoComplete="current-password"
                    type="number"
                    name="mobile"
                    id="mobile"
                    value={values.mobile}
                        onChange={handleChange}
                        onBlur={handleBlur}
                  />
                </div>
                {errors.mobile && touched.mobile && <p className='text-red-500'>{errors.mobile}</p>}
                <div className="mt-4">
                  <label className="sr-only" htmlFor="password">Password</label>
                  <input
                    placeholder="Password"
                    className="appearance-none relative block w-full px-3 py-3 border border-gray-700 bg-gray-700 text-white rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                    required
                    autoComplete="current-password"
                    type="password"
                    name="password"
                    id="password"
                    value={values.password}
                        onChange={handleChange}
                        onBlur={handleBlur}
                  />
                </div>
                {errors.password && touched.password && <p className='text-red-500'>{errors.password}</p>}
                <div className="mt-4">
                  <label className="sr-only" htmlFor="confirmpassword">Confirm Password</label>
                  <input
                    placeholder="Confirm Password"
                    className="appearance-none relative block w-full px-3 py-3 border border-gray-700 bg-gray-700 text-white rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                    required
                    autoComplete="current-password"
                    type="password"
                    name="confirmPassword"
                    id="confirmPassword"
                    value={values.confirmPassword}
                        onChange={handleChange}
                        onBlur={handleBlur}
                  />
                </div>
                {errors.confirmPassword && touched.confirmPassword && <p className='text-red-500'>{errors.confirmPassword}</p>}
              </div>

              <div>
                <button
                  className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-gray-900 bg-indigo-500 hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  type='submit'
                >
                  Sign Up
                </button>
              </div>
            </form>
          </div>
          <div className="px-8 py-4 bg-gray-700 text-center">
            <span className="text-gray-400">Already have an account?</span>
            <a
              onClick={() => setSignUpEnable(false)}
              className="font-medium text-indigo-500 hover:text-indigo-400"
              href="#"
            >
              Sign In
            </a>
          </div>
        </div>
      </div>)
        :
        (<div className="bg-gray-800 rounded-lg w-1/3">
          <div className="flex justify-end p-2">
            <button onClick={onClose} className="text-gray-400 hover:text-gray-600">✕</button>
          </div>

          <div className="max-w-lg w-full bg-gray-800 rounded-lg shadow-xl overflow-hidden">
            <div className="p-8">
              <h2 className="text-center text-3xl font-extrabold text-white">
                Welcome Back
              </h2>
              <p className="mt-4 text-center text-gray-400">Sign in to continue</p>
              
                <div className="rounded-md shadow-sm">
                  <div>
                    <label className="sr-only" htmlFor="email">Email address</label>
                    <input
                      placeholder="Email address"
                      className="appearance-none relative block w-full px-3 py-3 border border-gray-700 bg-gray-700 text-white rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                      required
                      type="email"
                      name="email"
                      id="email"
                      value={loginEmail}
                      onChange={(e)=>{setLoginEmail(e.target.value)}}
                    />
                  </div>
                  <div className="mt-4">
                    <label className="sr-only" htmlFor="password">Password</label>
                    <input
                      placeholder="Password"
                      className="appearance-none relative block w-full px-3 py-3 border border-gray-700 bg-gray-700 text-white rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                      required
                      type="password"
                      name="password"
                      id="password"
                      value={loginPassword}
                      onChange={(e)=>{setLoginPassword(e.target.value)}}
                    />
                  </div>
                </div>

                <div>
                  <button
                    className="group relative w-full flex justify-center py-3 mt-10 px-4 border border-transparent text-sm font-medium rounded-md text-gray-900 bg-indigo-500 hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    onClick={loginFunction}
                  >
                    Sign In
                  </button>
                </div>
              
            </div>
            <div className="px-8 py-4 bg-gray-700 text-center">
              <span className="text-gray-400">Don't have an account?</span>
              <a
                onClick={() => setSignUpEnable(true)}
                className="font-medium text-indigo-500 hover:text-indigo-400"
                href="#"
              >
                Sign up
              </a>
            </div>
          </div>


        </div>)}




    </div>
  );
};

export default Login;
