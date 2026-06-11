import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { url } = await request.json();

    if (!url) {
      return NextResponse.json(
        { success: false, message: 'URL is required' },
        { status: 400 }
      );
    }

    // Validate URL format
    try {
      new URL(url);
    } catch {
      return NextResponse.json(
        { success: false, message: 'Invalid URL format' },
        { status: 400 }
      );
    }

    // Fetch the page
    const response = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
      }
    });

    if (!response.ok) {
      return NextResponse.json(
        { success: false, message: 'Failed to fetch URL' },
        { status: 400 }
      );
    }

    const html = await response.text();

    // Remove script and style tags
    let cleanedHtml = html.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '');
    cleanedHtml = cleanedHtml.replace(/<style\b[^<]*(?:(?!<\/style>)<[^<]*)*<\/style>/gi, '');

    // Remove HTML tags
    cleanedHtml = cleanedHtml.replace(/<[^>]+>/g, ' ');

    // Decode HTML entities
    cleanedHtml = cleanedHtml
      .replace(/&nbsp;/g, ' ')
      .replace(/&amp;/g, '&')
      .replace(/&lt;/g, '<')
      .replace(/&gt;/g, '>')
      .replace(/&quot;/g, '"')
      .replace(/&#39;/g, "'");

    // Remove extra whitespace
    cleanedHtml = cleanedHtml.replace(/\s+/g, ' ').trim();

    // Limit content to reasonable size (first 15000 characters for AI processing)
    const content = cleanedHtml.substring(0, 15000);

    return NextResponse.json({
      success: true,
      content,
      contentLength: cleanedHtml.length,
      truncated: cleanedHtml.length > 15000,
    });
  } catch (error: any) {
    console.error('Error scraping job listing:', error);
    return NextResponse.json(
      {
        success: false,
        message: error.message || 'Failed to scrape job listing',
        error: String(error)
      },
      { status: 500 }
    );
  }
}
