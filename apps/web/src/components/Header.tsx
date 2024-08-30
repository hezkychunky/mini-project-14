"use client"

import Link from "next/link"
import { useState } from "react"

export const Navbar = () => {

  const [navbarOpen, setNavbarOpen] = useState(false)

  return (
    <nav className="h-16 bg-gradient-to-r from-emerald-500 via-indigo-500 to-purple-500 fixed w-full z-40">
      <ul className="flex justify-between px-6 h-full items-center">
        <Link className="text-white basis-1/4 text-center text-3xl font-bold" href="/">KONSERIA</Link>
        <Link className="text-black hover:scale-125 hidden md:block basis-1/4 text-center animate-pulse brightness-150 bg-yellow-600 rounded-xl hover:tracking-wide font-bold" href="/">Upcoming!</Link>
        <Link className="text-white hover:scale-125 hidden md:block basis-1/4 text-center" href="/">Past Events</Link>
        <Link className="text-white hover:scale-125 hidden md:block" href="/login">Log in</Link>
        <Link className="text-white hover:scale-125 hidden md:block" href="/signup">Sign up</Link>
        <li onClick={()=>{setNavbarOpen(!navbarOpen)}} className="md:hidden"><Link href="#"><svg className={navbarOpen? 'close' : 'open'} xmlns="http://www.w3.org/2000/svg" height="28px" viewBox="0 -960 960 960" width="28px" fill="#e8eaed"><path d="M120-240v-80h720v80H120Zm0-200v-80h720v80H120Zm0-200v-80h720v80H120Z"/></svg><svg className={navbarOpen? 'open' : 'close'} xmlns="http://www.w3.org/2000/svg" height="30px" viewBox="0 -960 960 960" width="30px" fill="#e8eaed"><path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z"/></svg></Link></li>
      </ul>
      <div className={navbarOpen? 'open' : 'close'}>
        <ul className="flex flex-col pt-20 gap-20 justify-start items-center bg-transparent backdrop-blur-md h-lvh w-80 fixed right-0 border-l-4 border-indigo-500">
          <Link className="text-black hover:scale-125 text-center w-32 brightness-150 bg-yellow-600 rounded-xl hover:tracking-wide font-bold" href="/">Upcoming!</Link>
          <Link className="text-black font-bold hover:scale-125 text-center" href="/">Past Events</Link>
          <Link className="text-black font-bold hover:scale-125" href="/login">Log in</Link>
          <Link className="text-black font-bold hover:scale-125" href="/signup">Sign up</Link>
        </ul>
      </div>
    </nav>
  )
} 