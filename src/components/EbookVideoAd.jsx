"use client";
import Link from "next/link";
import { ArrowRight, BookOpen, Play } from "lucide-react";
export default function EbookVideoAd() {
return ( <section className="mt-8 overflow-hidden rounded-3xl bg-gray-950 shadow-xl"> <div className="grid items-center md:grid-cols-2">
{/* Video */} <div className=" relative h-[280px] w-full overflow-hidden sm:h-[350px] md:h-[420px]"> <video
         className="h-full w-full object-cover"
         autoPlay
         muted
         loop
         playsInline
         preload="metadata"
       > <source src="/videos/reading-book.mp4" type="video/mp4" />
Your browser does not support the video tag. </video>

      {/* Video overlay */}
      <div className="absolute inset-0 bg-black/25" />

      {/* Small badge */}
      <div className="absolute left-5 top-5 flex items-center gap-2 rounded-full bg-white/90 px-4 py-2 text-sm font-semibold text-gray-900 shadow-lg">
        <Play className="h-4 w-4 fill-current" />
        Start Reading
      </div>
    </div>

    {/* Content */}
    <div className="relative px-7 py-10 sm:px-10 md:px-12 lg:px-16">
      {/* Decorative circle */}
      <div className="pointer-events-none absolute -right-20 -top-20 h-56 w-56 rounded-full bg-violet-600/20 blur-3xl" />

      <div className="relative z-10">
        <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-violet-500/20 text-violet-400">
          <BookOpen className="h-6 w-6" />
        </div>

        <p className="text-sm font-semibold uppercase tracking-widest text-violet-400">
          Your next chapter awaits
        </p>

        <h2 className="mt-3 text-3xl font-bold leading-tight text-white sm:text-4xl">
          Escape Into a Great Story
        </h2>

        <p className="mt-4 max-w-lg text-base leading-7 text-gray-300">
          Discover original ebooks from talented writers and find stories
          that inspire, entertain, and stay with you long after the last
          page.
        </p>

        <Link
          href="/ebooks"
          className="mt-7 inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 font-semibold text-gray-900 shadow-lg transition-all hover:scale-105 hover:bg-gray-100"
        >
          Explore Ebooks
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </div>
  </div>
</section>

);
}
