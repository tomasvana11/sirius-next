"use client";

import Image from "next/image";

export default function Custom404() {
  return (
    <div
      style={{
        backgroundColor: "white",
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {/* Obrázek uprostřed */}
      <Image
        src="/logo_sirius.svg" // nahraď cestou k tvému obrázku
        alt="Logo"
        width={80}
        height={80}
      />

      {/* Loader */}
      <div className="flex flex-row gap-4 items-center mt-5">
      <div
        style={{
          width: "30px",
          height: "30px",
          border: "4px solid #ddd",
          borderTop: "4px solid black",
          borderRadius: "50%",
          animation: "spin 1s linear infinite",
        }}
      />
      <span className="text-black/85">Načítání</span>
      </div>

      {/* Definice animace */}
      <style jsx>{`
        @keyframes spin {
          0% {
            transform: rotate(0deg);
          }
          100% {
            transform: rotate(360deg);
          }
        }
      `}</style>
    </div>
  );
}
