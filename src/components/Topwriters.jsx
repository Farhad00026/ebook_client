"use client";

import Image from "next/image";
import Link from "next/link";

// Swap for your real "top writers by sales" API response — keep this shape:
// { id, name, avatarUrl, salesCount }
const topWriters = [
  { id: "w1", name: "Rukhsana Amin", avatarUrl: null, salesCount: 4820 },
  { id: "w2", name: "Tahmid Reyes", avatarUrl: null, salesCount: 3910 },
  { id: "w3", name: "Lubna Chowdhury", avatarUrl: null, salesCount: 3475 },
];

const rankLabel = ["No. 1", "No. 2", "No. 3"];

function initials(name) {
  return name
    .split(" ")
    .map((part) => part[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
}

function formatSales(count) {
  return new Intl.NumberFormat("en-US").format(count);
}

export default function TopWriters({ writers = topWriters }) {
  const top3 = writers.slice(0, 3);

  return (
    <section className="bg-[#15130F] px-4 py-16 sm:px-6 sm:py-20 rounded-2xl">
      <div className="mx-auto max-w-5xl">
        <div className="text-center">
          <h2 className="font-serif text-3xl leading-tight text-[#F3EAD8] sm:text-4xl">
            Top writers
          </h2>
          <p className="mx-auto mt-3 max-w-[46ch] text-sm text-[#F3EAD8]/60 sm:text-base">
            The three writers readers have supported the most this season.
          </p>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-4 sm:mt-12 sm:grid-cols-3 sm:gap-6">
          {top3.map((writer, i) => (
            <Link
              key={writer.id}
              href={`/writers/${writer.id}`}
              className="group flex flex-col items-center rounded-2xl border border-[#F3EAD8]/10 bg-[#1C1914] p-6 text-center transition-colors hover:border-[#BD9455]/40 sm:p-8"
            >
              <span className="text-xs font-medium uppercase tracking-wide text-[#BD9455]">
                {rankLabel[i]}
              </span>

              <div
                className={`mt-4 flex h-20 w-20 items-center justify-center overflow-hidden rounded-full bg-[#2B4C3F] ring-2 ring-offset-4 ring-offset-[#1C1914] transition-transform group-hover:scale-105 sm:h-24 sm:w-24 ${
                  i === 0 ? "ring-[#BD9455]" : "ring-[#F3EAD8]/15"
                }`}
              >
                {writer.avatarUrl ? (
                  <Image
                    src={writer.avatarUrl}
                    alt={writer.name}
                    width={96}
                    height={96}
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <span className="font-serif text-2xl text-[#F3EAD8] sm:text-3xl">
                    {initials(writer.name)}
                  </span>
                )}
              </div>

              <p className="mt-4 font-serif text-lg text-[#F3EAD8] sm:text-xl">
                {writer.name}
              </p>
              <p className="mt-1 text-xs text-[#F3EAD8]/50 sm:text-sm">
                {formatSales(writer.salesCount)} sales
              </p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}