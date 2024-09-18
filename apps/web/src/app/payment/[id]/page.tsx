"use client"

import Wrapper from "@/components/wrapper";
import { FormatCurrency } from "@/lib/currency";
import { Paychecks } from "@/lib/paycheck";
import axios from "axios";
import { useRouter, useParams } from "next/navigation";
import { useEffect, useState } from "react";

const PublicURL = process.env.NEXT_PUBLIC_BASE_API_URL;

const PaymentChecks = () => {
    const router = useRouter()
    const { id } = useParams()
    const [paymentDetails, setPaymentDetails] = useState<Paychecks | null>(null)

    useEffect(() => {
        if (id) {
            fetchPaymentDetails(id)
        }
    }, [id])

    const fetchPaymentDetails = async (paymentID: string | string[]) => {
        try {
            const response = await axios.get(`${PublicURL}/payment/${paymentID}`)
            setPaymentDetails(response.data)
        } catch (error) {
            console.error("Error fetching payment details:", error)
        }
    }

    const HandleThePay = async () => {
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
        <Wrapper>
            <div className="p-6 bg-gray-100 rounded-lg shadow-md max-w-md mx-auto mt-10">
                <h1 className="text-2xl font-bold text-gray-900 mb-4">Checkout Details</h1>
                {paymentDetails ? (
                    <div className="bg-white p-4 rounded-lg shadow-md">
                        <p className="text-lg font-semibold text-gray-800 mb-2">Amount: <span className="font-normal text-gray-600">{FormatCurrency(paymentDetails.amount)}</span></p>
                        <p className="text-lg font-semibold text-gray-800 mb-2">Status: <span className="font-normal text-gray-600">{paymentDetails.status}</span></p>
                        <p className="text-lg font-semibold text-gray-800 mb-4">Pay Created: <span className="font-normal text-gray-600">{new Date(paymentDetails.createdAt).toLocaleDateString()}</span></p>

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

        </Wrapper>
    )
}

export default PaymentChecks