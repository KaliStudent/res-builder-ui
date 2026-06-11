import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { domainNames } = await request.json();

    if (!domainNames || !Array.isArray(domainNames)) {
      return NextResponse.json({ error: 'Domain names array is required' }, { status: 400 });
    }

    const apiUrl = process.env.NAME_API_URL || 'https://api.name.com';
    const apiUser = process.env.NAME_API_USER;
    const apiToken = process.env.NAME_API_TOKEN;

    if (!apiUser || !apiToken) {
      return NextResponse.json({ error: 'API credentials not configured' }, { status: 500 });
    }

    const auth = Buffer.from(`${apiUser}:${apiToken}`).toString('base64');

    // Check availability for multiple domains (max 50)
    const response = await fetch(`${apiUrl}/v4/domains:checkAvailability`, {
      method: 'POST',
      headers: {
        'Authorization': `Basic ${auth}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        domainNames: domainNames.slice(0, 50), // Limit to 50 as per API docs
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Name.com API error:', errorText);
      return NextResponse.json({ error: 'Failed to check domain availability' }, { status: response.status });
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error('Domain check error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
