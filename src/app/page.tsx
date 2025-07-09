import Image from "next/image";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
        <div className="relative">
          <Image
            className="dark:invert"
            src="/next.svg"
            alt="Next.js logo"
            width={180}
            height={38}
            priority
          />
          <div className="absolute -bottom-1 left-0 w-full h-0.5 bg-gradient-to-r from-ring/60 via-ring to-ring/60 rounded-full"></div>
        </div>
        
        <div className="text-center sm:text-left">
          <h1 className="text-4xl sm:text-5xl font-bold mb-4 bg-gradient-to-r from-foreground via-ring to-foreground bg-clip-text text-transparent">
            Welcome to Vibe Coding Magic
          </h1>
          <p className="text-lg text-muted-foreground mb-6">
            Where code meets creativity and <span className="text-ring font-semibold">magic happens</span>
          </p>
        </div>

        <ol className="list-inside list-decimal text-sm/6 text-center sm:text-left font-[family-name:var(--font-geist-mono)] border-l-2 border-ring/30 pl-6">
          <li className="mb-2 tracking-[-.01em]">
            Get started by editing{" "}
            <code className="bg-ring/10 border border-ring/20 text-ring px-2 py-1 rounded font-[family-name:var(--font-geist-mono)] font-semibold">
              src/app/page.tsx
            </code>
            .
          </li>
          <li className="tracking-[-.01em]">
            Save and see your <span className="text-ring font-medium">changes instantly</span>.
          </li>
        </ol>

        {/* Enhanced Button with red accent */}
        <div className="relative group">
          <div className="absolute -inset-0.5 bg-gradient-to-r from-ring to-ring/60 rounded-lg blur opacity-30 group-hover:opacity-60 transition duration-300"></div>
          <Button variant="default" size="lg" className="relative bg-ring hover:bg-ring/90 text-white border-0">
            ✨ Experience the Magic
          </Button>
        </div>

        <div className="flex gap-4 items-center flex-col sm:flex-row">
          <a
            className="rounded-full border-2 border-ring/20 bg-gradient-to-r from-ring/5 to-ring/10 backdrop-blur-sm transition-all duration-300 flex items-center justify-center text-foreground gap-2 hover:border-ring/40 hover:shadow-lg hover:shadow-ring/20 font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 sm:w-auto group"
            href="https://vercel.com/new?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image
              className="dark:invert group-hover:scale-110 transition-transform"
              src="/vercel.svg"
              alt="Vercel logomark"
              width={20}
              height={20}
            />
            <span className="group-hover:text-ring transition-colors">Deploy now</span>
          </a>
          <a
            className="rounded-full border-2 border-muted-foreground/20 transition-all duration-300 flex items-center justify-center hover:border-ring/40 hover:bg-ring/5 hover:shadow-lg hover:shadow-ring/10 font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 w-full sm:w-auto md:w-[158px] group"
            href="https://nextjs.org/docs?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            <span className="group-hover:text-ring transition-colors">Read our docs</span>
          </a>
        </div>
      </main>
      <footer className="row-start-3 flex gap-[24px] flex-wrap items-center justify-center">
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4 group transition-colors hover:text-ring"
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
            className="group-hover:scale-110 transition-transform"
          />
          Learn
        </a>
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4 group transition-colors hover:text-ring"
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
            className="group-hover:scale-110 transition-transform"
          />
          Examples
        </a>
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4 group transition-colors hover:text-ring"
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
            className="group-hover:scale-110 transition-transform"
          />
          Go to nextjs.org →
        </a>
      </footer>
    </div>
  );
}
