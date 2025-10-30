'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useState, Suspense } from 'react';
import { CheckCircle, XCircle } from 'lucide-react';
import Header from '@/app/components/Header';
import type { Booking } from '@/app/lib/types';

function ConfirmationContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const status = searchParams.get('status');
  
  // Initialize state from session storage
  const [bookingResult] = useState<Booking | null>(() => {
    if (typeof window !== 'undefined' && status === 'success') {
      const result = sessionStorage.getItem('bookingResult');
      if (result) {
        sessionStorage.removeItem('bookingResult');
        sessionStorage.removeItem('bookingData');
        return JSON.parse(result) as Booking;
      }
    }
    return null;
  });

  const [errorMessage] = useState<string>(() => {
    if (typeof window !== 'undefined' && status === 'failure') {
      const error = sessionStorage.getItem('bookingError');
      sessionStorage.removeItem('bookingError');
      return error || 'Booking failed. Please try again.';
    }
    return '';
  });

  const handleBackToHome = () => {
    router.push('/');
  };

  if (status === 'success') {
    return (
      <>
        <Header showSearch={true} />
        <main className="min-h-[80vh] flex items-start pt-20 justify-center px-4">
        <div className="text-center max-w-md">
          {/* Success Icon */}
          <div className="flex justify-center mb-6">
            <div className="size-[70px] bg-[#24ac39] rounded-full flex items-center justify-center">
 <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    
    stroke="white"
    strokeWidth={4}
    className="size-[50px]"
  >
    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
  </svg>            
  </div>
          </div>

          {/* Success Message */}
          <h1 className="text-[32px] font-[500] text-[#161616] mb-3">Booking Confirmed</h1>
          
          {bookingResult && (
            <p className="text-[#656565] text-[20px] mb-8">
              Ref ID: <span className="text-[#656565] text-[20px]">{bookingResult.id}</span>
            </p>
          )}

          {/* Back to Home Button */}
          <button
            onClick={handleBackToHome}
            className="bg-[#e3e3e3] hover:bg-gray-300 text-[16px] text-[#656565] px-4 py-2 rounded-[4px] transition-colors"
          >
            Back to Home
          </button>
        </div>
      </main>
      </>
    );
  }

  if (status === 'failure') {
    return (
      <>
        <Header showSearch={true} />
        <main className="min-h-[80vh] flex items-center justify-center px-4">
        <div className="text-center max-w-md">
          {/* Error Icon */}
          <div className="flex justify-center mb-6">
            <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center">
              <XCircle className="w-12 h-12 text-red-600" />
            </div>
          </div>

          {/* Error Message */}
          <h1 className="text-3xl font-bold text-gray-900 mb-3">Booking Failed</h1>
          
          <p className="text-gray-600 mb-8">
            {errorMessage || 'Unfortunately, we could not complete your booking. Please try again.'}
          </p>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => router.back()}
              className="bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-medium px-8 py-3 rounded-lg transition-colors"
            >
              Try Again
            </button>
            <button
              onClick={handleBackToHome}
              className="bg-gray-200 hover:bg-gray-300 text-gray-900 font-medium px-8 py-3 rounded-lg transition-colors"
            >
              Back to Home
            </button>
          </div>
        </div>
      </main>
      </>
    );
  }

  // If no status parameter, redirect to home
  return (
    <>
      <Header showSearch={true} />
      <main className="min-h-[80vh] flex items-center justify-center">
      <div className="text-center">
        <p className="text-gray-600 mb-4">Invalid confirmation page</p>
        <button
          onClick={handleBackToHome}
          className="bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-medium px-8 py-3 rounded-lg transition-colors"
        >
          Back to Home
        </button>
      </div>
    </main>
    </>
  );
}

export default function ConfirmationPage() {
  return (
    <Suspense fallback={
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-yellow-400"></div>
      </div>
    }>
      <ConfirmationContent />
    </Suspense>
  );
}
