import React,{useState} from "react"
import { faEye, faEyeSlash } from "@fortawesome/free-regular-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import Alert from "../components/Alert"
import Swal from "sweetalert2"

export default function Login(){
    const gettokens = (token)=>{
        sessionStorage.setItem('token',JSON.stringify(token))
    }
    const [close,setClose] = useState(false)
    const [username,setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [showPassword,setShowPassword] = useState(false)

    const [error, setError] = useState({
        username:false,
        password:false
    })

    const handleFormLogin = async (e)=>{
        e.preventDefault()
        try{
            setError({
                username:!username,
                password:!password
            })
            const response = await fetch('http://localhost:3001/api/login',{
                method:"POST",
                body:JSON.stringify({
                    username:username,
                    password:password
                }),
                headers:{
                    Accept: 'application/json',
                    'Content-Type': 'application/json' 
                }
            })
            if(!response.ok) throw new Error(`Error status: ${response.status}`)
            const resultdata = await response.json()
            console.log({resultdata})
            if(resultdata.statusCode === 201){
                gettokens(resultdata.token)
                Swal.fire({
                    icon:"success",
                    text:"login success",
                    showConfirmButton: false,
                    timer:1500
                }).then(()=>window.location.pathname ="/in/page")
            }else if(resultdata.statusCode === 203){
                setClose(true)
                // Swal.fire({
                //     icon:"error",
                //     text:"login ไม่สำเร็จ",
                //     showConfirmButton: false,
                //     timer:1500
                // })
            }
        }catch(e){
            console.log(`Is Error : ${e}`)
        }
    }

    return (
        <div className="flex items-center justify-center h-screen bg-gray-50 ">
            <div className="max-w-xl w-full space-y-8">
                
                <div className="rounded bg-white max-w-xl rounded overflow-hidden shadow-2xl p-5">
                    <h2 className="my-3 text-center text-xl font-extrabold text-gray-900">
				    	Login to your account
				    </h2>
                    <form noValidate className="space-y-4 mx-4 mt-2" onSubmit={handleFormLogin}>
                        {close ? <Alert text={"login ไม่สำเร็จ Username หรือ password ไม่ถูกต้อง"} setClose={setClose} /> : null}
                        <div className="">
                            <input 
                                type="Username" 
                                placeholder="Please enter your Username" 
                                className={`bg-gray-50 border ${error.username ? 'border-red-500' : 'border-gray-300'} text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-3`}
                                value={username}
                                onChange={(e)=>setUsername(e.target.value)}
                                required 
                            />
                        </div>
                        <div className="">
                            <div className="relative">
                            <input 
                                type={showPassword ? "text" : "password"} 
                                placeholder="Please enter your password" 
                                className={`bg-gray-50 border ${error.password ? 'border-red-500' : 'border-gray-300'} text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-3`}
                                value={password}
                                onChange={(e)=>setPassword(e.target.value)}
                                required 
                            />
                            <button 
                                type="button" onClick={()=>setShowPassword(!showPassword)}
                                className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500 focus:outline-none"
                            >
                                <FontAwesomeIcon icon={showPassword ? faEye : faEyeSlash} />
                            </button>
                            </div>
                        </div>
                        <button 
                            type="submit" 
                            className="uppercase font-bold w-full text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 shadow-lg shadow-green-500/50 font-medium rounded-lg text-sm px-5 py-3 text-center mt-2 mb-2"
                        >Login</button>
                        <div className="flex w-full justify-center">
                            <a href="/register" className="text-center hover:text-blue-500">สมัครสามาชิก</a>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}