'use client';

import type { PriceBreakdown } from '../lib/types';

interface PriceSummaryProps {
  experienceName?: string;
  date?: string;
  time?: string;
  quantity: number;
  priceBreakdown: PriceBreakdown;
  onConfirm?: () => void;
  confirmText?: string;
  showConfirmButton?: boolean;
}

export default function PriceSummary({
  experienceName,
  date,
  time,
  quantity,
  priceBreakdown,
  onConfirm,
  confirmText = 'Confirm',
  showConfirmButton = false,
}: PriceSummaryProps) {
  return (
    <div className="bg-gray-50 rounded-xl p-6 sticky top-6">
      {/* Experience Details */}
      {experienceName && (
        <div className="mb-6 space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Experience</span>
            <span className="font-medium text-gray-900">{experienceName}</span>
          </div>
          {date && (
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Date</span>
              <span className="font-medium text-gray-900">{date}</span>
            </div>
          )}
          {time && (
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Time</span>
              <span className="font-medium text-gray-900">{time}</span>
            </div>
          )}
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Qty</span>
            <span className="font-medium text-gray-900">{quantity}</span>
          </div>
        </div>
      )}

      {/* Price Breakdown */}
      <div className="space-y-3 mb-6">
        <div className="flex justify-between text-sm">
          <span className="text-gray-600">Starts at</span>
          <span className="font-medium text-gray-900">
            ₹{priceBreakdown.subtotal}
          </span>
        </div>
        
        <div className="flex justify-between text-sm">
          <span className="text-gray-600">Quantity</span>
          <span className="font-medium text-gray-900">
            {quantity > 1 ? `${quantity}` : '-'}
          </span>
        </div>

        <div className="flex justify-between text-sm">
          <span className="text-gray-600">Subtotal</span>
          <span className="font-medium text-gray-900">
            ₹{priceBreakdown.subtotal}
          </span>
        </div>

        {priceBreakdown.discount > 0 && (
          <div className="flex justify-between text-sm">
            <span className="text-green-600">Discount</span>
            <span className="font-medium text-green-600">
              -₹{priceBreakdown.discount}
            </span>
          </div>
        )}

        <div className="flex justify-between text-sm">
          <span className="text-gray-600">Taxes</span>
          <span className="font-medium text-gray-900">
            ₹{priceBreakdown.taxes}
          </span>
        </div>
      </div>

      {/* Total */}
      <div className="border-t border-gray-300 pt-4 mb-6">
        <div className="flex justify-between items-center">
          <span className="text-lg font-semibold text-gray-900">Total</span>
          <span className="text-2xl font-bold text-gray-900">
            ₹{priceBreakdown.total}
          </span>
        </div>
      </div>

      {/* Confirm Button */}
      {showConfirmButton && (
        <button
          onClick={onConfirm}
          className="w-full bg-gray-300 hover:bg-gray-400 text-gray-700 font-medium py-3 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={!onConfirm}
        >
          {confirmText}
        </button>
      )}
    </div>
  );
}
