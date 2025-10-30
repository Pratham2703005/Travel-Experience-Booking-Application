// Mock data storage - In-memory database
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
  date: string;
  time: string;
  available: number;
  total: number;
}

export interface Booking {
  id: string;
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
  createdAt: string;
}

// In-memory storage
export const experiences: Experience[] = [
  {
    id: '1',
    name: 'Kayaking',
    location: 'Udupi',
    description: 'Curated small-group experience. Certified guide. Safety first with gear included.',
    image: '/kayaking.jpg',
    price: 999,
    about: 'Scenic routes, trained guides, and safety briefing. Minimum age 10. Helmet and Life jackets along with an expert will accompany in kayaking.',
    slots: [
      { id: 's1-1', experienceId: '1', date: '2025-10-22', time: '07:00 am', available: 4, total: 10 },
      { id: 's1-2', experienceId: '1', date: '2025-10-22', time: '09:00 am', available: 2, total: 10 },
      { id: 's1-3', experienceId: '1', date: '2025-10-22', time: '11:00 am', available: 5, total: 10 },
      { id: 's1-4', experienceId: '1', date: '2025-10-22', time: '01:00 pm', available: 0, total: 10 },
      { id: 's1-5', experienceId: '1', date: '2025-10-23', time: '07:00 am', available: 8, total: 10 },
      { id: 's1-6', experienceId: '1', date: '2025-10-24', time: '07:00 am', available: 6, total: 10 },
      { id: 's1-7', experienceId: '1', date: '2025-10-25', time: '07:00 am', available: 7, total: 10 },
      { id: 's1-8', experienceId: '1', date: '2025-10-26', time: '07:00 am', available: 9, total: 10 },
    ],
  },
  {
    id: '2',
    name: 'Nandi Hills Sunrise',
    location: 'Bangalore',
    description: 'Curated small-group experience. Certified guide. Safety first with gear included.',
    image: '/nandi_hills_sunrise.jpg',
    price: 899,
    about: 'Experience the breathtaking sunrise from Nandi Hills with our guided tour.',
    slots: [
      { id: 's2-1', experienceId: '2', date: '2025-10-22', time: '05:00 am', available: 3, total: 8 },
      { id: 's2-2', experienceId: '2', date: '2025-10-23', time: '05:00 am', available: 5, total: 8 },
      { id: 's2-3', experienceId: '2', date: '2025-10-24', time: '05:00 am', available: 2, total: 8 },
    ],
  },
  {
    id: '3',
    name: 'Coffee Trail',
    location: 'Coorg',
    description: 'Curated small-group experience. Certified guide. Safety first with gear included.',
    image: '/coffee_trail.jpg',
    price: 1299,
    about: 'Walk through lush coffee plantations and learn about coffee cultivation.',
    slots: [
      { id: 's3-1', experienceId: '3', date: '2025-10-22', time: '09:00 am', available: 6, total: 12 },
      { id: 's3-2', experienceId: '3', date: '2025-10-23', time: '09:00 am', available: 4, total: 12 },
    ],
  },
  {
    id: '4',
    name: 'Kayaking',
    location: 'Udupi, Karnataka',
    description: 'Curated small-group experience. Certified guide. Safety first with gear included.',
    image: '/kayaking_udupi.jpg',
    price: 999,
    about: 'Explore serene waters with professional guides and all safety equipment provided.',
    slots: [
      { id: 's4-1', experienceId: '4', date: '2025-10-22', time: '08:00 am', available: 5, total: 10 },
    ],
  },
  {
    id: '5',
    name: 'Nandi Hills Sunrise',
    location: 'Bangalore',
    description: 'Curated small-group experience. Certified guide. Safety first with gear included.',
    image: '/nandi_hills_sunrise_bangalore.jpg',
    price: 899,
    about: 'Catch the stunning sunrise views from the hilltop with our expert guides.',
    slots: [
      { id: 's5-1', experienceId: '5', date: '2025-10-22', time: '05:00 am', available: 2, total: 8 },
    ],
  },
  {
    id: '6',
    name: 'Boat Cruise',
    location: 'Sunderban',
    description: 'Curated small-group experience. Certified guide. Safety first with gear included.',
    image: '/boat_cruise.jpg',
    price: 999,
    about: 'Navigate through the mangrove forests of Sunderban on a guided boat cruise.',
    slots: [
      { id: 's6-1', experienceId: '6', date: '2025-10-22', time: '10:00 am', available: 7, total: 15 },
    ],
  },
  {
    id: '7',
    name: 'Bunjee Jumping',
    location: 'Manali',
    description: 'Curated small-group experience. Certified guide. Safety first with gear included.',
    image: '/bunjee_jumping.jpg',
    price: 999,
    about: 'Experience the ultimate adrenaline rush with our professional bungee jumping setup.',
    slots: [
      { id: 's7-1', experienceId: '7', date: '2025-10-22', time: '11:00 am', available: 3, total: 6 },
    ],
  },
  {
    id: '8',
    name: 'Coffee Trail',
    location: 'Coorg',
    description: 'Curated small-group experience. Certified guide. Safety first with gear included.',
    image: '/coffee_trail_coorg.jpg',
    price: 1299,
    about: 'Immerse yourself in the coffee culture with plantation tours and tasting sessions.',
    slots: [
      { id: 's8-1', experienceId: '8', date: '2025-10-22', time: '02:00 pm', available: 8, total: 12 },
    ],
  },
];

export const bookings: Booking[] = [];

// Promo codes
export const promoCodes: Record<string, { type: 'percentage' | 'flat'; value: number; description: string }> = {
  SAVE10: { type: 'percentage', value: 10, description: '10% off' },
  FLAT100: { type: 'flat', value: 100, description: '₹100 off' },
};
