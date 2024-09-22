'use client'
import React, { useState, useEffect } from 'react'
import { Review } from '@/lib/konser'
import axios from 'axios'

const PublicURL = process.env.NEXT_PUBLIC_BASE_API_URL;

const ReviewSystem = () => {
    const [review, setReview] = useState<Review>({
        experience: '',
        quality: '',
        suggestions: '',
        rating: 0,
        ConcertId: 0,
    })

    const [message, setMessage] = useState('')

    const HandleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target
        setReview((prev) => ({ ...prev, [name]: value }))
    }

    const HandleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const numericRating = parseInt(review.rating.toString(), 10)

        const ReviewData = {
            experience: review.experience,
            quality: review.quality,
            suggestions: review.suggestions,
            rating: numericRating,
            ConcertId: review.ConcertId
        }

        try {
            const response = await axios.post(`${PublicURL}/reviews`, {
                rating: parseInt(review.rating.toString(), 10),
                ConcertId: parseInt(review.ConcertId.toString(), 10)
            })

            if (response.status === 201) {
                setMessage('Your review was submitted successfully!');

                // Clear form
                setReview({ experience: '', quality: '', suggestions: '', rating: 0, ConcertId: 0 });
            } else {
                setMessage('Failed to submit review.');
            }

        } catch (error) {
            console.error('Error submitting:', error)
            setMessage('Error')
        }
    }

    return (
        <div className='p-4'>
            <form onSubmit={HandleSubmit} className="space-y-4">
                <div>
                    <label htmlFor="experience" className="block text-gray-700">Overall Experience</label>
                    <textarea
                        id="experience"
                        name="experience"
                        value={review.experience}
                        onChange={HandleChange}
                        className="border rounded p-2 w-full"
                        required
                    />
                </div>
                <div>
                    <label htmlFor="quality" className="block text-gray-700">Quality of the Event</label>
                    <textarea
                        id="quality"
                        name="quality"
                        value={review.quality}
                        onChange={HandleChange}
                        className="border rounded p-2 w-full"
                        required
                    />
                </div>
                <div>
                    <label htmlFor="suggestions" className="block text-gray-700">Suggestions for Improvement</label>
                    <textarea
                        id="suggestions"
                        name="suggestions"
                        value={review.suggestions}
                        onChange={HandleChange}
                        className="border rounded p-2 w-full"
                    />
                </div>
                <div>
                    <label htmlFor="rating" className="block text-gray-700">Rating</label>
                    <input
                        id="rating"
                        name="rating"
                        type="number"
                        min="1"
                        max="5"
                        value={review.rating}
                        onChange={HandleChange}
                        className="border rounded p-2 w-full"
                        required
                    />
                </div>
                <div>
                    <label htmlFor="ConcertId" className="block text-gray-700">Concert ID</label>
                    <input
                        id="ConcertId"
                        name="ConcertId"
                        type="number"
                        value={review.ConcertId}
                        onChange={HandleChange}
                        className="border rounded p-2 w-full"
                        required
                    />
                </div>
                <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded">Submit Review</button>
            </form>

            <div className="mt-6">
                {message && <p className='flex'>{message}</p>}
            </div>
        </div>
    )
}

export default ReviewSystem
