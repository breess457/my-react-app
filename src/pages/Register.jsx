import React, { useState } from "react"
import Alert from "../components/Alert"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faEye, faEyeSlash } from "@fortawesome/free-regular-svg-icons"
import {v4 as uuidv4} from "uuid"
import Swal from "sweetalert2"
export default function Register(){
    const gettokens = (token)=>{
        sessionStorage.setItem('token',JSON.stringify(token))
    }
    const [close,setClose] = useState(false)
    const [showPassword,setShowPassword] = useState(false)
    const [formSignup,setFormSignup] = useState({
        telephone:'',
        fullname:'',
        username:'',
        password:''
    })
    const [error, setError] = useState({
        telephone:false,
        fullname:false,
        username:false,
        password:false
    })
    const handleChange = (e)=>{
        const {name, value} = e.target
        setFormSignup({
            ...formSignup,
            [name]:value
        })
    }
    const generateCode = ()=>{
        const dates = new Date().toISOString().slice(0,10).replace(/-/g,"")
        const random = Math.random().toString(36).substring(2,8).toLowerCase()
        const uuid = uuidv4().split("-")[0].toUpperCase()
        return `SIGNUP-USER-${dates}-${random}-${uuid}`
    }

    const handleFormRegister = async (e)=>{
        e.preventDefault()
        try{
            setError({
                telephone:!formSignup.telephone,
                fullname:!formSignup.fullname,
                username:!formSignup.username,
                password:!formSignup.password
            })
            if(formSignup.telephone && formSignup.fullname && formSignup.username && formSignup.password){
                const responsefetch = await fetch('http://localhost:3001/api/crateuser',{
                    method:"POST",
                    headers:{
                        Accept: 'application/json',
                        'Content-Type': 'application/json'
                    },
                    body:JSON.stringify({
                        code:generateCode(),
                        fullname:formSignup.fullname,
                        telephone:formSignup.telephone,
                        username:formSignup.username,
                        password:formSignup.password
                    })
                })
                if(!responsefetch.ok) throw new Error(`Error Response status: ${responsefetch.status}`)
                const resultjson = await responsefetch.json()
            console.log({resultjson})
                if(resultjson.statusCode === 201){
                    gettokens(resultjson?.token)
                    Swal.fire({
                        icon:"success",
                        title:"Register User is Success fully",
                        showConfirmButton:false,
                        timer:1500
                    })
                     .then(()=>{
                         window.location.pathname ="/in/page"
                     })
                }else if(resultjson.statusCode === 203){
                    setClose(true)
                }
            }
        }catch(e){
            console.error(`Is Error :${e}`)
        }
    }
    return (
        <div className="flex items-center justify-center h-screen bg-gray-50">
            <div className="max-w-xl w-full space-y-8">
                <div className="rounded bg-white max-w-xl rounded overflow-hidden shadow-2xl p-5">
                    <h2 className="my-3 text-center text-xl font-extrabold text-gray-900">
				    	Register to your account
				    </h2>
                    <form className="space-y-4 mx-4 mt-2" onSubmit={handleFormRegister}>
                        {close ? <Alert text={"ไม่สามารถใช้ username นี้ได้ โปรดใช้ username อื่น"} setClose={setClose} /> : null}
                        <div className="">
                            <input 
                                type="text" 
                                name="fullname"
                                placeholder="please enter your name" 
                                className={`bg-gray-50 border ${error.fullname ? 'border-red-500' : 'border-gray-300'} text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-3`}
                                value={formSignup.fullname}
                                onChange={handleChange}
                                 
                            />
                        </div>
                        <div className="">
                            <input 
                                type="text" 
                                name="telephone"
                                placeholder="กรอก เบอร์โทร" 
                                className={`bg-gray-50 border ${error.telephone ? 'border-red-500' : 'border-gray-300'} text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-3`}
                                value={formSignup.telephone}
                                onChange={(e)=>{
                                    const inputValue = e.target.value;
                                    if(/^\d*$/.test(inputValue)){
                                        setFormSignup({
                                            ...formSignup,
                                            ['telephone']:inputValue
                                        })
                                    }
                                }}
                                 
                            />
                        </div>
                        <div className="">
                            <input 
                                type="text" 
                                name="username"
                                placeholder="please enter username" 
                                className={`bg-gray-50 border ${error.username ? 'border-red-500' : 'border-gray-300'} text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-3`}
                                value={formSignup.username}
                                onChange={handleChange}
                                 
                            />
                        </div>
                        <div className="">
                            <div className="relative">
                                <input 
                                    type={showPassword ? "text" : "password"} 
                                    name="password"
                                    placeholder="Please enter your password" 
                                    className={`bg-gray-50 border ${error.password ? 'border-red-500' : `border-gray-300`} text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-3`}
                                    value={formSignup.password}
                                    onChange={handleChange}
                                     
                                />
                                <a 
                                    href="#" onClick={()=>setShowPassword(!showPassword)}
                                    className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500 focus:outline-none"
                                >
                                    <FontAwesomeIcon icon={showPassword ? faEye : faEyeSlash} />
                                </a>
                            </div>
                        </div>
                        <button 
                            type="submit"
                            className="uppercase font-bold w-full text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 shadow-lg shadow-green-500/50 font-medium rounded-lg text-sm px-5 py-3 text-center mt-2 mb-2"
                        >Register</button>
                        <div className="flex w-full justify-center">
                            <a href="/login" className="text-center hover:text-blue-500">เข้าสู่ระบบ</a>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}