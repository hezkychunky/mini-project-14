import Wrapper from "@/components/wrapper";

export default function Loading() {
    return (
        <Wrapper>
            <div className="flex items-center justify-center min-h-screen bg-gray-50 p-6">
                <div className="text-center bg-white border border-teal-400 rounded-lg p-8 shadow-lg">
                    <div className="flex justify-center mb-4">
                        <svg className="w-12 h-12 text-teal-500 animate-spin" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 1116 0 8 8 0 01-16 0z"></path>
                        </svg>
                    </div>
                    <p className="text-lg font-semibold text-gray-800 mb-4">Loading, please wait...</p>
                    <p className="text-gray-600">Music brings people together. Thanks for your patience while we prepare something special for you.</p>
                </div>
            </div>
        </Wrapper>
    )
}