import React,{useState} from "react"
import {v4 as uuidv4} from "uuid"
import Swal from "sweetalert2"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faEye, faEyeSlash, faXmark } from "@fortawesome/free-solid-svg-icons"
import Alert from "./Alert"

export default function ModelCreateFormUsers({setModelCreateUser}){
    const [close,setClose] = useState(false)
    const [showPassword,setShowPassword] = useState(false)
    const [formCreate, setFormCreate] = useState({
        fullname:"",
        telephone:"",
        username:"",
        password:""
    })
    const [error, setError] = useState({
        telephone:false,
        fullname:false,
        username:false,
        password:false
    })
    const handleChange = (e)=>{
        const {name, value} = e.target
        setFormCreate({
            ...formCreate,
            [name]:value
        })
    }
    const generateCode = ()=>{
        const dates = new Date().toISOString().slice(0,10).replace(/-/g,"")
        const random = Math.random().toString(36).substring(2,8).toLowerCase()
        const uuid = uuidv4().split("-")[0].toUpperCase()
        return `CREATED-USER-${dates}-${random}-${uuid}`
    }
    const handleFormCreateUser = async (e)=>{
        e.preventDefault()
        try{
            setError({
                telephone:!formCreate.telephone,
                fullname:!formCreate.fullname,
                username:!formCreate.username,
                password:!formCreate.password
            })
            const responsecreate = await fetch('http://localhost:3001/api/crateuser',{
                method:"POST",
                headers:{
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                },
                body:JSON.stringify({
                    code:generateCode(),
                    fullname:formCreate.fullname,
                    telephone:formCreate.telephone,
                    username:formCreate.username,
                    password:formCreate.password
                })
            })
            if(!responsecreate.ok) throw new Error(`Is error status:${responsecreate.status}`)
            const resultcreate = await responsecreate.json()
        console.log({resultcreate})
            if(resultcreate.statusCode === 201){
                Swal.fire({
                    icon:"success",
                    title:"create success",
                    text:`create user name formCreate.fullname to success`,
                    showConfirmButton:false,
                    timer:1500
                }).then(()=>{
                    setModelCreateUser(false)
                    window.location.reload()
                })
            }else if(resultcreate.statusCode === 203){
                setClose(true)
                console.log("true")
            }
        }catch(e){
            console.error(e)
        }
    }
    return (
        <div 
            id="default-modal" tabIndex={-1}
            className="fixed left-0 right-0 top-0 z-50 h-[calc(90%-1rem)] max-h-full w-full overflow-y-auto overflow-x-hidden flex items-center justify-center p-4 md:inset-0"
        >
            <div className="relative p-4 w-full max-w-xl max-h-full">
                <div className="relative bg-white rounded-lg shadow bg-gray-100">
                    <div className="p-4 md:p-5 space-y-4">
                        <div className="w-full flex flex-row">
                            <div className="flex mx-4">
                                <span className="font-bold uppercase hover:text-blue-800">create user</span>
                            </div>
                            <button
                                type="button"
                                className="ml-auto end-2.5 text-dark-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center"
                                onClick={()=>setModelCreateUser(false)}
                            >
                                <FontAwesomeIcon icon={faXmark} className="h-5 w-5 text-dark-500"/>
                            </button>
                        </div>
                        <form className="space-y-4 mx-4 mt-2" onSubmit={handleFormCreateUser}>
                            {close ? <Alert text={"มี username นี้แล้ว โปรดใช้ username อื่น"} setClose={setClose} /> : null}
                            <div className="">
                                <label htmlFor="fullname" className="text-xs font-bold uppercase">กรอก fullname</label>
                                <input 
                                    type="text" 
                                    name="fullname"
                                    placeholder="please enter your name" 
                                    className={`bg-white border ${error.fullname ? 'border-red-500' : 'border-gray-300'} text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-3`}
                                    value={formCreate.fullname}
                                    onChange={handleChange}

                                />
                            </div>
                            <div className="">
                                <label htmlFor="telephone" className="text-xs font-bold uppercase">กรอก telephone</label>
                                <input 
                                    type="text" 
                                    name="telephone"
                                    placeholder="กรอก เบอร์โทร" 
                                    className={`bg-white border ${error.telephone ? 'border-red-500' : 'border-gray-300'} text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-3`}
                                    value={formCreate.telephone}
                                    onChange={(e)=>{
                                        const inputValue = e.target.value;
                                        if(/^\d*$/.test(inputValue)){
                                            setFormCreate({
                                                ...formCreate,
                                                ['telephone']:inputValue
                                            })
                                        }
                                    }}

                                />
                            </div>
                            <div className="">
                                <label htmlFor="username" className="text-xs font-bold uppercase">กรอก username</label>
                                <input 
                                    type="text" 
                                    name="username"
                                    placeholder="please enter username" 
                                    className={`bg-white border ${error.username ? 'border-red-500' : 'border-gray-300'} text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-3`}
                                    value={formCreate.username}
                                    onChange={handleChange}

                                />
                            </div>
                            <div className="">
                            <label htmlFor="password" className="text-xs font-bold uppercase">กรอก password</label>
                                <div className="relative">
                                    <input 
                                        type={showPassword ? "text" : "password"} 
                                        name="password"
                                        placeholder="Please enter your password" 
                                        className={`bg-white border ${error.password ? 'border-red-500' : `border-gray-300`} text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-3`}
                                        value={formCreate.password}
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
                                className="uppercase font-bold w-full text-white bg-gradient-to-r from-blue-400 via-blue-500 to-blue-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 shadow-lg shadow-blue-500/50 font-medium rounded-lg text-sm px-5 py-3 text-center mt-2 mb-2"
                            >Crete User</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}