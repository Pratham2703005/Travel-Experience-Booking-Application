// Core type definitions for the Highway Delite booking application

export interface Experience {
  id: string;
  name: string;
  location: string;
  description: string;
  image: string;
  price: number;
  about: string;
  slots: Slot[];
}

export interface Slot {
  id: string;
  experienceId: string;
  date: string; // ISO date string
  time: string; // e.g., "07:00 am"
  available: number; // number of slots available
  total: number; // total slots
}

export interface Booking {
  id?: string;
  experienceId: string;
  experienceName: string;
  slotId: string;
  date: string;
  time: string;
  quantity: number;
  fullName: string;
  email: string;
  promoCode?: string;
  subtotal: number;
  discount: number;
  taxes: number;
  total: number;
  createdAt?: string;
}

export interface PromoCode {
  code: string;
  type: 'percentage' | 'flat';
  value: number;
  description: string;
}

export interface PriceBreakdown {
  subtotal: number;
  discount: number;
  taxes: number;
  total: number;
}

export interface BookingRequest {
  experienceId: string;
  slotId: string;
  quantity: number;
  fullName: string;
  email: string;
  promoCode?: string;
}

export interface PromoValidationRequest {
  code: string;
  subtotal: number;
}

export interface PromoValidationResponse {
  valid: boolean;
  discount: number;
  message: string;
}
