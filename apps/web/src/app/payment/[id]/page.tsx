"use client"

import ProfilePage from "@/app/profile/[user]/page";
import { useUserLogin } from "@/context/UserContext";
import { FormatCurrency } from "@/lib/currency";
import { Paychecks } from "@/lib/paycheck";
import axios from "axios";
import { useRouter, useParams } from "next/navigation";
import { useContext, useEffect, useState } from "react";

const PublicURL = process.env.NEXT_PUBLIC_BASE_API_URL;

const PaymentChecks = () => {
    const router = useRouter()
    const { id } = useParams()
    const [paymentDetails, setPaymentDetails] = useState<Paychecks | null>(null)
    const now = new Date()

    useEffect(() => {
        if (id) {
            fetchPaymentDetails(id)
        }
    }, [id])

// DIVIDER
    
    const { defaultLoginUser } = useContext(useUserLogin)
    const [bonus, setBonus] = useState(0)
    const [userInfo, setUserInfo] = useState({
      name: '',
      refNumber: '',
      balance: 0,
      coupon: false,
      role: '',
      couponValidUntil: '',
   })

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


   const [isBonusApplied, setIsBonusApplied] = useState(false)
   const handleBonus = () => {
    setIsBonusApplied(!isBonusApplied)
   }
   const appliedBonus = isBonusApplied? bonus : 0

   const [isDiscountApplied, setIsDiscountApplied] = useState(false)
   const handleDiscount = () => {
    setIsDiscountApplied(!isDiscountApplied)
   }
   const appliedDiscount = isDiscountApplied? paymentDetails!.amount * 0.1 : 0
   
   const toDateCouponValid = new Date(userInfo.couponValidUntil) // Discount Expired Validation
   console.log(toDateCouponValid);
   
   

// DIVIDER

    const fetchPaymentDetails = async (paymentID: string | string[]) => {
        try {
            // const response = await axios.get(`${PublicURL}/payments/${paymentID}`)
            const response = await axios.get(`http://localhost:8000/api/payments/1`)
            setPaymentDetails(response.data)
            console.log(response.data);
            
        } catch (error) {
            console.error("Error fetching payment details:", error)
        }
    }

    const HandleThePay = async () => {

      if(userInfo.balance < paymentDetails!.amount) {
         alert(' Top-up needed, please spend your money')
      }

        try {
            const response = await axios.post(`${PublicURL}/confirm-payment`, {
                paymentID: id
            }, {
                headers: {
                    'Content-Type': 'application/json'
                },
            })
            if (response.status === 200) {
                alert('Payment confirmed Successfully')
                router.push('/payment-success')
            } else {
                alert('Failed to confirm Payment')
            }
        } catch (error) {
            console.error('Error confirming payment:', error);
            alert('An error occurred while confirming payment.');
        }
    }
    
    return (
         <div className="md:flex justify-evenly items-center">
            <div className="">
               <ProfilePage />
            </div>
            <div className="p-6 h-2/4 bg-yellow-400 rounded-xl shadow-lg shadow-slate-500  mt-3">
                <h1 className="text-2xl font-bold text-gray-900 mb-4">Checkout Details</h1>
                {paymentDetails ? (
                    <div className="bg-white p-4 rounded-lg shadow-md">
                        <p className="text-lg font-semibold text-gray-800 mb-2">Amount: <span className="font-normal text-gray-600">{FormatCurrency(paymentDetails.amount)}</span></p>
                        <p className="text-lg font-semibold text-gray-800 mb-2">Status: <span className="font-normal text-gray-600">{paymentDetails.status}</span></p>
                        <p className="text-lg font-semibold text-gray-800 mb-4">Pay Created: <span className="font-normal text-gray-600">{new Date(paymentDetails.createdAt).toLocaleDateString()}</span></p>
                        <div className="flex flex-col text-sm ">
                           { bonus >= 1 && <div>
                              <input onChange={handleBonus} type="checkbox" id="points" /><label className="mx-2" htmlFor="points">Use {bonus} points</label>
                           </div> }
                           {toDateCouponValid >= now && 
                           <div>
                              <input onChange={handleDiscount} type="checkbox" id="discount" /><label className="mx-2" htmlFor="discount">10% Off</label>
                           </div> }
                        </div>
                        <p className="text-lg font-semibold text-gray-800 mb-4">Total: <span className="font-normal text-gray-600">{

                        paymentDetails.amount - appliedBonus -appliedDiscount
                        
                        }</span></p>

                        <button
                            onClick={HandleThePay}
                            className="px-6 py-2 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-600 transition duration-300 transform hover:scale-105">
                            Confirm Payment
                        </button>
                    </div>
                ) : (
                    <div className="bg-white p-4 rounded-lg shadow-md text-center">
                        <p className="text-lg font-semibold text-gray-700">Loading Payment Details.....</p>
                    </div>
                )}
            </div>
         </div>
    )
}

export default PaymentChecks