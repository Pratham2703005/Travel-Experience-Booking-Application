'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { ArrowLeft } from 'lucide-react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import Header from '@/app/components/Header';

interface CheckoutFormData {
  fullName: string;
  email: string;
  promoCode: string;
  agreedToTerms: boolean;
}

interface BookingData {
  experienceId: string;
  experienceName: string;
  slotId: string;
  date: string;
  time: string;
  quantity: number;
  price: number;
  subtotal: number;
  taxes: number;
  total: number;
}

export default function CheckoutPage() {
  const router = useRouter();
  const [bookingData, setBookingData] = useState<BookingData | null>(null);
  const [discount, setDiscount] = useState(0);
  const [promoMessage, setPromoMessage] = useState('');
  const [promoApplied, setPromoApplied] = useState(false);
  const [isValidatingPromo, setIsValidatingPromo] = useState(false);

  const { register, handleSubmit, formState: { errors }, watch } = useForm<CheckoutFormData>();
  const promoCodeValue = watch('promoCode');

  useEffect(() => {
    // Retrieve booking data from session storage
    const data = sessionStorage.getItem('bookingData');
    if (!data) {
      router.push('/');
      return;
    }
    setBookingData(JSON.parse(data));
  }, [router]);

  if (!bookingData) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-yellow-400"></div>
      </div>
    );
  }

  const handleApplyPromo = async () => {
    if (!promoCodeValue || !promoCodeValue.trim()) {
      setPromoMessage('Please enter a promo code');
      return;
    }

    setIsValidatingPromo(true);
    try {
      const { data } = await axios.post('/api/promo/validate', {
        code: promoCodeValue.trim().toUpperCase(),
        subtotal: bookingData.subtotal,
      });
      
      if (data.valid) {
        setDiscount(data.discount);
        setPromoMessage(data.message);
        setPromoApplied(true);
      } else {
        setDiscount(0);
        setPromoMessage(data.message);
        setPromoApplied(false);
      }
    } catch {
      setPromoMessage('Error validating promo code');
      setPromoApplied(false);
    } finally {
      setIsValidatingPromo(false);
    }
  };

  const onSubmit = async (formData: CheckoutFormData) => {
    if (!formData.agreedToTerms) {
      alert('Please agree to the terms and safety policy');
      return;
    }

    try {
      const { data: result } = await axios.post('/api/bookings', {
        experienceId: bookingData.experienceId,
        slotId: bookingData.slotId,
        quantity: bookingData.quantity,
        fullName: formData.fullName,
        email: formData.email,
        promoCode: promoApplied ? promoCodeValue.trim().toUpperCase() : undefined,
      });

      // Store booking result
      sessionStorage.setItem('bookingResult', JSON.stringify(result));
      router.push('/confirmation?status=success');
    } catch (err) {
      const errorMessage = axios.isAxiosError(err) && err.response?.data?.error
        ? err.response.data.error
        : 'An unexpected error occurred';
      
      sessionStorage.setItem('bookingError', errorMessage);
      router.push('/confirmation?status=failure');
    }
  };

  const finalSubtotal = bookingData.subtotal - discount;
  const finalTaxes = Math.round(finalSubtotal * 0.06);
  const finalTotal = finalSubtotal + finalTaxes;

  return (
    <>
      <Header showSearch={true} />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Back Button */}
        <button
          onClick={() => router.back()}
          className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-6"
        >
          <ArrowLeft size={20} />
          <span className="font-medium">Checkout</span>
        </button>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column - Form */}
        <div className="lg:col-span-2 ">
          <form id="checkout-form" onSubmit={handleSubmit(onSubmit)} className="space-y-4 rounded-[12px] py-[20px] px-[24px] bg-[#efefef]">
            {/* Personal Information */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className='flex flex-col justify-between gap-2'>
                <label htmlFor="fullName" className='text-[#5b5b5b] text-[14px] font-[400]'>Full Name</label>
                <input
                  type="text"
                  placeholder="Your name"
                  {...register('fullName', { required: 'Full name is required' })}
                  className="w-full px-4 py-3 bg-[#ddd] rounded-[6px] focus:outline-none focus:ring-2 focus:ring-yellow-400 text-gray-900 placeholder:text-gray-500"
                />
                {errors.fullName && (
                  <p className="text-red-600 text-sm mt-1">{errors.fullName.message}</p>
                )}
              </div>

              <div className='flex flex-col justify-between gap-2'>
                <label htmlFor="email" className='text-[#5b5b5b] text-[14px] font-[400]'>Email</label>
                <input
                  type="email"
                  placeholder="Your email"
                  {...register('email', {
                    required: 'Email is required',
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: 'Invalid email address',
                    },
                  })}
                  className="w-full px-4 py-3 bg-[#ddd] rounded-[6px] focus:outline-none focus:ring-2 focus:ring-yellow-400 text-gray-900 placeholder:text-gray-500"
                />
                {errors.email && (
                  <p className="text-red-600 text-sm mt-1">{errors.email.message}</p>
                )}
              </div>
            </div>

            {/* Promo Code */}
            <div>
              <div className="flex gap-2.5">
                <input
                  type="text"
                  placeholder="Promo code"
                  {...register('promoCode')}
                  className="flex-1 px-4 py-3 bg-[#ddd] rounded-[6px] focus:outline-none focus:ring-2 focus:ring-yellow-400 text-gray-900 placeholder:text-gray-500"
                />
                
                <button
                  type="button"
                  onClick={handleApplyPromo}
                  disabled={isValidatingPromo}
                  className="bg-[#161616] text-[#f9f9f9] px-4 py-3 rounded-[8px] font-medium hover:bg-gray-800 transition-colors disabled:opacity-50 text-[14px]"
                >
                  {isValidatingPromo ? 'Validating...' : 'Apply'}
                </button>
              </div>
              {promoMessage && (
                <p className={`text-sm mt-2 ${promoApplied ? 'text-green-600' : 'text-red-600'}`}>
                  {promoMessage}
                </p>
              )}
            </div>

            {/* Terms and Conditions */}
            <div className="flex items-start gap-2">
  <input
    type="checkbox"
    id="terms"
    {...register('agreedToTerms', { required: true })}
    className="mt-0.5 w-4 h-4 appearance-none border border-gray-400 bg-transparent checked:bg-gray-800 checked:border-gray-800 checked:font-bold focus:ring-0 focus:ring-offset-0 cursor-pointer relative checked:after:content-['✓'] checked:after:absolute checked:after:text-white checked:after:text-xs checked:after:left-0.5 checked:after:top-[-1px]"
  />
  <label htmlFor="terms" className="text-sm text-gray-600 cursor-pointer">
    I agree to the terms and safety policy
  </label>
