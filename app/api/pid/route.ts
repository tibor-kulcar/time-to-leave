// api/pid/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { FetchDepartures } from '@/utils/server';

export async function GET(req: NextRequest) {
  try {
    const searchParams = req.nextUrl.searchParams;
    const name = searchParams.get('name');

    if (!name) {
      return NextResponse.json(
        { error: 'Name parameter is required' },
        { status: 400 }
      );
    }

    const departures = await FetchDepartures(name);
    return NextResponse.json(departures); // Return the departures directly
  } catch (error) {
    console.error('Error fetching departures:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
