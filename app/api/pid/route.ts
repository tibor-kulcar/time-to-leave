import { NextRequest, NextResponse } from 'next/server';
import { FetchDepartures } from '@/utils/server';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const name = searchParams.get('name');

  const departures = name ? await FetchDepartures(name) : null;

  return NextResponse.json(departures);
}
