import Wrapper from "@/components/wrapper";
import Link from "next/link";


export default function Login() {
   return (
      <Wrapper>
            <h1 className="text-center w-full mt-28 mb-10">Please insert your username and password</h1>
            <input placeholder="Username" id="username" type="text" className="border-[1px] h-10 border-gray-500 rounded-sm px-4 w-64" />
            <input placeholder="Password" id="password" type="password" className="border-[1px] h-10 border-gray-500 rounded-sm px-4 w-64" />
            <button className="bg-yellow-400 px-4 rounded-md w-64 h-8 font-bold hover:brightness-105 hover:text-white">Log in</button>
            <div className="flex h-20 items-center mb-72 sm:mb-20">
               <h1 className="text-center w-full font-normal">Do not have an account?</h1>
               <Link href="/signup" className="text-blue-400 w-auto text-nowrap mx-3">Sign up</Link>
            </div>
      </Wrapper>
   )
}
            