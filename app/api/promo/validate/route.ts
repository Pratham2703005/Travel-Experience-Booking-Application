import { NextResponse } from 'next/server';
import { promoCodes } from '@/app/lib/mockData';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { code, subtotal } = body;
    
    if (!code || !subtotal) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }
    
    const promo = promoCodes[code];
    
    if (!promo) {
      return NextResponse.json({
        valid: false,
        discount: 0,
        message: 'Invalid promo code',
      });
    }
    
    let discount = 0;
    if (promo.type === 'percentage') {
      discount = Math.round((subtotal * promo.value) / 100);
    } else {
      discount = promo.value;
    }
    
    return NextResponse.json({
      valid: true,
      discount,
      message: `Promo code applied: ${promo.description}`,
    });
  } catch (error) {
    console.error('Promo validation error:', error);
    return NextResponse.json(
      { error: 'Failed to validate promo code' },
      { status: 500 }
    );
  }
}
