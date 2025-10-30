import { NextResponse } from 'next/server';
import { experiences } from '@/app/lib/mockData';

export async function GET() {
  try {
    // Return experiences without detailed slots for listing page
    const experiencesList = experiences.map(exp => ({
      id: exp.id,
      name: exp.name,
      location: exp.location,
      description: exp.description,
      image: exp.image,
      price: exp.price,
    }));
    
    return NextResponse.json(experiencesList);
  } catch (error) {
    console.error('Error fetching experiences:', error);
    return NextResponse.json(
      { error: 'Failed to fetch experiences' },
      { status: 500 }
    );
  }
}
