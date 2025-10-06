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
