"use client";
import { Button, Card } from "@heroui/react";
import Image from "next/image";
import Link from "next/link";
import { BookOpen, CalendarDays, UserRound, ArrowRight } from "lucide-react";
export function EbookCard({ product }) {
  const {
    _id,
    title,
    writerName,
    description,
    price,
    genre,
    status,
    coverImage,
  } = product;

  // Current date
  const uploadedDate = new Date().toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  return (
    <Card className="group flex h-full w-full flex-col overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl dark:border-gray-800 dark:bg-gray-900">
      {/* ================= COVER IMAGE ================= */}
      <div className="relative aspect-[3/4] w-full overflow-hidden">
        <Image
          src={coverImage}
          alt={`${title} book cover`}
          fill
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />

        {/* Image Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

        {/* Genre */}
        <span className="absolute left-3 top-3 rounded-full bg-white/90 px-2.5 py-1 text-xs font-semibold text-gray-900 shadow-md backdrop-blur-sm">
          {genre}
        </span>

        {/* Status */}
        <span
          className={`absolute bottom-3 right-3 rounded-full px-2.5 py-1 text-xs font-semibold shadow-md ${
            status === "Available"
              ? "bg-emerald-500 text-white"
              : "bg-red-500 text-white"
          }`}
        >
          {status}
        </span>
      </div>

      {/* ================= CONTENT ================= */}
      <div className="flex flex-1 flex-col p-4 sm:p-5">
        {/* Title */}
        <Card.Header className="gap-1 p-0">
          <Card.Title className="line-clamp-2 text-lg font-bold leading-tight text-gray-900 dark:text-white sm:text-xl">
            {title}
          </Card.Title>

          {/* Writer */}
          <Link
            href={`#`}
            className="mt-1 inline-flex w-fit items-center gap-1.5 text-sm font-medium text-violet-600 transition-colors hover:text-violet-800 hover:underline dark:text-violet-400"
          >
            <UserRound className="h-3.5 w-3.5" />
            <span className="line-clamp-1">{writerName}</span>
          </Link>
        </Card.Header>

        {/* Description */}
        <Card.Description className="mt-3 line-clamp-3 text-sm leading-5 text-gray-600 dark:text-gray-400">
          {description}
        </Card.Description>

        {/* ================= INFO ================= */}
        <div className="mt-4 grid grid-cols-2 gap-2">
          {/* Price */}
          <div className="rounded-xl bg-gray-50 p-2.5 dark:bg-gray-800/70">
            <p className="text-[11px] text-gray-500 dark:text-gray-400">
              Price
            </p>

            <p className="mt-0.5 text-base font-bold text-gray-900 dark:text-white">
              ${Number(price).toFixed(2)}
            </p>
          </div>

          {/* Genre */}
          <div className="rounded-xl bg-gray-50 p-2.5 dark:bg-gray-800/70">
            <p className="text-[11px] text-gray-500 dark:text-gray-400">
              Genre
            </p>

            <p className="mt-0.5 truncate text-sm font-semibold text-gray-900 dark:text-white">
              {genre}
            </p>
          </div>
        </div>

        {/* Uploaded Date */}
        <div className="mt-2 flex items-center gap-1.5 text-xs text-gray-500 dark:text-gray-400">
          <CalendarDays className="h-3.5 w-3.5 text-violet-500" />
          <span>Uploaded {uploadedDate}</span>
        </div>

        {/* ================= FOOTER ================= */}
        <Card.Footer className="mt-auto flex flex-col gap-3 p-0 pt-5">
          <div className="flex w-full items-center gap-1.5 text-xs text-gray-500 dark:text-gray-400">
            <BookOpen className="h-4 w-4 text-violet-500" />
            <span>Digital Ebook</span>
          </div>

          {/* <Button
        as={Link}
        href={`/ebooks/${_id}`}
        className="w-full bg-violet-600 font-semibold text-white shadow-md transition-all hover:bg-violet-700 hover:shadow-lg"
      >
        View Details
        <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
      </Button> */}
          <Link
            href={`/ebooks/${_id}`}
            className="w-full bg-violet-600 font-semibold text-white shadow-md transition-all hover:bg-violet-700 hover:shadow-lg text-center rounded-3xl"
          >
            View Details
          </Link>
        </Card.Footer>
      </div>
    </Card>
  );
}

