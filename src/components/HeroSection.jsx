"use client";
import { motion, useReducedMotion } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

const shelf = [
  { title: "The Quiet Hours", author: "R. Amin", color: "#7A2E2E" },
  { title: "Salt & Static", author: "M. Kader", color: "#264A73" },
  { title: "Field Notes", author: "T. Reyes", color: "#2B4C3F" },
  { title: "Nine Doors", author: "L. Chowdhury", color: "#8A5A2B" },
  { title: "The Long Table", author: "S. Haque", color: "#4B3B63" },
];

const headline = ["Where stories find", "their readers."];

export default function HeroSection() {
  const shouldReduceMotion = useReducedMotion();

  const headlineVariants = {
    hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 24 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: {
        duration: shouldReduceMotion ? 0.3 : 0.6,
        delay: shouldReduceMotion ? 0 : 0.15 + i * 0.12,
        ease: [0.22, 1, 0.36, 1],
      },
    }),
  };

  const shelfContainerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: shouldReduceMotion ? 0 : 0.09,
        delayChildren: shouldReduceMotion ? 0 : 0.2,
      },
    },
  };

  const coverVariants = {
    hidden: {
      opacity: 0,
      y: shouldReduceMotion ? 0 : 32,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: shouldReduceMotion ? 0.3 : 0.55,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  const coverHover = shouldReduceMotion
    ? {}
    : {
        scale: 1.05,
        y: -8,
        transition: { duration: 0.25, ease: "easeOut" },
      };

  return (
    <section className="relative overflow-hidden bg-[#15130F] px-4 py-12 sm:px-8 sm:py-20 lg:py-28 rounded-2xl">
      <div className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-12 lg:grid-cols-[1.1fr_1fr] lg:gap-16">
        {/* Left Column */}
        <div className="text-center lg:text-left">
          <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl leading-[1.1] tracking-tight text-[#F3EAD8]">
            {headline.map((line, i) => (
              <motion.span
                key={line}
                custom={i}
                initial="hidden"
                animate="visible"
                variants={headlineVariants}
                className="block"
              >
                {line}
              </motion.span>
            ))}
          </h1>

          <motion.p
            initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: shouldReduceMotion ? 0.3 : 0.6,
              delay: shouldReduceMotion ? 0 : 0.45,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="mx-auto mt-4 max-w-prose text-base text-[#F3EAD8]/70 sm:mt-6 sm:text-lg lg:mx-0"
          >
            Fable connects readers and collectors with independent writers.
            Browse original ebooks, build your library, and support the people
            who wrote them — directly.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: shouldReduceMotion ? 0.3 : 0.6,
              delay: shouldReduceMotion ? 0 : 0.6,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-4 lg:justify-start"
          >
            <Link
              href="#"
              className="group inline-flex w-full items-center justify-center gap-2 rounded-full bg-[#BD9455] px-6 py-3 text-sm font-medium text-[#15130F] transition-colors hover:bg-[#D4AC6E] sm:w-auto"
            >
              Start reading
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </Link>

            <Link
              href="#"
              className="inline-flex w-full items-center justify-center gap-2 rounded-full border border-[#F3EAD8]/25 px-6 py-3 text-sm font-medium text-[#F3EAD8] transition-colors hover:border-[#F3EAD8]/50 sm:w-auto"
            >
              Publish your writing
            </Link>
          </motion.div>
        </div>

        {/* Right Column: Book Shelf */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={shelfContainerVariants}
          className="flex w-full items-end justify-center gap-2 overflow-x-auto py-4 sm:gap-3 lg:gap-4 lg:overflow-visible"
        >
          {shelf.map((book, i) => (
            <motion.div
              key={book.title}
              variants={coverVariants}
              whileHover={coverHover}
              style={{
                backgroundColor: book.color,
                rotate: shouldReduceMotion
                  ? "0deg"
                  : i % 2 === 0
                  ? "-3deg"
                  : "3deg",
              }}
              className="flex h-44 w-24 flex-shrink-0 flex-col justify-between rounded-sm p-3 shadow-xl sm:h-56 sm:w-32 lg:h-64 lg:w-36 sm:p-4"
            >
              <p className="font-serif text-xs font-medium leading-tight text-[#F3EAD8] sm:text-sm lg:text-base">
                {book.title}
              </p>
              <p className="text-[9px] uppercase tracking-wider text-[#F3EAD8]/60 sm:text-[10px] lg:text-xs">
                {book.author}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}