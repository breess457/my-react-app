import React,{useContext, useState} from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-regular-svg-icons";
import { faSignIn } from "@fortawesome/free-solid-svg-icons";
import { NavLink } from "react-router-dom";
import { GetContect } from "../App";

export default function Home(){
    const {token} = useContext(GetContect)
    if(token){
        window.location.pathname ="/in/page"
    }
    return (
     
        <div className="flex items-center justify-center h-screen">
            <div className="flex flex-row bg-white">
                <NavLink 
                    className="text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 shadow-lg shadow-green-500/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
                    to={"/login"}
                >
                    <FontAwesomeIcon icon={faSignIn} className="mx-2"/> เข้าสูระบบ เพื่อใช้งาน
                </NavLink>
                <NavLink
                    className="text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 shadow-lg shadow-green-500/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
                    to={"/register"}
                >
                    <FontAwesomeIcon icon={faUser} className="mx-2"/> สมัครสมาชิก เพื่อใช้งาน
                </NavLink>
            </div>
        </div>
    )
}