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
        <div>
            <form onSubmit={handleSearch}>
                <input
                    type="text"
                    placeholder="Search Concerts"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                />
            </form>
        </div>
    )
}

export default SearchBar