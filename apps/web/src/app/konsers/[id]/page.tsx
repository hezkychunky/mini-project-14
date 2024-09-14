"use client";
import Wrapper from "@/components/wrapper";
import { FormatCurrency } from "@/lib/currency";
import { Konser } from "@/lib/konser";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const PublicURL = process.env.NEXT_PUBLIC_BASE_API_URL;

const ConcertDetailsPage = () => {
  const { id } = useParams(); // Access route parameter
  const router = useRouter()

  const [Details, setDetails] = useState<Konser | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (id) {
      const fetchData = async () => {
        try {
          const response = await axios.get<Konser>(`${PublicURL}/list/${id}`, {
            timeout: 5100,
          });
          setDetails(response.data);
        } catch (error) {
          console.error("Error fetching the data: ", error);
          setError("Error showing the details");
        }
      };
      fetchData();
    }
  }, [id]);

  const handleBuy = async (KonserId: number) => {
    const response = await axios.post(`${PublicURL}/payment`, {
      konserId: KonserId
    })
    const paymentID = response.data.Payment.id
    router.push(`/payment/${paymentID}`)
  }

  if (error) {
    return (
      <Wrapper>
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
          <div className="p-6 bg-red-100 border border-red-300 text-red-700 rounded-lg shadow-md">
            <p>Error: {error}</p>
          </div>
        </div>
      </Wrapper>
    );
  }

  if (!Details) {
    return (
      <Wrapper>
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
          <div className="p-6 bg-gray-200 border border-gray-300 text-gray-700 rounded-lg shadow-md">
            <p>Loading...</p>
          </div>
        </div>
      </Wrapper>
    );
  }

  return (
    <Wrapper>
      <div className="p-6 bg-white border border-gray-300 rounded-lg shadow-md">
        <Link href={'/konsers'} passHref>
          <button className="bg-teal-300 text-white px-4 py-2 rounded-lg hover:bg-teal-400 focus:outline-none focus:ring-2 focus:ring-teal-500">Go Back</button>
        </Link>
        <h2 className="text-2xl font-bold mt-4 mb-2">Concert Details</h2>
        <div className="flex flex-col items-center">
          <Image
            src={`/images/${Details.gambarKonser}`}
            alt={Details.namaKonser}
            height={220}
            width={110}
            className="rounded-lg shadow-md"
          />
          <div className="mt-4 space-y-2 text-lg">
            <p><strong>Name:</strong> {Details.namaKonser}</p>
            <p><strong>Description:</strong> {Details.deskripsiKonser}</p>
            <p><strong>Location:</strong> {Details.lokasi}</p>
            <p><strong>Date:</strong> {new Date(Details.tanggal).toLocaleDateString()}</p>
            <p><strong>Time:</strong> {Details.waktu}</p>
          </div>

          <h2 className="text-xl font-semibold mt-6 mb-2">Event Details</h2>
          <div className="space-y-4">
            {Details.event_details.length > 0 ? (
              Details.event_details.map((eventDetail) => (
                <div key={eventDetail.konserId} className="p-4 bg-gray-100 border border-gray-200 rounded-lg shadow-sm">
                  <p><strong>Price:</strong> {FormatCurrency(eventDetail.harga)}</p>
                  <p><strong>Seats Available:</strong> {eventDetail.availableSeats}</p>
                  <p><strong>Discount:</strong> {eventDetail.discount ?? 'N/A'}%</p>
                  <p>
                    <strong>Discount Expire:</strong> {eventDetail.discountExpiry
                      ? new Date(eventDetail.discountExpiry).toLocaleDateString()
                      : 'N/A'}
                  </p>
                  <button
                    className="mt-2 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    onClick={() => handleBuy(eventDetail.konserId)}
                  >
                    Buy
                  </button>
                </div>
              ))
            ) : (
              <p>No event details available.</p>
            )}
          </div>
        </div>
      </div>
    </Wrapper>
  );
};

export default ConcertDetailsPage;
