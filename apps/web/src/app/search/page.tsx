"use client"

import Wrapper from "@/components/wrapper"
import { Konser } from "@/lib/konser"
import { searchConcerts } from "@/lib/search"
import debounce from "lodash/debounce"
import Image from "next/image"
import Link from "next/link"
import { useSearchParams } from "next/navigation"
import { useCallback, useEffect, useState } from "react"

export default function Search() {
    const searchParams = useSearchParams()
    const encodedQuery = searchParams.get('query')
    const query = encodedQuery ? decodeURIComponent(encodedQuery) : ''
    const [results, setResults] = useState<Konser[]>([])

    const debouncedSearch = useCallback(
        debounce(async (dataQuery) => {
            if (dataQuery) {
                const searchResult = await searchConcerts(dataQuery)
                setResults(searchResult)
            } else {
                setResults([])
            }
        }, 300),
        []
    )

    useEffect(() => {
        debouncedSearch(query)
    }, [query, debouncedSearch])

    return (
        <Wrapper>
            <div className="space-y-6 p-6 bg-gray-50">
                <h1 className="text-3xl font-bold text-gray-800 mb-4">Search Results</h1>
                {results.length > 0 ? (
                    <div className="space-y-6">
                        {results.map((result) => (
                            <div key={result.id} className="bg-white p-4 border border-blue-300 rounded-lg shadow-md">
                                <p className="text-lg font-semibold text-gray-900 mb-2">Concert Name: {result.namaKonser}</p>
                                <div className="relative mb-4">
                                    <Image
                                        src={`/images/${result.gambarKonser}`}
                                        alt={result.namaKonser}
                                        height={220}
                                        width={110}
                                        className="rounded-lg border-4 border-teal-500"
                                    />
                                </div>
                                <p className="text-gray-700 mb-2"><strong>Description:</strong> {result.deskripsiKonser}</p>
                                <p className="text-gray-600 mb-2"><strong>Time:</strong> {result.waktu}</p>
                                <p className="text-gray-600 mb-2"><strong>Date:</strong> {new Date(result.tanggal).toLocaleDateString()}</p>
                                <p className="text-gray-600 mb-4"><strong>Location:</strong> {result.lokasi}</p>
                                <Link href={`/konsers/${result.id}`} passHref>
                                    <button className="bg-teal-500 text-white px-4 py-2 rounded-lg hover:bg-teal-600 focus:outline-none focus:ring-2 focus:ring-teal-400">View More</button>
                                </Link>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="p-4 bg-gray-100 border border-gray-300 rounded-lg transform transition-transform duration-500 ease-in-out hover:scale-105 hover:shadow-lg animate-pulse text-center pb-20">
                        <p className="text-gray-700 mb-2">No Concerts Found</p>
                        <p className="text-gray-600 mb-4">Maybe next Time</p>
                        <div className="flex justify-center">
                            <svg className="w-16 h-16 text-gray-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3l18 18M3 21l18-18" />
                            </svg>
                        </div>
                    </div>
                )}
            </div>
        </Wrapper>
    )
}