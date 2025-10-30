// API client for backend communication
import axios from 'axios';
import type {
  Experience,
  BookingRequest,
  Booking,
  PromoValidationRequest,
  PromoValidationResponse,
} from './types';

// Base URL for API - using Next.js API routes
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || '/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Get all experiences
export const getExperiences = async (): Promise<Experience[]> => {
  const response = await api.get('/experiences');
  return response.data;
};

// Get experience by ID with slots
export const getExperienceById = async (id: string): Promise<Experience> => {
  const response = await api.get(`/experiences/${id}`);
  return response.data;
};

// Create a booking
export const createBooking = async (bookingData: BookingRequest): Promise<Booking> => {
  const response = await api.post('/bookings', bookingData);
  return response.data;
};

// Validate promo code
export const validatePromoCode = async (
  data: PromoValidationRequest
): Promise<PromoValidationResponse> => {
  const response = await api.post('/promo/validate', data);
  return response.data;
};

export default api;