</div>
            {errors.agreedToTerms && (
              <p className="text-red-600 text-sm">You must agree to the terms</p>
            )}
          </form>
        </div>

        {/* Right Column - Price Summary */}
        <div className="lg:col-span-1">
          <div className="bg-[#efefef] rounded-[12px] p-[24px] sticky top-6">
            <div className="space-y-3 mb-6">
              <div className="flex justify-between text-sm">
                <span className="text-[#656565] text-[16px] font-[400]">Experience</span>
                <span className="font-medium text-gray-900 text-right">
                  {bookingData.experienceName}
                </span>
              </div>

              <div className="flex justify-between text-sm">
                <span className="text-[#656565] text-[16px] font-[400]">Date</span>
                <span className="font-medium text-gray-900">
                  {new Date(bookingData.date).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: '2-digit',
                    day: '2-digit',
                  })}
                </span>
              </div>

              <div className="flex justify-between text-sm">
                <span className="text-[#656565] text-[16px] font-[400]">Time</span>
                <span className="font-medium text-gray-900">{bookingData.time}</span>
              </div>

              <div className="flex justify-between text-sm">
                <span className="text-[#656565] text-[16px] font-[400]">Qty</span>
                <span className="font-medium text-gray-900">{bookingData.quantity}</span>
              </div>

            
              <div className="flex justify-between text-sm">
                <span className="text-[#656565] text-[16px] font-[400]">Subtotal</span>
                <span className="font-medium text-gray-900">₹{bookingData.subtotal}</span>
              </div>

              {discount > 0 && (
                <div className="flex justify-between text-sm">
                  <span className="text-green-600">Discount</span>
                  <span className="font-medium text-green-600">-₹{discount}</span>
                </div>
              )}

              <div className="flex justify-between text-sm">
                <span className="text-[#656565] text-[16px] font-[400]">Taxes</span>
                <span className="font-medium text-gray-900">₹{finalTaxes}</span>
              </div>
            </div>

            <div className="border-t border-gray-300 pt-4 mb-6">
              <div className="flex justify-between items-center">
                <span className="text-lg font-semibold text-gray-900">Total</span>
                <span className="text-2xl font-bold text-gray-900">₹{finalTotal}</span>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              form="checkout-form"
              className="w-full bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-medium py-3 rounded-lg transition-colors"
            >
              Pay and Confirm
            </button>
          </div>
        </div>
      </div>
    </main>
    </>
  );
}
