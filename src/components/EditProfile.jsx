import { useContext, useState } from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faXmark } from "@fortawesome/free-solid-svg-icons"
import { GetContect } from "../App"
import Swal from "sweetalert2"
import Alert from "./Alert"

const ChengProfile = ({setTypeForm,setModelEditProfile})=>{
    const {profileData} = useContext(GetContect)
    const [isUsername, setIsUsername] = useState("")
    const [password, setPassword] = useState("")
    const [isStatus, setIsStatus] = useState(false)
    const [isDisabled, setIsDisabled] = useState(false)
    const [close, setClose] = useState(false)
    const handle = ()=>{
        console
        if(profileData.UserName === isUsername){
            setIsStatus(true)
            setClose(false)
            setIsDisabled(true)
        }else if(profileData.UserName !== isUsername){
            setClose(true)
            setIsStatus(false)
        }else{
            setIsStatus(false)
            setClose(false)
        }
    }
    const handleResetPassword = async(e)=>{
        try{
            const response = await fetch('http://localhost:3001/api/chengpassword',{
                method:"PUT",
                headers:{
                    Accept: 'application/json',
                    'Content-Type': 'application/json' 
                },
                body:JSON.stringify({
                    code:profileData.Code,
                    username:isUsername,
                    password:password
                })
            })
            if(!response.ok) throw new Error(`Is error status:${response.status}`)
            const result = await response.json()
            if(result.statusCode === 200){
                Swal.fire({
                    icon:"success",
                    title:"success",
                    text:"update password success",
                    showConfirmButton:false,
                    timer:1500
                }).then(()=>{
                    setModelEditProfile(false)
                })
            }
        }catch(e){
            console.error(e)
        }
    }


    return(
        <div className="space-y-4 mx-4">
            <div className="">
                <input 
                    type="text" className={`bg-gray-50 border ${isDisabled ? "border-green-500" : null} text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-3`}
                    value={isUsername} onChange={(e)=>setIsUsername(e.target.value)}
                    placeholder="กรอก username เพื่อเปลียน รหัสผ่าน"
                    disabled={isDisabled}
                />
            </div>
            {isStatus ? (
                <div className="">
                    <input 
                        type="text" className={`bg-gray-50 border text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-3`}
                        value={password} onChange={(e)=>setPassword(e.target.value)}
                        placeholder="กรอก รหัสผ่าน ใหม่"
                    />
                </div>
            ) : null}
            {close ? <Alert text={"username ไม่ถูกต้อง ไม่สามารถเปลียนรหัสผ่าน"} setClose={setClose}/> :null}
                    
            {isStatus ? (
                <div className="w-full flex flex-row">
                    <button 
                        type={"button"} 
                        className="ml-auto px-4 py-2 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-200 font-medium rounded-lg text-sm inline-flex justify-center w-full text-center"
                        onClick={handleResetPassword}
                    >
                        ยืนยัน เพื่อเปลียนรหัสผ่าน
                    </button>
                </div>
            ):(
                <div className="w-full flex flex-row">
                    <button 
                        type={"button"} 
                        onClick={handle} className="ml-auto px-4 py-2 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-200 font-medium rounded-lg text-sm inline-flex justify-center w-full text-center"
                    >ยืนยัน email</button>
                </div>
            )} 
        </div>
    )
}

