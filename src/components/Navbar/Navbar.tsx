/*
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
          <Link href="/" className="flex items-center cursor-pointer">
            <Image src="/logo_sirius.svg" alt="Logo" width={50} height={50} />
          </Link>

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
              Pro klienty
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

            <ButtonLink
              variant="primary"
              theme="dark"
              href="/spoluprace#formular"
            >
              Chci se stát klientem
            </ButtonLink>
          </div>

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
                    Pro klienty
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
                  <ButtonLink
                    variant="primary"
                    theme="dark"
                    href="/spoluprace#formular"
                  >
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
*/

"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ContentWrapper } from "../ContentWrapper";
import { ButtonLink } from "../ButtonLink";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";

export const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [openItemIndex, setOpenItemIndex] = useState<number | null>(null);

  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [isMenuOpen]);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
    setOpenItemIndex(null);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
    setOpenItemIndex(null);
  };

  const toggleItem = (index: number) => {
    setOpenItemIndex(openItemIndex === index ? null : index);
  };

  const navItems = [
    { title: "O nás", href: "/o-nas" },
    { title: "Pro klienty", href: "/spoluprace" },
    { title: "Kariéra", href: "/kariera" },
    { title: "Projekty", href: "/projekty" },
    { title: "Reference", href: "/reference" },
    { title: "Blog", href: "/blog" },
    { title: "Kontakty", href: "/kontakt" },
  ];

  return (
    <>
      <nav className="bg-white shadow-sm">
        <ContentWrapper>
          <div className="flex items-center justify-between gap-6 py-4">
            {/* Logo */}
            <Link href="/" className="flex items-center cursor-pointer">
              <Image src="/logo_sirius.svg" alt="Logo" width={50} height={50} />
            </Link>

            {/* Desktop menu */}
            <div className="hidden lg:flex items-center gap-6">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="text-neutral-700 hover:text-[#EC4C19] font-medium"
                >
                  {item.title}
                </Link>
              ))}

              <ButtonLink
                variant="primary"
                theme="dark"
                href="/spoluprace#formular"
              >
                Chci se stát klientem
              </ButtonLink>
            </div>

            {/* Mobile menu button */}
            <div className="lg:hidden flex items-center">
              <button onClick={toggleMenu} className="cursor-pointer">
                <Menu className="h-6 w-6 text-neutral-700" />
                <span className="sr-only">Otevřít menu</span>
              </button>
            </div>
          </div>
        </ContentWrapper>
      </nav>

      {/* Mobile hamburger menu */}
      {isMenuOpen && (
        <div className="fixed inset-0 z-50 bg-white lg:hidden">
          {/* Header */}
          <div className="px-5">
            <div className="flex items-center justify-between py-4">
              <Link href="/" onClick={closeMenu} className="flex items-center">
                <Image
                  src="/logo_sirius.svg"
                  alt="Logo"
                  width={50}
                  height={50}
                />
              </Link>
              <button
                onClick={closeMenu}
                aria-label="Zavřít menu"
                className="cursor-pointer flex items-center"
              >
                <X className="h-6 w-6 text-neutral-700" />
              </button>
            </div>
            <div className="h-px bg-neutral-200" />
          </div>

          {/* Menu content */}
          <div
            className="flex-1 overflow-y-auto px-5 pt-10"
            style={{ maxHeight: "calc(100vh - 120px)" }}
          >
            <div className="flex flex-col space-y-4">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={closeMenu}
                  className="text-neutral-700 hover:text-[#EC4C19] font-medium text-lg"
                >
                  {item.title}
                </Link>
              ))}
            </div>

            <div className="mt-10 pb-10">
              <div className="h-px bg-neutral-200 mb-10" />
              <div onClick={closeMenu}>
                <ButtonLink
                  variant="primary"
                  theme="dark"
                  href="/spoluprace#formular"
                >
                  Chci se stát klientem
                </ButtonLink>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
