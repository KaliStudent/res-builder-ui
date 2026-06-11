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

    // Extract metadata using regex
    const titleMatch = html.match(/<title[^>]*>([^<]+)<\/title>/i);
    const descriptionMatch = html.match(/<meta[^>]*name=["']description["'][^>]*content=["']([^"']+)["']/i) ||
                            html.match(/<meta[^>]*property=["']og:description["'][^>]*content=["']([^"']+)["']/i);
    const faviconMatch = html.match(/<link[^>]*rel=["'](?:icon|shortcut icon)["'][^>]*href=["']([^"']+)["']/i);
    const ogImageMatch = html.match(/<meta[^>]*property=["']og:image["'][^>]*content=["']([^"']+)["']/i);

    const title = titleMatch ? titleMatch[1].trim() : new URL(url).hostname;
    const description = descriptionMatch ? descriptionMatch[1].trim() : '';
    let favicon = faviconMatch ? faviconMatch[1].trim() : '';
    const ogImage = ogImageMatch ? ogImageMatch[1].trim() : '';

    // Make favicon URL absolute if relative
    if (favicon && !favicon.startsWith('http')) {
      const urlObj = new URL(url);
      if (favicon.startsWith('//')) {
        favicon = urlObj.protocol + favicon;
      } else if (favicon.startsWith('/')) {
        favicon = urlObj.origin + favicon;
      } else {
        favicon = urlObj.origin + '/' + favicon;
      }
    }

    // Fallback to default favicon if none found
    if (!favicon) {
      const urlObj = new URL(url);
      favicon = `${urlObj.origin}/favicon.ico`;
    }

    return NextResponse.json({
      success: true,
      metadata: {
        url,
        title,
        description,
        favicon,
        ogImage,
        dateAdded: new Date().toISOString(),
      },
    });
  } catch (error: any) {
    console.error('Error fetching metadata:', error);
    return NextResponse.json(
      {
        success: false,
        message: error.message || 'Failed to fetch metadata',
        error: String(error)
      },
      { status: 500 }
    );
  }
}
