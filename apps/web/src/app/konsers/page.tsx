'use client';
import Wrapper from '@/components/wrapper';
import { Konser } from '@/lib/konser';
import axios from 'axios';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
const PublicURL = process.env.NEXT_PUBLIC_BASE_API_URL;

export default function KonserLaman() {
  const [Concerts, setConcerts] = useState<Konser[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const FetchData = async () => {
      try {
        const response = await axios.get(`${PublicURL}/list`, {
          timeout: 2000,
        });
        setConcerts(response.data);
      } catch (error) {
        setError('Error Fetching the Data');
      }
    };

    FetchData();
  }, []);

  if (error) {
    return (
      <Wrapper>
        <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
          <p className="text-red-500 text-lg font-semibold">{error}</p>
        </div>
      </Wrapper>
    );
  }

  return (
    <Wrapper>
      <div className="p-6 bg-gray-50">
        <h1 className="text-3xl font-bold mb-6 text-gray-900">Concert List</h1>
        <Link href={'/events'}>
          <p className="text-blue-600 hover:text-blue-950 font-normal mb-2">
            Filter The Concert
          </p>
        </Link>
        {Concerts.length > 0 ? (
          Concerts.map((concert) => (
            <div
              key={concert.id}
              className="bg-white p-4 mb-6 border border-gray-200 rounded-lg shadow-sm"
            >
              <h2 className="text-2xl font-semibold mb-2 text-gray-800">
                {concert.namaKonser}
              </h2>
              <div className="relative mb-4">
                <Image
                  src={`/images/${concert.gambarKonser}`}
                  alt={concert.namaKonser}
                  height={220}
                  width={110}
                  className="rounded-lg border-4 border-blue-400"
                />
              </div>
              <p className="text-gray-700 mb-2">{concert.deskripsiKonser}</p>
              <p className="text-gray-600 mb-2">
                <strong>Time:</strong> {concert.waktu}
              </p>
              <p className="text-gray-600 mb-2">
                <strong>Date:</strong>{' '}
                {new Date(concert.tanggal).toLocaleDateString()}
              </p>
              <p className="text-gray-600 mb-4">
                <strong>Location:</strong> {concert.lokasi}
              </p>
              <Link
                href={`/konsers/${concert.id}`}
                className="text-teal-600 hover:text-teal-800 font-medium"
              >
                View More
              </Link>
            </div>
          ))
        ) : (
          <p className="text-gray-700">No Concerts Available.</p>
        )}
      </div>
    </Wrapper>
  );
}
