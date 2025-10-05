import { NextRequest, NextResponse } from "next/server";

// Jednoduchý in-memory rate limiter
const submissions = new Map<string, number[]>();

function rateLimit(ip: string): boolean {
  const now = Date.now();
  const windowMs = 60 * 1000; // 1 minuta
  const maxRequests = 3; // max 3 požadavky za minutu

  const timestamps = submissions.get(ip) || [];
  const recentTimestamps = timestamps.filter(t => now - t < windowMs);
  
  if (recentTimestamps.length >= maxRequests) {
    return false;
  }
  
  recentTimestamps.push(now);
  submissions.set(ip, recentTimestamps);
  return true;
}

export async function POST(request: NextRequest) {
  try {
    // Získání IP adresy z headerů
    const ip = 
      request.headers.get('x-forwarded-for')?.split(',')[0] ||
      request.headers.get('x-real-ip') ||
      'unknown';
    
    if (!rateLimit(ip)) {
      return NextResponse.json(
        { success: false, error: "Příliš mnoho požadavků. Zkuste to za chvíli." },
        { status: 429 }
      );
    }

    const body = await request.json();
    
    // Validace dat
    if (!body.Name || !body.Phone || !body.Email) {
      return NextResponse.json(
        { success: false, error: "Všechna pole jsou povinná" },
        { status: 400 }
      );
    }

    // Anti-bot honeypot
    if (body.website) {
      return NextResponse.json({ success: true }); // Předstírat úspěch
    }

    // Základní email validace
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(body.Email)) {
      return NextResponse.json(
        { success: false, error: "Neplatný email" },
        { status: 400 }
      );
    }

    // Validace telefonu - pouze čísla, mezery a +
const phoneRegex = /^[\d\s+]+$/;
if (!phoneRegex.test(body.Phone)) {
  return NextResponse.json(
    { success: false, error: "Telefonní číslo může obsahovat pouze čísla, mezery a +" },
    { status: 400 }
  );
}

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_STRAPI_URL}/api/poptavky-z-formulares`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ data: body }),
      }
    );

    const responseData = await response.json();

    if (!response.ok) {
      return NextResponse.json(
        { success: false, error: "Nepodařilo se odeslat formulář" },
        { status: response.status }
      );
    }

    return NextResponse.json({ success: true, data: responseData });
  } catch (error) {
    console.error("API route error:", error);
    return NextResponse.json(
      { success: false, error: "Internal server error" },
      { status: 500 }
    );
  }
}