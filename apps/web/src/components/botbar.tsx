import Link from "next/link";

export default function Botbar() {
    return (
        <div className="bg-blue-600 text-white py-6 px-4 flex flex-col lg:flex-row items-center justify-between">

            <div className="flex items-center mb-4 lg:mb-0">
                <div className="text-2xl font-bold">KONSERIA</div>
            </div>


            <div className="flex space-x-8 mb-4 lg:mb-0">
                <Link href={'#'} className="text-sm">About</Link>
                <Link href={'/konsers'} className="text-sm">Events</Link>
                <a href="#" className="text-sm">Contact</a>
            </div>


            <div className="text-xs text-gray-300">
                Design with love © TanahAirStudio 2020. All rights reserved.
            </div>
        </div>

    )
}