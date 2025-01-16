import React,{useState,useEffect,useContext} from "react"
import { GetContect } from "../App"
import ModelEditProfile from "../components/EditProfile"
import Swal from "sweetalert2"
import ModelCreateFormUsers from "../components/ModelCreateUser"
import ModelFormEditUsers from "../components/ModelEditUser"
export default function InPage(){
        const {token,profileData} = useContext(GetContect)
        const [data, setData] = useState([])
        const [modalEditProfile,setModelEditProfile] = useState(false)
        const [modelCreateUser, setModelCreateUser] = useState(false)
        const formatEmail =(email)=>{
            const [localPath, domain] = email.split('@')
            const makeLocalPath = localPath.substring(0,2) + "***********"
            return `${makeLocalPath}@${domain}`
        }

        const removeToken = ()=>{
            sessionStorage.removeItem('token')
            //setToken(null)
            Swal.fire({
              icon:"success",
              title:"logout success",
              showConfirmButton:false,
              timer:1500
            }).then((result)=>{
              window.location.href = "/"
            })
          }
        
        const deleteUser = (code)=>{
            Swal.fire({
                title: "คุญแน่ใจเหรอ ?",
                text: "คุณจะไม่สามารถกู้คืนข้อมูลนี้ได้!",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Yes, delete it!",
            }).then(async(result)=>{
                if(result.isConfirmed){
                    try{
                        const responsedelete = await fetch(`http://localhost:3001/api/deleteuser?code=${code}`,{
                            method:"DELETE",
                            headers:{
                                Accept: 'application/json',
                                'Content-Type': 'application/json' 
                            },
                        })
                        if(!responsedelete.ok) throw new Error(`Is error response status code:${responsedelete.status}`)
                        const resutldelete = await responsedelete.json()
                        if(resutldelete.statusCode === 200){
                            Swal.fire({
                                icon:"success",
                                title:"delete success",
                                text:"`Your file has been deleted",
                                showConfirmButton:false,
                                timer:1500
                            }).then(()=>window.location.reload())
                        }
                    }catch(e){
                        console.error(e)
                        Swal.fire({
                            icon:"error",
                            title:"เกิดข้อผิดพลาด",
                            text:"ไม่สามารถลบข้อมูลเหล่านี้ได้ ติดต่อแอดมิน",
                        })
                    }
                }
            })
        }

        const [dataUserEdit, setDataUserEdit] = useState([])
        const [modelEditUser, setModelEditUser] = useState(false)

        useEffect(()=>{
            fetch('http://localhost:3001/api/alluser',{
                method:"GET",
                headers:{
                    Accept: 'application/json',
                    'Content-Type': 'application/json' 
                }
            })
            .then(res=>res.json())
            .then((data)=>setData(data.data))
            .catch(e=>console.error(`Is error : ${e}`))
        },[])
        if(!token){
            window.location.pathname ="/"
        }
        console.log({dada:data})
    return (
        <>
        <div className="flex flex-cols text-center justify-center">
            <div className="w-3/4 border bg-white p-6 shadow">
                <div className="w-full">
                    <span className="text-center w-auto text-xl">Profile</span>
                </div>
                <div className="w-full">
                    <div className="w-full flex flex-row my-3">
                        <div className="w-1/2">Fullname : {profileData.FullName}</div>
                        <div className="text-xl w-1/2">Phone : {profileData.TelePhone}</div>
                    </div>
                    <div className="w-full flex flex-row my-3">
                        <div className="text-xl w-2/3">Username : {profileData.UserName}</div>
                        <div className="text-xl w-1/3">Password : *****</div>
                    </div>
                    <div className="w-full flex mt-4">
                        <button 
                            className="ml-auto text-gray-900 bg-[#F7BE38] hover:bg-[#F7BE38]/90 focus:ring-4 focus:outline-none focus:ring-[#F7BE38]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center me-2 mb-2"
                            onClick={()=>setModelEditProfile(true)}
                        >
                            update profile
                        </button>
                        <button 
                            className="text-gray-900 bg-[#1a75ff] hover:bg-[#1a75ff]/90 focus:ring-4 focus:outline-none focus:ring-[#1a75ff]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center me-2 mb-2"
                            type="button" onClick={()=>removeToken()}
                        >
                            logout
                        </button>
                    </div>
                </div>
            </div>
        </div>
        <div className="border-t border-3 my-4 w-full border-gray-400 flex-grow"></div>
        <div className="w-full flex flex-col p-4">
            <button 
                type="button" 
                className="ml-auto text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 shadow-lg shadow-green-500/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
                onClick={()=>setModelCreateUser(true)}
            >
                create user
            </button>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mx-4">
            {data.map((usrdata,index)=>(
                <div className="w-full bg-white border border-gray-200 rounded-lg shadow" key={index}>
                    <div className="w-full">
                        <span>Fullname: {usrdata.FullName}</span>
                    </div>
                    <div className="w-full">
                        <span>Telephone: {usrdata.TelePhone}</span>
                    </div>
                    <div className="w-full">
                        <span>Username: {formatEmail(usrdata.UserName)}</span>
                    </div>
                    <div className="w-full flex flex-row my-3">
                        <button 
                            className="ml-auto text-gray-900 bg-[#F7BE38] hover:bg-[#F7BE38]/90 focus:ring-4 focus:outline-none focus:ring-[#F7BE38]/50 font-medium rounded-lg text-sm px-5 py-2 text-center inline-flex items-center me-2 mb-2"
                            type="button"
                            onClick={()=>{
                                setModelEditUser(true)
                                setDataUserEdit({...usrdata})
                            }}
                        >
                            update
                        </button>
                        {usrdata.Code !== profileData.Code
                         ? <button 
                                className="text-gray-900 bg-[#ff1a1a] hover:bg-[#ff1a1a]/90 focus:ring-4 focus:outline-none focus:ring-[#ff1a1a]/50 font-medium rounded-lg text-sm px-5 py-2 text-center inline-flex items-center me-2 mb-2"
                                type="button"
                                onClick={()=>deleteUser(usrdata.Code)}
                            > 
                                delete
                            </button>
                        :null }
                    </div>
                </div>
            ))}
        </div>
        {modalEditProfile ? <ModelEditProfile setModelEditProfile={setModelEditProfile}/> : null}
        {modelCreateUser ? <ModelCreateFormUsers setModelCreateUser={setModelCreateUser}/> : null}
        {modelEditUser ? <ModelFormEditUsers datausers={dataUserEdit} setModelEditUser={setModelEditUser} />:null}
        </>
    )
}