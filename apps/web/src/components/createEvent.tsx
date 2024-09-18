"use client"
import React, { useState } from 'react';
import { AddEventData } from '@/lib/konser';
import { CreateEvent } from '@/lib/createEvent'; // Import the createEvent function and EventData type

const CreateEventPage = () => {
  const [formData, setFormData] = useState<AddEventData>({
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
    gambarKonser: '',
  });

  const [Pictures, setPictures] = useState<File | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const target = e.target;

    if (target instanceof HTMLInputElement) {
      const { name, type, value, checked, files } = target;

      if (type === 'checkbox') {
        setFormData((prevData) => ({
          ...prevData,
          [name]: checked,
        }));
      } else if (type === 'file' && files) {
        const File = files[0];
        setPictures(File);
        setFormData((prevData) => ({
          ...prevData,
          gambarKonser: File.name,
        }));
      } else {
        setFormData((prevData) => ({
          ...prevData,
          [name]: value,
        }));
      }
    } else if (target instanceof HTMLTextAreaElement) {
      const { name, value } = target;
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    } else if (target instanceof HTMLSelectElement) {
      const { name, value } = target;
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const FormattedData = new FormData();
    Object.keys(formData).forEach((key) => {
      FormattedData.append(key, (formData as any)[key]);
    });

    if (Pictures) {
      FormattedData.append('gambarKonser', Pictures);
    }

    try {
      const newEvent = await CreateEvent(formData);
      alert('Event created successfully!');
      console.log(newEvent);
    } catch (error) {
      alert('Error creating event');
      console.error(error);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white shadow-md rounded-lg">
      <h1 className="text-2xl font-bold mb-6 text-center">Create New Event Form</h1>
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <div className="mb-4">
          <label className="block text-gray-700 font-semibold mb-2">Event Name:</label>
          <input
            type="text"
            name="namaKonser"
            value={formData.namaKonser}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 font-semibold mb-2">Event Image:</label>
          <input 
            type="file"
            name="image"
            accept="image/*"
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 font-semibold mb-2">Price:</label>
          <input
            type="number"
            name="harga"
            value={formData.harga || ''}
            onChange={handleChange}
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
            onChange={handleChange}
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
            onChange={handleChange}
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
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 font-semibold mb-2">Description:</label>
          <textarea
            name="deskripsiKonser"
            value={formData.deskripsiKonser}
            onChange={handleChange}
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
            onChange={handleChange}
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
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 font-semibold mb-2">Is Paid Event:</label>
          <input
            type="checkbox"
            name="isPaidEvent"
            checked={formData.isPaidEvent}
            onChange={handleChange}
            className="w-5 h-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 font-semibold mb-2">Discount:</label>
          <input
            type="number"
            name="discount"
            value={formData.discount || ''}
            onChange={handleChange}
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
            onChange={handleChange}
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
  );
};

export default CreateEventPage;