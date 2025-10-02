/*
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Sirius Finance",
  description: "sirius",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
*/

// app/layout.tsx
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Icon from "@/components/Icon";

// Inicializace Inter fontu
const inter = Inter({
  subsets: ["latin", "latin-ext"],
  variable: "--font-inter",
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

// Typy pro Top-bar z Strapi
interface StrapiResponse<T> {
  data: T;
  meta: Record<string, any>;
}

interface RichTextNode {
  type: string;
  text?: string;
  bold?: boolean;
  italic?: boolean;
  underline?: boolean;
  strikethrough?: boolean;
  url?: string;
  children?: RichTextNode[];
}

interface TopBar {
  id: number;
  documentId: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  Message: RichTextNode[];
  Links?: Array<{
    id: number;
    Label: string;
    Url: string;
    Icon: string | null;
  }>;
}

// Funkce pro fetch Top-bar dat
async function getTopBarData(): Promise<TopBar | null> {
  try {
    const url = new URL(
      "https://sirius-strapi-qbx63.ondigitalocean.app/api/top-bar"
    );

    url.searchParams.append("populate", "Links");

    const res = await fetch(url.toString(), {
      next: { revalidate: 60 },
      headers: {
        "Content-Type": "application/json",
      },
    });

    console.log("Top-bar URL:", url.toString());
    console.log("Top-bar status:", res.status);

    if (!res.ok) {
      const errorText = await res.text();
      console.error("Failed to fetch top-bar:", res.status, errorText);
      return null;
    }

    const json: StrapiResponse<TopBar> = await res.json();
    console.log("Top-bar data:", JSON.stringify(json.data, null, 2));
    return json.data;
  } catch (error) {
    console.error("Top-bar fetch error:", error);
    return null;
  }
}

// Helper funkce pro renderování Rich Text
function renderRichText(nodes: RichTextNode[]): React.ReactNode {
  return nodes.map((node, index) => {
    if (node.type === "paragraph") {
      return (
        <p key={index} className="inline">
          {node.children && renderRichText(node.children)}
        </p>
      );
    }

    if (node.type === "link" && node.url) {
      return (
        <a
          key={index}
          href={node.url}
          target="_blank"
          rel="noopener noreferrer"
          className="underline hover:text-gray-300"
        >
          {node.children && renderRichText(node.children)}
        </a>
      );
    }

    if (node.type === "text" && node.text) {
      let text = <span>{node.text}</span>;

      if (node.bold) text = <strong>{text}</strong>;
      if (node.italic) text = <em>{text}</em>;
      if (node.underline) text = <u>{text}</u>;
      if (node.strikethrough) text = <s>{text}</s>;

      return <span key={index}>{text}</span>;
    }

    return null;
  });
}

export const metadata: Metadata = {
  title: "Sirius Finance",
  description: "S námi je život bohatší",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const topBar = await getTopBarData();

  return (
    <html lang="cs">
      <body className={`${inter.className} antialiased`}>
        {/* Top Bar */}
        {topBar && (
          <div className="bg-[#EC4C19] text-white p-4">
            <div className="container mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
              {/* Message - Rich Text */}
              <div className="text-[15px] text-center md:text-left">
                {renderRichText(topBar.Message)}
              </div>

              {/* Links */}
              {topBar.Links && topBar.Links.length > 0 && (
                <div className="flex gap-4 items-center">
                  {topBar.Links.map((link) => (
                    <a
                      key={link.id}
                      href={link.Url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[15px] hover:text-white/80 transition-colors flex items-center gap-2"
                    >
                      <Icon name={link.Icon} size="S" className="text-white" />
                      {link.Label}
                    </a>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {/* Hlavní obsah stránky */}
        <main>{children}</main>
      </body>
    </html>
  );
}
