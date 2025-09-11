import Image from "next/image";


/*
export default function Home() {
  return (
    <div className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
        <Image
          className="dark:invert"
          src="/next.svg"
          alt="Next.js logo"
          width={180}
          height={38}
          priority
        />
        <ol className="font-mono list-inside list-decimal text-sm/6 text-center sm:text-left">
          <li className="mb-2 tracking-[-.01em]">
            Get started by editing{" "}
            <code className="bg-black/[.05] dark:bg-white/[.06] font-mono font-semibold px-1 py-0.5 rounded">
              src/app/page.tsx
            </code>
            .
          </li>
          <li className="tracking-[-.01em]">
            Save and see your changes instantly.
          </li>
        </ol>
        <h2 className="text-2xl font-semibold mt-8 mb-4">Výhody naší firmy</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 w-full max-w-4xl">
          <div className="bg-white dark:bg-neutral-900 rounded-xl shadow p-6 flex flex-col items-center text-center transition-transform transition-colors duration-200 hover:bg-white hover:scale-105 dark:hover:bg-white/10">
            <span className="text-4xl mb-2">🚀</span>
            <h3 className="font-bold text-lg mb-2">Rychlý rozvoj</h3>
            <p className="text-sm text-neutral-600 dark:text-neutral-300">
              Neustále inovujeme a posouváme naše služby kupředu.
            </p>
          </div>
          <div className="bg-white dark:bg-neutral-900 rounded-xl shadow p-6 flex flex-col items-center text-center transition-transform transition-colors duration-200 hover:bg-white hover:scale-105 dark:hover:bg-white/10">
            <span className="text-4xl mb-2">🤝</span>
            <h3 className="font-bold text-lg mb-2">Individuální přístup</h3>
            <p className="text-sm text-neutral-600 dark:text-neutral-300">
              Každý klient je pro nás jedinečný a jeho potřeby jsou prioritou.
            </p>
          </div>
          <div className="bg-white dark:bg-neutral-900 rounded-xl shadow p-6 flex flex-col items-center text-center transition-transform transition-colors duration-200 hover:bg-white hover:scale-105 dark:hover:bg-white/10">
            <span className="text-4xl mb-2">💡</span>
            <h3 className="font-bold text-lg mb-2">Inovativní řešení</h3>
            <p className="text-sm text-neutral-600 dark:text-neutral-300">
              Přinášíme moderní technologie a kreativní nápady do každého
              projektu.
            </p>
          </div>
          <div className="bg-white dark:bg-neutral-900 rounded-xl shadow p-6 flex flex-col items-center text-center transition-transform transition-colors duration-200 hover:bg-white hover:scale-105 dark:hover:bg-white/10">
            <span className="text-4xl mb-2">🌍</span>
            <h3 className="font-bold text-lg mb-2">Globální působnost</h3>
            <p className="text-sm text-neutral-600 dark:text-neutral-300">
              Naše služby poskytujeme klientům po celém světě.
            </p>
          </div>
        </div>
        <div className="flex gap-4 items-center flex-col sm:flex-row">
          <a
            className="rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-foreground text-background gap-2 hover:bg-[#383838] dark:hover:bg-[#ccc] font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 sm:w-auto"
            href="https://vercel.com/new?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image
              className="dark:invert"
              src="/vercel.svg"
              alt="Vercel logomark"
              width={20}
              height={20}
            />
            Deploy now
          </a>
          <a
            className="rounded-full border border-solid border-black/[.08] dark:border-white/[.145] transition-colors flex items-center justify-center hover:bg-[#f2f2f2] dark:hover:bg-[#1a1a1a] hover:border-transparent font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 w-full sm:w-auto md:w-[158px]"
            href="https://nextjs.org/docs?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            Read our docs
          </a>
        </div>
      </main>
      <footer className="row-start-3 flex gap-[24px] flex-wrap items-center justify-center">
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/file.svg"
            alt="File icon"
            width={16}
            height={16}
          />
          Learn
        </a>
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/window.svg"
            alt="Window icon"
            width={16}
            height={16}
          />
          Examples
        </a>
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://nextjs.org?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/globe.svg"
            alt="Globe icon"
            width={16}
            height={16}
          />
          Go to nextjs.org →
        </a>
      </footer>
    </div>
  );
}
*/

export default function Custom404() {
  return (
    <div
      style={{
        backgroundColor: "white",
        color: "black",
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontFamily:
          "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, 'Noto Sans', sans-serif",
      }}
    >
      <div style={{ display: "flex", alignItems: "center" }}>
        <span
          style={{
            fontSize: "16px",
            fontWeight: "400",
            textAlign:"center",
          }}
        >
          Application error: a server-side exception has occurred while loading (see the server logs for more information).
          Digest: 3582039337
        </span>
      </div>
    </div>
  );
}

