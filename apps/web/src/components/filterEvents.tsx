'use client'
import { Konser } from "@/lib/konser";
import axios from "axios";
import Image from "next/image";
import { useEffect, useState } from "react";
import Link from "next/link";

const PublicURL = process.env.NEXT_PUBLIC_BASE_API_URL;

const FilterEvents = () => {
    const [city, setCity] = useState('');
    const [priceRange, setPriceRange] = useState('')
    const [events, setEvents] = useState<Konser[]>([]);
    const [page, setPage] = useState(1);
    const limit = 2;

    const fetchEvents = async () => {
        try {
            const response = await axios.get(`${PublicURL}/filters`, {
                params: {
                    city,
                    priceRange,
                    limit,
                    page,
                },
            });
            setEvents(response.data);
        } catch (error) {
            console.error('Error fetching Events: ', error);
        }
    };

    useEffect(() => {
        if (city) {
            fetchEvents();
        }
    }, [city, priceRange, page]);

    return (
        <div className="p-4">
            <input
                type="text"
                placeholder="Enter City Name"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                className="border p-2 rounded mb-4"
            />
            <select 
                value={priceRange}
                onChange={(e) => setPriceRange(e.target.value)}
                className="border p-2 rounded mb-4"
            >
                <option value="">Select Price Range</option>
                <option value="0-500000">Rp 0 - Rp 500,000</option>
                <option value="500000-1000000">Rp 500,000 - Rp 1,000,000</option>
                <option value="1000000-1500000">Rp 1,000,000 - Rp 1,500,000</option>
                <option value="1500000+">Rp 1,500,000++</option>
            </select>
            <button onClick={() => fetchEvents()} className="bg-blue-300 text-neutral-600 p-2 rounded mb-4">Search</button>

            <div>
                <h2 className="text-xl mb-4">Events</h2>
                {events.length === 0 ? (
                    // Show this message if no events are found
                    <div className="flex flex-col items-center justify-center text-center text-gray-500 mt-8">
                        <div className="animate-bounce mb-4">
                            <Image
                                src="/images/Designer.jpeg"
                                alt="No concerts"
                                width={150}
                                height={150}
                            />
                        </div>
                        <p className="text-lg font-semibold mb-2">No concerts in this city.</p>
                        <p className="mb-4">Try searching for concerts in other cities, or check back later for updates.</p>
                        <p className="text-sm italic text-gray-400">"Music is everywhere; just give it some time."</p>
                    </div>
                ) : (
                    // Display events if available
                    <div className="flex space-x-5 overflow-x-auto">
                        {events.map((event) => (
                            <div key={event.id} className="min-w-[200px] border p-4 rounded shadow-md">
                                <h3 className="text-lg font-bold">{event.namaKonser}</h3>
                                <div className="relative mb-4">
                                    <Image
                                        src={`/images/${event.gambarKonser}`}
                                        alt={event.namaKonser}
                                        height={220}
                                        width={110}
                                        className="rounded-lg border-4 border-teal-500"
                                    />
                                    <p className="text-gray-700 mb-2"><strong>Description:</strong> {event.deskripsiKonser}</p>
                                    <p className="text-gray-600 mb-2"><strong>Time:</strong> {event.waktu}</p>
                                    <p className="text-gray-600 mb-2"><strong>Date:</strong> {new Date(event.tanggal).toLocaleDateString()}</p>
                                    <p className="text-gray-600 mb-4"><strong>Location:</strong> {event.lokasi}</p>
                                    <Link href={`/konsers/${event.id}`} passHref>
                                        <button className="bg-teal-500 text-white px-4 py-2 rounded-lg hover:bg-teal-600 focus:outline-none focus:ring-2 focus:ring-teal-400">View More</button>
                                    </Link>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            <div className="mt-4 flex justify-between items-center">
                <button
                    onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
                    disabled={page === 1}
                    className="bg-gray-500 text-white p-2 rounded disabled:bg-gray-300"
                >
                    Previous
                </button>
                <span>Page: {page}</span>
                <button
                    onClick={() => setPage((prev) => prev + 1)}
                    disabled={events.length < limit}
                    className="bg-blue-500 text-white p-2 rounded disabled:bg-gray-300"
                >
                    Next
                </button>
            </div>
        </div>
    );
};

export default FilterEvents;
