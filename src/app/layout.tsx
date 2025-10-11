// app/layout.tsx
import type { Metadata } from "next";
import { Inter, Nunito } from "next/font/google";
import "./globals.css";
import Icon from "@/components/Icon";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { getTopBar, renderRichText } from "@/lib/strapi";
import { ContentWrapper } from "@/components/ContentWrapper";

// Inicializace Inter fontu
const inter = Inter({
  subsets: ["latin", "latin-ext"],
  variable: "--font-inter",
  display: "swap",
  weight: ["400", "500", "600", "700"],
});
const nunito = Nunito({
  subsets: ["latin", "latin-ext"],
  variable: "--font-nunito",
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Sirius Finance",
  description: "S námi je život bohatší",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const topBar = await getTopBar();

  return (
    <html lang="cs">
      <body
        className={`${inter.className} ${nunito.variable} antialiased overflow-x-hidden max-w-full`}
      >
        {/* Top Bar */}
        {topBar && (
          <div className="bg-[#EC4C19] text-white p-4">
            <ContentWrapper>
              <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                {/* Message - Rich Text */}
                <div className="text-[15px] text-center md:text-left [&_p]:mb-0 [&_a]:hover:text-white/75 [&_a]:transition-colors [&_a]:duration-200">
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
                        className="text-[15px] hover:text-white/75 transition-colors duration-200 flex items-center gap-2"
                      >
                        <Icon
                          name={link.Icon}
                          size="S"
                          className="text-white"
                        />
                        {link.Label}
                      </a>
                    ))}
                  </div>
                )}
              </div>
            </ContentWrapper>
          </div>
        )}
        <Navbar />
        {/* Hlavní obsah stránky */}
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
