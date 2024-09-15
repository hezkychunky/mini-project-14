'use client'

import { useUserLogin } from "@/context/UserContext";
import Link from "next/link";


export function NavigationBar() { 

   const userLogin = useUserLogin()
   

   return (
      <nav className="z-40 px-2 shadow bg-gradient-to-r from-emerald-500 via-indigo-500 to-yellow-400 sticky top-0">
         <div className="relative mx-auto flex max-w-screen-lg flex-col py-4 sm:flex-row sm:items-center sm:justify-between">
            <Link className="flex items-center text-2xl font-black" href="/">
               <span className="mr-2 text-2xl text-white"></span>
               <span className="text-white">KONSERIA</span>
            </Link>
            <input className="peer hidden" type="checkbox" id="navbar-open" />
            <label className="absolute right-0 mt-1 cursor-pointer text-xl sm:hidden" htmlFor="navbar-open">
               <span className="sr-only">Toggle Navigation</span>
               <svg xmlns="http://www.w3.org/2000/svg" width="0.88em" height="1em" preserveAspectRatio="xMidYMid meet" viewBox="0 0 448 512"><path fill="currentColor" d="M0 96c0-17.7 14.3-32 32-32h384c17.7 0 32 14.3 32 32s-14.3 32-32 32H32c-17.7 0-32-14.3-32-32zm0 160c0-17.7 14.3-32 32-32h384c17.7 0 32 14.3 32 32s-14.3 32-32 32H32c-17.7 0-32-14.3-32-32zm448 160c0 17.7-14.3 32-32 32H32c-17.7 0-32-14.3-32-32s14.3-32 32-32h384c17.7 0 32 14.3 32 32z" /></svg>
            </label>
            <nav aria-label="Header Navigation" className="peer-checked:block hidden pl-2 py-6 sm:block sm:py-0">
                  <ul className="flex flex-col gap-y-4 sm:flex-row sm:gap-x-8">
                     <li className=""><Link className="text-white hover:scale-110" href="/">Upcoming</Link></li>
                     <li className=""><Link className="text-white hover:scale-110" href="/">Past Events</Link></li>
                     {userLogin.id > 0? 
                     <div className="flex gap-4">
                        <li className="mt-2 sm:mt-0"><Link className="rounded-xl border-2 border-white px-6 py-2 font-medium text-white hover:bg-blue-600 hover:text-white" href={`/profile/${userLogin.username}`}>Profile</Link></li>
                        <li className="mt-2 sm:mt-0"><Link className="rounded-xl border-2 border-white px-6 py-2 font-medium text-white hover:bg-blue-600 hover:text-white" href="/logout">Logout</Link></li>  
                     </div>: 
                     <div className="flex gap-4">
                        <li className="mt-2 sm:mt-0"><Link className="rounded-xl border-2 border-white px-6 py-2 font-medium text-white hover:bg-blue-600 hover:text-white" href="/login">Login</Link></li>
                        <li className="mt-2 sm:mt-0"><Link className="rounded-xl border-2 border-white px-6 py-2 font-medium text-white hover:bg-blue-600 hover:text-white" href="signup">Sign Up</Link></li>
                     </div>}
                  </ul>
            </nav>
         </div>
      </nav>
   )
}