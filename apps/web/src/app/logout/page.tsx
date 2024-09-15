'use client'
import { useUserLogin } from "@/context/UserContext"
import { removeToken } from "@/networkcall/server"
import { useRouter } from "next/navigation"
import { useState } from "react"


export default function Logout() {

   const userLogin = useUserLogin()
   userLogin.id=0

   removeToken()
   const router = useRouter() 
   router.push('/login')
   return (
      <div className="h-full w-full bg-magenta-500 flex items-center justify-center">
         <h1>LOGGED OUT</h1>
      </div>
   )
}