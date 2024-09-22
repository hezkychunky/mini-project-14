'use client';

import Link from 'next/link';
import { useState } from 'react';
import SearchBar from './search';

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);

    const handleToggle = () => {
        setIsOpen(!isOpen);
    };

    return (
        <nav className="z-40 px-4 shadow-lg bg-gradient-to-r from-emerald-500 via-indigo-500 to-yellow-400 sticky top-0">
            <div className="container mx-auto flex items-center justify-between py-4">
                {/* Logo */}
                <div className="flex items-center">
                    <Link className="flex items-center text-2xl font-black text-white" href="/">
                        KONSERIA
                    </Link>
                </div>

                {/* Desktop Search Bar */}
                <div className="hidden sm:block flex-grow mx-4">
                    <SearchBar />
                </div>

                {/* Hamburger Menu for Mobile */}
                <button 
                    className="sm:hidden text-xl text-white focus:outline-none" 
                    onClick={handleToggle}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 448 512">
                        <path fill="currentColor" d="M0 96c0-17.7 14.3-32 32-32h384c17.7 0 32 14.3 32 32s-14.3 32-32 32H32c-17.7 0-32-14.3-32-32zm0 160c0-17.7 14.3-32 32-32h384c17.7 0 32 14.3 32 32s14.3 32-32 32H32c-17.7 0-32-14.3-32-32zm448 160c0 17.7-14.3 32-32 32H32c-17.7 0-32-14.3-32-32s14.3-32 32-32h384c17.7 0 32 14.3 32 32z" />
                    </svg>
                </button>

                {/* Desktop Navigation Links */}
                <div className="hidden sm:flex items-center gap-6">
                    <Link className="text-white hover:underline hover:scale-105 transition-transform duration-200" href="/konsers">Upcoming</Link>
                    <Link className="text-white hover:underline hover:scale-105 transition-transform duration-200" href="/">Past Events</Link>
                    <div className="flex gap-4">
                        <Link className="rounded-lg border-2 border-white px-4 py-2 text-white hover:bg-blue-600 transition-colors duration-200" href="/#">Login</Link>
                        <Link className="rounded-lg border-2 border-white px-4 py-2 text-white hover:bg-blue-600 transition-colors duration-200" href="/#">Sign Up</Link>
                    </div>
                </div>
            </div>

            {/* Mobile Dropdown */}
            {isOpen && (
                <div className="sm:hidden bg-gradient-to-r from-emerald-500 via-indigo-500 to-yellow-400">
                    <div className="flex flex-col items-center gap-4 py-4">
                        {/* Mobile Search Bar */}
                        <div className="w-full px-4">
                            <SearchBar />
                        </div>
                        {/* Navigation Links */}
                        <Link className="text-white hover:underline hover:scale-105 transition-transform duration-200" href="/konsers">Upcoming</Link>
                        <Link className="text-white hover:underline hover:scale-105 transition-transform duration-200" href="/#">Past Events</Link>
                        <Link className="rounded-lg border-2 border-white px-4 py-2 text-white hover:bg-blue-600 transition-colors duration-200" href="/#">Login</Link>
                        <Link className="rounded-lg border-2 border-white px-4 py-2 text-white hover:bg-blue-600 transition-colors duration-200" href="/#">Sign Up</Link>
                    </div>
                </div>
            )}
        </nav>
    );
}
