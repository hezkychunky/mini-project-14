"use client"
import Wrapper from "@/components/wrapper"
import axios from "axios"
import { useRouter } from "next/navigation"
import { useState } from "react"

const PublicURL = process.env.NEXT_PUBLIC_BASE_API_URL

export default function Payment() {
    const Router = useRouter()
    const [konserId, setKonserId] = useState('')
    const [referral, setReferral] = useState('')
    const HandleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        try {
            const response = await axios.post(`${PublicURL}/payment`, {
                konserId,
                referral
            }, {
                headers: {
                    'Content-Type' : 'application/json',
                }
            })
            const result = response.data
            if (!result) {
                alert('Something went wrong, please Try Again')
            } else {
                alert('Payment created Succesfully')
            }
        } catch (error) {
            console.error('Error processing payment: ', error)
            alert('Failed to process payment. Please check your input or try again later.')

            if (axios.isAxiosError(error) && error.response) {
                console.error('Server responded with: ', error.response.data)
            }
        }
    }

    return (
        <Wrapper>
            <div>
                <form onSubmit={HandleSubmit}>
                    <label>
                        Concert ID:
                        <input 
                            type="text"
                            value={konserId}
                            onChange={(e) => setKonserId(e.target.value)}
                            required
                        />
                    </label>
                    <label>
                        Referral Code "This is Optional":
                        <input 
                            type="text"
                            value={referral}
                            onChange={(e) => setReferral(e.target.value)} 
                        />
                    </label>
                    <button type="submit">Request Payment</button>
                </form>
            </div>
        </Wrapper>
    )
}