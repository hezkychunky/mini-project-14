import Wrapper from '@/components/wrapper';
import Link from 'next/link';

export default function Home() {
  return (
    <Wrapper>
      <div className="w-full flex flex-col items-center space-y-6 p-6">

        {/* Welcome Message & View More Section */}
        <div className="w-full text-left mt-6">
          <h1 className="text-4xl font-bold text-gray-900">
            Welcome, Listeners!
          </h1>
          <p className="text-lg text-gray-800 mt-2">
            Discover amazing events and experiences around you. Start searching!
          </p>

          {/* View More Button */}
          <div className="mt-4">
            <Link href={'/konsers'} passHref>
              <button className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-300">
                View More Events
              </button>
            </Link>
          </div>

          {/* About Konseria */}
          <div className="mt-8">
            <h2 className="text-2xl font-semibold text-gray-900">
              About Konseria
            </h2>
            <p className="text-md text-gray-900 mt-2">
              Konseria is your gateway to the world of live music and entertainment. Whether you're searching for the hottest concerts, discovering new artists, or planning your next big night out, Konseria brings it all together for you. Let us help you connect with music like never before.
            </p>
          </div>
        </div>

        {/* Extra Design Section */}
        <div className="w-full bg-blue-700 py-8 mt-12 rounded-lg shadow-lg">
          <div className="text-center">
            <h3 className="text-2xl font-semibold text-white mb-4">
              Stay Updated!
            </h3>
            <p className="text-md text-gray-200 mb-6">
              Subscribe to our newsletter and never miss an update on your favorite events and artists.
            </p>
            <form className="flex flex-col sm:flex-row items-center justify-center">
              <input
                type="email"
                placeholder="Enter your email"
                className="px-4 py-2 border border-gray-300 rounded-lg w-full sm:w-64 mb-4 sm:mb-0 sm:mr-4"
              />
              <button className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-300">
                Subscribe
              </button>
            </form>
          </div>
        </div>
      </div>

    </Wrapper>
  );
}
