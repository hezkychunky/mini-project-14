"use client";

import React from "react";
import Link from "next/link";
import SearchBar from "./search";

export default function Navbar() {
    return (
        <div className="bg-blue-600 p-4 flex flex-col lg:flex-row justify-between items-center">
            <div className="flex items-center space-x-4">
                <div className="text-white text-2xl font-bold">KONSERIA</div>
                <div className="hidden lg:flex space-x-4">
                    <Link href={'/'} className="text-white text-sm">Home</Link>
                    <Link href={'/konsers'} className="text-white text-sm">Events</Link>
                </div>
            </div>

            <div className="p-4 bg-white border border-gray-200 rounded-lg shadow-sm">
                <SearchBar />
            </div>


            <div className="flex items-center space-x-4 mt-2 lg:mt-0">
                <a href="#" className="bg-blue-700 text-white px-4 py-2 rounded-lg text-sm">Sign Up</a>
                <a href="#" className="bg-white text-blue-700 border border-white px-4 py-2 rounded-lg text-sm">Sign In</a>
            </div>
        </div>
    );
}
