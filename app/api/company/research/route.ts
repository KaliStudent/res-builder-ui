import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(request: NextRequest) {
  try {
    const { companyName, companyUrl } = await request.json();

    if (!companyName) {
      return NextResponse.json(
        { success: false, message: 'Company name is required' },
        { status: 400 }
      );
    }

    let companyContext = '';

    // If URL is provided, try to fetch company website content
    if (companyUrl) {
      try {
        const response = await fetch(companyUrl, {
          headers: {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
          }
        });

        if (response.ok) {
          let html = await response.text();
          // Clean HTML
          html = html.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '');
          html = html.replace(/<style\b[^<]*(?:(?!<\/style>)<[^<]*)*<\/style>/gi, '');
          html = html.replace(/<[^>]+>/g, ' ');
          html = html.replace(/&nbsp;/g, ' ').replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>');
          html = html.replace(/\s+/g, ' ').trim();
          companyContext = html.substring(0, 5000);
        }
      } catch (urlError) {
        console.error('Failed to fetch company URL:', urlError);
      }
    }

    // Use AI to research and analyze the company
    const prompt = `Research and provide information about the company "${companyName}".

${companyContext ? `Here is content from their website:\n${companyContext}\n\n` : ''}

Provide a comprehensive analysis including:
1. Company Overview: Brief description of what the company does
2. Industry & Sector: What industry and sector they operate in
3. Company Size & Scale: Estimated size, number of employees, locations
4. Culture & Values: Company culture, mission, and core values
5. Products/Services: Main products or services offered
6. Notable Information: Recent news, achievements, or interesting facts
7. Workplace Insights: Information about working there (benefits, work environment, etc.)
8. Red Flags: ONLY mention if there are SERIOUS ethical concerns, major scandals, or widespread documented issues. Do not include minor complaints or normal business challenges. Leave this section empty if there are no significant concerns.

Return as JSON with these exact keys: overview, industry, size, culture, products, notable, workplace, redFlags (array of strings, empty if none).

Important: Only include red flags that are well-documented, serious ethical violations, major legal issues, or widespread systemic problems. Do not speculate or include minor issues.`;

    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content: "You are a professional company research analyst. Provide factual, objective information. Only flag serious, well-documented ethical or legal issues as red flags. Always return valid JSON."
        },
        {
          role: "user",
          content: prompt
        }
      ],
      temperature: 0.3,
      response_format: { type: "json_object" }
    });

    const research = JSON.parse(completion.choices[0].message.content || '{}');

    return NextResponse.json({
      success: true,
      research: {
        companyName,
        ...research,
        timestamp: new Date().toISOString(),
      },
    });
  } catch (error: any) {
    console.error('Error researching company:', error);
    return NextResponse.json(
      {
        success: false,
        message: error.message || 'Failed to research company',
        error: String(error)
      },
      { status: 500 }
    );
  }
}
