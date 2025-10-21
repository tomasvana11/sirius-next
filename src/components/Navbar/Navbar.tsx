/*
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ContentWrapper } from "../ContentWrapper";

export const Navbar = async () => {
  return (
    <nav className="bg-white">
      <ContentWrapper>
        <div className="flex items-center justify-between gap-6 py-4">
          <Image src="/logo_sirius.svg" alt="Logo" width={50} height={50} />
          <div>x</div>
        </div>
      </ContentWrapper>
    </nav>
  );
};
*/
// components/Navbar.tsx
// components/Navbar.tsx
// components/Navbar.tsx
"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ContentWrapper } from "../ContentWrapper";
import { ButtonLink } from "../ButtonLink";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetTitle,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";

export const Navbar = () => {
  return (
    <nav className="bg-white shadow-sm">
      <ContentWrapper>
        <div className="flex items-center justify-between gap-6 py-4">
          {/* Logo */}
          <Link href="/" className="flex items-center cursor-pointer">
            <Image src="/logo_sirius.svg" alt="Logo" width={50} height={50} />
          </Link>

          {/* Desktop menu */}
          <div className="hidden lg:flex items-center gap-6">
            <Link
              href="/o-nas"
              className="text-neutral-700 hover:text-[#EC4C19] font-medium"
            >
              O nás
            </Link>
            <Link
              href="/spoluprace"
              className="text-neutral-700 hover:text-[#EC4C19] font-medium"
            >
              Spolupráce
            </Link>
            <Link
              href="/kariera"
              className="text-neutral-700 hover:text-[#EC4C19] font-medium"
            >
              Kariéra
            </Link>
            <Link
              href="/projekty"
              className="text-neutral-700 hover:text-[#EC4C19] font-medium"
            >
              Projekty
            </Link>
            <Link
              href="/reference"
              className="text-neutral-700 hover:text-[#EC4C19] font-medium"
            >
              Reference
            </Link>
            <Link
              href="/blog"
              className="text-neutral-700 hover:text-[#EC4C19] font-medium"
            >
              Blog
            </Link>
            <Link
              href="/kontakt"
              className="text-neutral-700 hover:text-[#EC4C19] font-medium"
            >
              Kontakty
            </Link>

            <ButtonLink variant="primary" theme="dark" href="/spoluprace">
              Chci se stát klientem
            </ButtonLink>
          </div>

          {/* Mobile menu */}
          <div className="lg:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Menu className="h-6 w-6" />
                  <span className="sr-only">Otevřít menu</span>
                </Button>
              </SheetTrigger>

              <SheetContent
                side="left"
                className="w-screen h-screen p-6 bg-white/95 backdrop-blur-md"
              >
                <SheetTitle className="text-lg font-bold mb-4">Menu</SheetTitle>
                <nav className="flex flex-col space-y-4 mt-2">
                  <Link
                    href="/o-nas"
                    className="text-lg font-medium hover:text-[#EC4C19]"
                  >
                    O nás
                  </Link>
                  <Link
                    href="/spoluprace"
                    className="text-lg font-medium hover:text-[#EC4C19]"
                  >
                    Spolupráce
                  </Link>
                  <Link
                    href="/kariera"
                    className="text-lg font-medium hover:text-[#EC4C19]"
                  >
                    Kariéra
                  </Link>
                  <Link
                    href="/projekty"
                    className="text-lg font-medium hover:text-[#EC4C19]"
                  >
                    Projekty
                  </Link>
                  <Link
                    href="/reference"
                    className="text-lg font-medium hover:text-[#EC4C19]"
                  >
                    Reference
                  </Link>
                  <Link
                    href="/blog"
                    className="text-lg font-medium hover:text-[#EC4C19]"
                  >
                    Blog
                  </Link>
                  <Link
                    href="/kontakt"
                    className="text-lg font-medium hover:text-[#EC4C19]"
                  >
                    Kontakty
                  </Link>
                  <ButtonLink variant="primary" theme="dark" href="/spoluprace">
                    Chci se stát klientem
                  </ButtonLink>
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </ContentWrapper>
    </nav>
  );
};
