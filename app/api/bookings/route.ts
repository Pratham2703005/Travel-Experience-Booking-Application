import { NextResponse } from 'next/server';
import { experiences, bookings } from '@/app/lib/mockData';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { experienceId, slotId, quantity, fullName, email, promoCode } = body;
    
    // Validation
    if (!experienceId || !slotId || !quantity || !fullName || !email) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }
    
    // Find experience and slot
    const experience = experiences.find(exp => exp.id === experienceId);
    if (!experience) {
      return NextResponse.json(
        { error: 'Experience not found' },
        { status: 404 }
      );
    }
    
    const slot = experience.slots.find(s => s.id === slotId);
    if (!slot) {
      return NextResponse.json(
        { error: 'Slot not found' },
        { status: 404 }
      );
    }
    
    // Check availability
    if (slot.available < quantity) {
      return NextResponse.json(
        { error: 'Not enough slots available' },
        { status: 400 }
      );
    }
    
    // Calculate pricing
    const subtotal = experience.price * quantity;
    let discount = 0;
    
    // Apply promo code
    if (promoCode) {
      const promoCodes: Record<string, { type: 'percentage' | 'flat'; value: number }> = {
        SAVE10: { type: 'percentage', value: 10 },
        FLAT100: { type: 'flat', value: 100 },
      };
      
      const promo = promoCodes[promoCode];
      if (promo) {
        if (promo.type === 'percentage') {
          discount = Math.round((subtotal * promo.value) / 100);
        } else {
          discount = promo.value;
        }
      }
    }
    
    const afterDiscount = subtotal - discount;
    const taxes = Math.round(afterDiscount * 0.06); // 6% tax
    const total = afterDiscount + taxes;
    
    // Create booking
    const booking = {
      id: `HUF56&SO`,
      experienceId,
      experienceName: experience.name,
      slotId,
      date: slot.date,
      time: slot.time,
      quantity,
      fullName,
      email,
      promoCode,
      subtotal,
      discount,
      taxes,
      total,
      createdAt: new Date().toISOString(),
    };
    
    // Update slot availability
    slot.available -= quantity;
    
    // Store booking
    bookings.push(booking);
    
    return NextResponse.json(booking, { status: 201 });
  } catch (error) {
    console.error('Booking error:', error);
    return NextResponse.json(
      { error: 'Failed to create booking' },
      { status: 500 }
    );
  }
}
