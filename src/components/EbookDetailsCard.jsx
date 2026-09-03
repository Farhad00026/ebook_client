"use client";
import { Button, Card } from "@heroui/react";
import Image from "next/image";
import {
  BookOpen,
  CheckCircle2,
  UserRound,
  Tag,
  ShoppingCart,
  ArrowLeft,
} from "lucide-react";
import Link from "next/link";

export function EbookDetailsCard({ product }) {
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

  const isAvailable = status === "Available";

  return (<main className="min-h-screen bg-gradient-to-br from-violet-50 via-white to-indigo-50 px-4 py-8 sm:px-6 lg:px-8 dark:from-gray-950 dark:via-gray-900 dark:to-violet-950/30"> <div className="mx-auto max-w-6xl">

    {/* Back Button */}
    <Link
      href="/ebooks"
      className="mb-6 inline-flex items-center gap-2 text-sm font-medium text-gray-600 transition-colors hover:text-violet-600 dark:text-gray-400 dark:hover:text-violet-400"
    >
      <ArrowLeft className="h-4 w-4" />
      Back to Ebooks
    </Link>

    {/* Main Card */}
    <Card className="overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-2xl dark:border-gray-800 dark:bg-gray-900">

      <div className="grid md:grid-cols-2">

        {/* ================= COVER ================= */}
        <div className="relative flex min-h-[500px] items-center justify-center overflow-hidden bg-gradient-to-br from-violet-100 via-indigo-100 to-purple-100 p-8 sm:p-12 dark:from-violet-950 dark:via-indigo-950 dark:to-gray-900">

          {/* Decorative circles */}
          <div className="absolute -left-20 -top-20 h-64 w-64 rounded-full bg-violet-400/20 blur-3xl" />
          <div className="absolute -bottom-20 -right-20 h-72 w-72 rounded-full bg-indigo-400/20 blur-3xl" />

          {/* Book cover */}
          <div className="relative z-10 w-full max-w-[300px] overflow-hidden rounded-xl shadow-2xl transition-transform duration-500 hover:scale-[1.03]">
            <div className="relative aspect-[2/3] w-full">
              <Image
                src={coverImage}
                alt={`${title} book cover`}
                fill
                priority
                sizes="(max-width: 768px) 80vw, 300px"
                className="object-cover"
              />
            </div>
          </div>

          {/* Genre Badge */}
          <div className="absolute left-5 top-5 z-20 inline-flex items-center gap-1.5 rounded-full bg-white/90 px-4 py-2 text-sm font-semibold text-gray-900 shadow-lg backdrop-blur-md dark:bg-gray-900/90 dark:text-white">
            <Tag className="h-4 w-4 text-violet-600" />
            {genre}
          </div>
        </div>

        {/* ================= INFORMATION ================= */}
        <div className="flex flex-col p-6 sm:p-8 lg:p-12">

          {/* Available / Sold */}
          <div className="mb-5">
            <span
              className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold ${isAvailable
                  ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400"
                  : "bg-red-100 text-red-700 dark:bg-red-500/10 dark:text-red-400"
                }`}
            >
              <CheckCircle2 className="h-4 w-4" />
              {status}
            </span>
          </div>

          {/* Title */}
          <h1 className="text-3xl font-extrabold leading-tight tracking-tight text-gray-900 sm:text-4xl lg:text-5xl dark:text-white">
            {title}
          </h1>

          {/* Writer */}
          <Link
            href={"#"}
            className="mt-4 inline-flex w-fit items-center gap-2 text-base font-semibold text-violet-600 transition-colors hover:text-violet-800 hover:underline dark:text-violet-400"
          >
            <UserRound className="h-5 w-5" />
            {writerName}
          </Link>

          {/* Divider */}
          <div className="my-6 h-px bg-gray-200 dark:bg-gray-800" />

          {/* Description */}
          <div>
            <h2 className="mb-3 flex items-center gap-2 text-lg font-bold text-gray-900 dark:text-white">
              <BookOpen className="h-5 w-5 text-violet-600" />
              About this Ebook
            </h2>

            <p className="text-base leading-7 text-gray-600 dark:text-gray-400">
              {description}
            </p>
          </div>

          {/* Information */}
          <div className="mt-7 grid grid-cols-2 gap-3">

            {/* Genre */}
            <div className="rounded-2xl bg-gray-50 p-4 dark:bg-gray-800/60">
              <p className="text-xs font-medium uppercase tracking-wide text-gray-500 dark:text-gray-400">
                Genre
              </p>
              <p className="mt-1 font-semibold text-gray-900 dark:text-white">
                {genre}
              </p>
            </div>

            {/* Status */}
            <div className="rounded-2xl bg-gray-50 p-4 dark:bg-gray-800/60">
              <p className="text-xs font-medium uppercase tracking-wide text-gray-500 dark:text-gray-400">
                Status
              </p>
              <p
                className={`mt-1 font-semibold ${isAvailable
                    ? "text-emerald-600 dark:text-emerald-400"
                    : "text-red-600 dark:text-red-400"
                  }`}
              >
                {status}
              </p>
            </div>
          </div>

          {/* Price */}
          <div className="mt-7 rounded-2xl bg-gradient-to-r from-violet-600 to-indigo-600 p-5 text-white shadow-lg">
            <p className="text-sm text-white/75">
              Ebook Price
            </p>

            <p className="mt-1 text-3xl font-extrabold">
              ${Number(price).toFixed(2)}
            </p>
          </div>

          {/* Purchase Button */}
          <div className="mt-6">

            <form action={`/api/payment`}>
              <input type="hidden" defaultValue={price} name="price"/>
              <input type="hidden" defaultValue={title} name="title"/>
              <input type="hidden" name="productId" defaultValue={_id}/>
              <Button
                type="submit"
                isDisabled={!isAvailable}
                className={`h-14 w-full rounded-xl text-base font-bold shadow-lg transition-all ${isAvailable
                    ? "bg-gray-950 text-white hover:bg-violet-700 hover:shadow-violet-500/25 dark:bg-white dark:text-gray-900 dark:hover:bg-violet-100"
                    : "cursor-not-allowed bg-gray-300 text-gray-500 dark:bg-gray-700 dark:text-gray-400"
                  }`}
              >
                <ShoppingCart className="h-5 w-5" />

                {isAvailable ? "Purchase Ebook" : "Currently Sold Out"}
              </Button>
            </form>
          </div>

          {/* Small note */}
          <p className="mt-4 text-center text-xs text-gray-500 dark:text-gray-500">
            Secure digital purchase • Instant access after payment
          </p>
        </div>
      </div>
    </Card>
  </div>
  </main>

  );
}