const FormEditProfile = ({setTypeForm,setModelEditProfile})=>{
    const {profileData} = useContext(GetContect)
    const [form, setForm] = useState({
        telephone:profileData.TelePhone ?? '',
        fullname:profileData.FullName ?? '',
        username:profileData.UserName ?? '',
    })

    const handleChange = (e)=>{
        const {name, value} = e.target
        setForm({
            ...form,
            [name]:value
        })
    }

    const handleFormSubmit = async (e)=>{
        e.preventDefault()
        try{
            const responseedit = await fetch('http://localhost:3001/api/updateuser',{
                method:"PUT",
                headers:{
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                },
                body:JSON.stringify({
                    code:profileData.Code,
                    fullname:form.fullname,
                    telephone:form.telephone,
                    username:form.username
                })
            })
            if(!responseedit.ok) throw new Error(`Error Is status : ${responseedit.status}`)
            console.log({k:responseedit.status})
            const resultedit = await responseedit.json()
            console.log({resultedit})
            if(resultedit.statusCode === 200){
                Swal.fire({
                    icon:"success",
                    title:"success",
                    text:"edit profile success fully",
                    timer:1500,
                    showConfirmButton:false
                }).then(()=>{
                    setModelEditProfile(false)
                    window.location.reload()
                })
            }else if(resultedit.statusCode === 401){
                Swal.fire({
                    icon:"error",
                    title:"edit false",
                    text:resultedit.message,
                    timer:1500,
                    showConfirmButton:false
                })
            }
            
        }catch(e){
            console.error(e)
        }
    }
    return (
        <form className="space-y-4 mx-4" onSubmit={handleFormSubmit}>
            <div className="">
                <input
                    className={`bg-gray-50 border text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-3`}
                    name="fullname" type="text" onChange={handleChange} value={form.fullname} required
                />
            </div>
            <div className="">
                <input
                    className={`bg-gray-50 border text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-3`}
                    name="telephone" type="text" value={form.telephone} onChange={(e)=>{
                        const inputValue = e.target.value;
                        if(/^\d*$/.test(inputValue)){
                            setForm({
                                ...form,
                                ['telephone']:inputValue
                            })
                        }
                    }}
                    required
                />
            </div>
            <div className="">
                <input
                    className={`bg-gray-50 border text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-3`}
                    name="username" type="text" onChange={handleChange} value={form.username} required
                />
            </div>
            <div className="w-full flex flex-row">
                <button type={"submit"} className="ml-auto px-4 py-2 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-200 font-medium rounded-lg text-sm inline-flex justify-center w-full text-center">edit</button>
            </div>
        </form>
    )
}

export default function ModelEditProfile({...props}){
    const {profileData} = useContext(GetContect)
    const [typeForm, setTypeForm] = useState("profile")

    return (
        <div 
            id="default-modal" tabIndex={-1}
            className="fixed left-0 right-0 top-0 z-50 h-[calc(90%-1rem)] max-h-full w-full overflow-y-auto overflow-x-hidden flex items-center justify-center p-4 md:inset-0"
        >
            <div className="relative p-4 w-full max-w-xl max-h-full">
                <div className="relative bg-white rounded-lg shadow">
                    <div className="p-4 md:p-5 space-y-4">
                        <div className="w-full flex flex-row">
                            <div className="flex mx-4">
                                <span className="font-bold uppercase hover:text-blue-800">{typeForm === "profile" ? "แก้ไขข้อมูลโปรไฟล์" : "แก้ไขรหัสผ่าน"}</span>
                            </div>
                            <button
                                type="button"
                                className="ml-auto end-2.5 text-dark-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center"
                                onClick={()=>props.setModelEditProfile(false)}
                            >
                                <FontAwesomeIcon icon={faXmark} className="h-5 w-5 text-dark-500"/>
                            </button>
                        </div>
                        {typeForm === "profile" ? <FormEditProfile setTypeForm={setTypeForm} setModelEditProfile={props.setModelEditProfile} /> : <ChengProfile setTypeForm={setTypeForm} setModelEditProfile={props.setModelEditProfile} />}
                        <div className="w-full flex flex-row justify-center">
                        {typeForm === "profile" ? (
                                <span 
                                    className="text-center hover:text-blue-500"
                                    onClick={()=>setTypeForm("password")}
                                >เปลียน รหัสผ่าน</span>
                            ):(
                                <span 
                                    className="text-center hover:text-blue-500"
                                    onClick={()=>setTypeForm("profile")}
                                >แก้ไขข้อมูลโปรไฟล์</span> 
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}