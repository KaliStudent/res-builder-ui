import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { keyword } = await request.json();

    if (!keyword) {
      return NextResponse.json({ error: 'Keyword is required' }, { status: 400 });
    }

    const apiUrl = process.env.NAME_API_URL || 'https://api.name.com';
    const apiUser = process.env.NAME_API_USER;
    const apiToken = process.env.NAME_API_TOKEN;

    if (!apiUser || !apiToken) {
      return NextResponse.json({ error: 'API credentials not configured' }, { status: 500 });
    }

    // Create auth header (Basic Auth with username:token)
    const auth = Buffer.from(`${apiUser}:${apiToken}`).toString('base64');

    // Search for domain availability
    const response = await fetch(`${apiUrl}/v4/domains:search`, {
      method: 'POST',
      headers: {
        'Authorization': `Basic ${auth}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        keyword,
        timeout: 1000,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Name.com API error:', errorText);
      return NextResponse.json({ error: 'Failed to search domains' }, { status: response.status });
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error('Domain search error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
