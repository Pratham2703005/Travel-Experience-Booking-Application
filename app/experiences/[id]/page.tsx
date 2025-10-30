'use client';

import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import { ArrowLeft, Minus, Plus } from 'lucide-react';
import axios from 'axios';
import Header from '@/app/components/Header';
import type { Experience, Slot } from '@/app/lib/types';

export default function ExperienceDetailsPage() {
  const params = useParams();
  const router = useRouter();
  const [experience, setExperience] = useState<Experience | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedDate, setSelectedDate] = useState<string>('');
  const [selectedSlot, setSelectedSlot] = useState<Slot | null>(null);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    async function fetchExperience() {
      try {
        const { data } = await axios.get(`/api/experiences/${params.id}`);
        setExperience(data);
        
        // Auto-select first available date
        if (data.slots.length > 0) {
          const firstDate = data.slots[0].date;
          setSelectedDate(firstDate);
        }
      } catch {
        setExperience(null);
      } finally {
        setLoading(false);
      }
    }

    if (params.id) {
      fetchExperience();
    }
  }, [params.id]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-yellow-400"></div>
      </div>
    );
  }

  if (!experience) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <p className="text-gray-600">Experience not found</p>
      </div>
    );
  }

  // Get unique dates
  const uniqueDates = Array.from(new Set(experience.slots.map(slot => slot.date)));

  // Get slots for selected date
  const availableSlots = experience.slots.filter(slot => slot.date === selectedDate);

  // Calculate price breakdown
  const subtotal = experience.price * quantity;
  const taxes = Math.round(subtotal * 0.06);
  const total = subtotal + taxes;

  const handleConfirm = () => {
    if (!selectedSlot) {
      alert('Please select a time slot');
      return;
    }

    // Store booking data in session storage
    const bookingData = {
      experienceId: experience.id,
      experienceName: experience.name,
      slotId: selectedSlot.id,
      date: selectedDate,
      time: selectedSlot.time,
      quantity,
      price: experience.price,
      subtotal,
      taxes,
      total,
    };

    sessionStorage.setItem('bookingData', JSON.stringify(bookingData));
    router.push('/checkout');
  };

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };

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
          <span className="font-medium">Details</span>
        </button>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column - Experience Details */}
        <div className="lg:col-span-2">
          {/* Image */}
          <div className="relative h-[381px] w-[765px] rounded-2xl overflow-hidden mb-6">
            <Image
              src={experience.image}
              alt={experience.name}
              fill
              className="object-cover"
            />
          </div>

          {/* Title and Description */}
          <h1 className="text-[24px] font-[500] text-[#161616] mb-2">{experience.name}</h1>
          <p className="text-[#6c6c6c] text-[16px] mb-6">{experience.description}</p>

          {/* Choose Date */}
          <div className="mb-6">
            <h2 className="text-[18px] font-semibold text-[#161616] mb-3">Choose date</h2>
            <div className="flex gap-2.5 flex-wrap">
              {uniqueDates.map((date) => (
                <button
                  key={date}
                  onClick={() => {
                    setSelectedDate(date);
                    setSelectedSlot(null); // Reset slot selection
                  }}
                  className={`px-4 py-3 rounded-[4px] font-medium transition-colors text-[14px] ${
                    selectedDate === date
                      ? 'border-[#bdbdbd] bg-[#ffd643] text-gray-900'
                      : 'border border-[#bdbdbd] text-[#838383] hover:bg-gray-200 '
                  }`}
                >
                  {formatDate(date)}
                </button>
              ))}
            </div>
          </div>

          {/* Choose Time */}
          <div className="mb-6">
            <h2 className="text-[18px] font-semibold text-[#161616] mb-3">Choose time</h2>
            <div className="flex gap-2.5 flex-wrap">
              {availableSlots.map((slot) => (
                <button
                  key={slot.id}
                  onClick={() => setSelectedSlot(slot)}
                  disabled={slot.available === 0}
                  className={`relative px-3 py-2 rounded-[4px]  font-medium transition-colors flex gap-2 ${
                    slot.available === 0
                      ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                      : selectedSlot?.id === slot.id
                      ? 'bg-[#ffd643] text-gray-900'
                      : 'border border-[#bdbdbd] text-[#838383] hover:bg-gray-200'
                  }`}
                >
                  <span>{slot.time}</span>
                  {slot.available > 0 && slot.available < 5 && (
                    <span className="block text-xs text-red-600 mt-1">
                      {slot.available} left
                    </span>
                  )}
                  {slot.available === 0 && (
                    <span className="block text-xs mt-1">Sold out</span>
                  )}
                </button>
              ))}
            </div>
            <p className="text-[12px] text-[#838383] mt-2">All times are in IST (GMT +5:30)</p>
          </div>

          {/* About */}
          <div >
            <h2 className="text-[18px font-semibold text-[#161616] mb-3">About</h2>
            <p className="text-[#838383] py-2 px-3 bg-[#eee] rounded-[4px]">{experience.about}</p>
          </div>
        </div>

        {/* Right Column - Price Summary */}
        <div className="lg:col-span-1">
          <div className="bg-[#efefef] rounded-[12px] p-6 sticky top-6">
            <div className="space-y-4 mb-6">
              <div className="flex justify-between text-sm">
                <span className="text-[#656565] text-[16px] ">Starts at</span>
                <span className="font-semibold text-[18px] text-[#161616]">₹{experience.price}</span>
              </div>

              {/* Quantity Selector */}
              <div className="flex justify-between items-center text-sm">
                <span className="text-[#656565] text-[16px]">Quantity</span>
                <div className="flex gap-2.5">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-4 h-4  bg-transparent border border-gray-300 flex items-center justify-center hover:bg-gray-50"
                  >
                    <Minus size={16} />
                  </button>
                  <span className="font-semibold text-gray-900 text-center text-[12px]">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="w-4 h-4 bg-transparent border border-gray-300 flex items-center justify-center hover:bg-gray-50"
                  >
                    <Plus size={16} />
                  </button>
                </div>
              </div>

              <div className="flex justify-between text-sm">
                <span className="text-[#656565] text-[16px]">Subtotal</span>
                <span className="text-[14px] text-[#161616]">₹{subtotal}</span>
              </div>

              <div className="flex justify-between text-sm">
                <span className="text-[#656565] text-[16px]">Taxes</span>
                <span className=" text-[14px] text-[#161616]">₹{taxes}</span>
              </div>
            </div>

            <div className="border-t border-gray-300 pt-4 mb-6">
              <div className="flex justify-between items-center">
                <span className="text-[20px] font-[500] text-[#161616]">Total</span>
                <span className="text-[20px] font-[500] text-[#161616]">₹{total}</span>
              </div>
            </div>

            <button
              onClick={handleConfirm}
              disabled={!selectedSlot}
              className="w-full bg-yellow-400 hover:bg-yellow-500 disabled:bg-gray-200 disabled:cursor-not-allowed text-gray-700 font-medium py-3 px-5 rounded-lg transition-colors"
            >
              Confirm
            </button>
          </div>
        </div>
      </div>
    </main>
    </>
  );
}
