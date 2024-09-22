'use client'

import { useUserLogin } from "@/context/UserContext"
import Link from "next/link"

// import { useParams } from "next/navigation"
import { useContext, useEffect, useState } from "react"

export default function ProfilePage() {
   // const params = useParams<{ token: string }>()

   const { defaultLoginUser } = useContext(useUserLogin)
   const now = new Date()

   const [userInfo, setUserInfo] = useState({
      name: '',
      refNumber: '',
      balance: 0,
      coupon: false,
      role: '',
      couponValidUntil: '',
   })

   const [bonus, setBonus] = useState(0)

   const [coupon, setCoupon] = useState(false)

   useEffect(() => {
      fetch(`http://localhost:8000/api/bonuses/${defaultLoginUser.id}`)
         .then(response => response.json())
         .then(data => {
            const userBonus = data.sortedBonus
            const totalBonus = userBonus.length * 10000
            setBonus(totalBonus)
         })

   }, [])

   useEffect(() => {

      fetch(`http://localhost:8000/api/users/${defaultLoginUser.id}`)
         .then(response => response.json())
         .then(data => {
            setUserInfo({
               name: data.user.username,
               refNumber: data.user.ownedReferalNumber,
               balance: data.user.balance,
               coupon: data.user.coupon,
               role: data.user.role,
               couponValidUntil: data.user.couponValidUntil
            }
            )
         })
   }, [])

   const toDateCouponValid = new Date(userInfo.couponValidUntil) // Discount Expired Validation

   return (
      <div className="lg:flex my-8 h-auto w-full">
         <div className="w-full flex justify-center items-center">
            <div className="rounded-xl shadow-lg shadow-slate-500 h-auto w-3/4 bg-yellow-400 flex flex-col px-6 sm:px-20 py-10 text-xl font-semibold text-white gap-4">
               <h1 className="text-blue-600 text-3xl text-center mb-4">{userInfo.name}</h1>
               <h1>Balance: <span className="text-blue-500">{(userInfo.balance).toLocaleString('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 })}</span></h1>
               <h1>Points: <span className="text-blue-500">{(bonus).toLocaleString('id-ID', { style: 'decimal' })}</span></h1>
               {toDateCouponValid >= now && <div>
                  <button className="text-left text-sm bg-blue-500 w-16 h-6 shadow-md shadow-slate-500 rounded-md pl-1 hover:scale-110 hover:brightness-110">10% Off</button><span className="text-sm ml-2 font-normal">Discount Available</span>
               </div>}
               <h1 className="text-center mt-20">Get <span className="text-slate-700">10.000</span> points</h1>
               <h1 className="text-center lg:text-sm text-xs font-light">for every registration using your referral number below:</h1>
               <h1 className="text-slate-700 lg:text-3xl text-xl text-center">{userInfo.refNumber}</h1>
               {userInfo.role === 'Admin' &&
                  <div className="flex justify-center gap-4 text-sm">
                     <Link href='/dashboard' className="z-20">
                        <button className="border-2 border-white rounded-xl h-10 w-32 text-white bg-blue-600 hover:scale-105 text-center">Dashboard</button>
                     </Link>
                     <Link href='/create-event'>
                        <button className="border-2 border-white rounded-xl h-10 w-32 text-white bg-blue-600 hover:scale-105 text-center">Create Event</button>
                     </Link>
                  </div>
               }
            </div>
         </div>
      </div>
   )
}