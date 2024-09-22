"use client"
import { useRouter } from "next/navigation"
import { useState } from "react"

const SearchBar = () => {
    const [query, setQuery] = useState('')
    const Router = useRouter()

    const handleSearch = async (e: React.FormEvent) => {
        e.preventDefault()
        if (query.trim()) {
            const newParams = encodeURIComponent(query)
            Router.push(`/search?query=${newParams.toString()}`)
        }
    }

    return (
        <div className="w-full max-w-xs mx-auto">
            <form onSubmit={handleSearch} className="flex items-center">
                <input
                    type="text"
                    placeholder="Search Concerts"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    className="w-full px-4 py-2 text-gray-700 rounded-l-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
                <button
                    type="submit"
                    className="px-4 py-2 bg-indigo-500 text-white rounded-r-md hover:bg-indigo-600 transition-colors duration-200"
                >
                    🔍
                </button>
            </form>
        </div>
    )
}

export default SearchBar