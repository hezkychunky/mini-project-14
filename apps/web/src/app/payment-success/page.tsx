// src/app/payment-success/page.tsx
import Wrapper from '@/components/wrapper';
import Link from 'next/link';

const PaymentSuccessPage = () => {
  return (
    <Wrapper>
      <div className="w-full flex flex-col items-center space-y-6 p-6 bg-gradient-to-br from-green-50 via-green-100 to-green-200 rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold text-green-800 animate-pulse">Payment Successful!</h1>
        <p className="text-lg text-gray-700 mt-2 text-center animate-fade-in">
          Thank you for your payment. Your transaction has been completed successfully.
        </p>
        
        {/* Decorative Icon */}
        <div className="flex items-center justify-center">
          <svg className="w-16 h-16 text-green-600 animate-bounce" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 5v14m7-7H5" />
          </svg>
        </div>

        {/* Additional Information */}
        <div className="bg-white p-4 rounded-lg shadow-md w-full max-w-md text-center">
          <p className="text-md text-gray-800 mb-4">Your payment details have been sent to your email. If you need further assistance, please contact our support team.</p>
        </div>

        {/* Button */}
        <Link href={'/'} passHref>
          <button className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-300 transform hover:scale-105">
            Go to Home
          </button>
        </Link>
      </div>
    </Wrapper>
  );
};

export default PaymentSuccessPage;
