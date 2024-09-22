'use client'
import { useUserLogin } from "@/context/UserContext"
import { removeToken } from "@/networkcall/server"
import { useRouter } from "next/navigation"
import { useContext } from "react"


export default function Logout() {

   const {setDefaultLoginUser} = useContext(useUserLogin)
   
   setDefaultLoginUser({id:0, username: null})

   removeToken()
   const router = useRouter() 
   router.push('/login')
   return (
      <div className="h-full w-full bg-magenta-500 flex items-center justify-center">
         <h1>LOGGED OUT</h1>
      </div>
   )
}