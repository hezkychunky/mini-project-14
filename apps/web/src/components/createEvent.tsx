"use client"
import { EventFormList } from '@/lib/konser';
import axios from 'axios';
import React, { useState } from 'react'

const PublicURL = process.env.NEXT_PUBLIC_BASE_API_URL

const defaultEventForm: EventFormList = {
  namaKonser: '',
  harga: undefined,
  tanggal: '',
  waktu: '',
  lokasi: '',
  deskripsiKonser: '',
  availableSeats: 0,
  ticketType: '',
  isPaidEvent: false,
  discount: undefined,
  discountExpiry: '',
  gambarKonser: null,
};

export default function EventForm() {
  const [formData, setFormData] = useState<EventFormList>(defaultEventForm)

  const HandleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, type, value, checked, files } = e.target as HTMLInputElement

    if (type === 'checkbox') {
      setFormData((prevData) => ({
        ...prevData,
        [name]: checked
      }))
    } else if (type === 'file' && files) {
      const file = files[0]
      setFormData((prevData) => ({
        ...prevData,
        gambarKonser: file
      }))
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [name]: value
      }))
    }
  }

  const HandleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const SendForm = new FormData();

    for (const key in formData) {
      if (Object.prototype.hasOwnProperty.call(formData, key)) {
        const NextValue = formData[key as keyof EventFormList]

        if (NextValue !== undefined &&
          NextValue !== null &&
          (typeof NextValue === 'string' || NextValue instanceof File)
        ) {
          SendForm.append(key, NextValue as string)
        }
      }
    }

    try {
      const response = await axios.post(`${PublicURL}/make-event`, SendForm, {
        headers: {
          'Content-Type': 'multipart/form-data',
        }
      })
      return response.data
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white shadow-md rounded-lg">
      <h1 className="text-2xl font-bold mb-6 text-center">Create New Event Form</h1>
      <form onSubmit={HandleSubmit} encType="multipart/form-data">
        <div className="mb-4">
          <label className="block text-gray-700 font-semibold mb-2">Event Name:</label>
          <input
            type="text"
            name="namaKonser"
            value={formData.namaKonser}
            onChange={HandleChange}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 font-semibold mb-2">Event Image:</label>
          <input
            type="file"
            name="gambarKonser"
            accept="image/*"
            onChange={HandleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 font-semibold mb-2">Price:</label>
          <input
            type="number"
            name="harga"
            value={formData.harga || ''}
            onChange={HandleChange}
            disabled={!formData.isPaidEvent}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 font-semibold mb-2">Date:</label>
          <input
            type="date"
            name="tanggal"
            value={formData.tanggal}
            onChange={HandleChange}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 font-semibold mb-2">Time:</label>
          <input
            type="time"
            name="waktu"
            value={formData.waktu}
            onChange={HandleChange}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 font-semibold mb-2">Location:</label>
          <input
            type="text"
            name="lokasi"
            value={formData.lokasi}
            onChange={HandleChange}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 font-semibold mb-2">Description:</label>
          <textarea
            name="deskripsiKonser"
            value={formData.deskripsiKonser}
            onChange={HandleChange}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 font-semibold mb-2">Available Seats:</label>
          <input
            type="number"
            name="availableSeats"
            value={formData.availableSeats}
            onChange={HandleChange}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 font-semibold mb-2">Ticket Type:</label>
          <input
            type="text"
            name="ticketType"
            value={formData.ticketType || ''}
            onChange={HandleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 font-semibold mb-2">Is Paid Event:</label>
          <input
            type="checkbox"
            name="isPaidEvent"
            checked={formData.isPaidEvent}
            onChange={HandleChange}
            className="w-5 h-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 font-semibold mb-2">Discount:</label>
          <input
            type="number"
            name="discount"
            value={formData.discount || ''}
            onChange={HandleChange}
            disabled={!formData.isPaidEvent}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 font-semibold mb-2">Discount Expiry:</label>
          <input
            type="date"
            name="discountExpiry"
            value={formData.discountExpiry || ''}
            onChange={HandleChange}
            disabled={!formData.isPaidEvent}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Create Event
        </button>
      </form>
    </div>
  )
}