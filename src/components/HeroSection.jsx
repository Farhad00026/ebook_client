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

  // Two variant sets: full motion vs. reduced (opacity-only, no movement/rotation)
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
    hidden: {},
    visible: {
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
      rotate: shouldReduceMotion ? 0 : -6,
    },
    visible: {
      opacity: 1,
      y: 0,
      rotate: 0,
      transition: { duration: shouldReduceMotion ? 0.3 : 0.55, ease: [0.22, 1, 0.36, 1] },
    },
  };

  const coverHover = shouldReduceMotion
    ? {}
    : {
        scale: 1.08,
        rotate: 0,
        y: -10,
        transition: { duration: 0.25, ease: "easeOut" },
      };

  return (
    <section className="relative overflow-hidden bg-[#15130F] px-6 py-24 sm:py-32 rounded-2xl">
      <div className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-16 lg:grid-cols-[1.1fr_1fr]">
        {/* Left: headline + copy + CTA */}
        <div>
          <h1 className="font-serif text-[2.75rem] leading-[1.08] tracking-tight text-[#F3EAD8] sm:text-6xl">
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
            className="mt-6 max-w-[46ch] text-lg leading-relaxed text-[#F3EAD8]/70"
          >
            Fable connects readers and collectors with independent writers.
            Browse original ebooks, build your library, and support the
            people who wrote them — directly.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: shouldReduceMotion ? 0.3 : 0.6,
              delay: shouldReduceMotion ? 0 : 0.6,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="mt-10 flex flex-wrap items-center gap-4"
          >
            <Link
              href="#"
              className="group inline-flex items-center gap-2 rounded-full bg-[#BD9455] px-6 py-3 text-sm font-medium text-[#15130F] transition-colors hover:bg-[#D4AC6E]"
            >
              Start reading
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </Link>

            <Link
              href="#"
              className="inline-flex items-center gap-2 rounded-full border border-[#F3EAD8]/25 px-6 py-3 text-sm font-medium text-[#F3EAD8] transition-colors hover:border-[#F3EAD8]/50"
            >
              Publish your writing
            </Link>
          </motion.div>
        </div>

        {/* Right: staggered book shelf, hover scale */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.4 }}
          variants={shelfContainerVariants}
          className="relative flex items-end justify-center gap-3 sm:gap-4"
        >
          {shelf.map((book, i) => (
            <motion.div
              key={book.title}
              variants={coverVariants}
              whileHover={coverHover}
              style={{
                backgroundColor: book.color,
                rotate: shouldReduceMotion ? "0deg" : i % 2 === 0 ? "-3deg" : "3deg",
              }}
              className="flex h-52 w-32 flex-shrink-0 flex-col justify-between rounded-sm p-3 shadow-[0_18px_30px_-12px_rgba(0,0,0,0.55)] sm:h-64 sm:w-40 sm:p-4"
            >
              <p className="font-serif text-sm leading-tight text-[#F3EAD8] sm:text-base">
                {book.title}
              </p>
              <p className="text-[10px] uppercase text-[#F3EAD8]/60 sm:text-xs">
                {book.author}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}