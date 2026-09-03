/* eslint-disable react-hooks/set-state-in-effect */
/* eslint-disable react-hooks/refs */
"use client";

import React, { useCallback, useEffect, useState, useRef } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import Link from "next/link";
import { ChevronLeft, ChevronRight, BookOpen, PenLine, Library } from "lucide-react";

const slides = [
  {
    id: "discover",
    eyebrow: "For Readers",
    title: "Discover Your Next Great Read",
    subtitle:
      "Browse thousands of original ebooks from independent writers across every genre.",
    ctaLabel: "Browse Ebooks",
    ctaHref: "/ebooks",
    gradient: "from-indigo-600 via-violet-600 to-purple-700",
    Icon: BookOpen,
  },
  {
    id: "publish",
    eyebrow: "For Writers",
    title: "Publish Your Story, Reach Readers",
    subtitle:
      "Verify your writer account and start uploading your original work to a growing community of readers.",
    ctaLabel: "Become a Writer",
    ctaHref: "/ebooks",
    gradient: "from-emerald-600 via-teal-600 to-cyan-700",
    Icon: PenLine,
  },
  {
    id: "library",
    eyebrow: "Your Collection",
    title: "Your Digital Library, Anywhere",
    subtitle:
      "Collect, organize, and read your favorite ebooks anytime, on any device.",
    ctaLabel: "View My Library",
    ctaHref: "/ebooks",
    gradient: "from-orange-500 via-rose-500 to-pink-600",
    Icon: Library,
  },
];

export default function BannerSlider() {
  const autoplay = useRef(
    Autoplay({
      delay: 4500,
      stopOnInteraction: false,
      stopOnMouseEnter: true,
    }),
  );

  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true }, [
    autoplay.current,
  ]);

  const [selectedIndex, setSelectedIndex] = useState(0);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;

    onSelect();
    emblaApi.on("select", onSelect);

    return () => {
      emblaApi.off("select", onSelect);
    };
  }, [emblaApi, onSelect]);

  return (
    <div className="relative overflow-hidden rounded-3xl mt-3" ref={emblaRef}>
      <div className="flex">
        {slides.map((slide) => {
          const { id, eyebrow, title, subtitle, ctaLabel, ctaHref, gradient, Icon } =
            slide;

          return (
            <div key={id} className="relative min-w-0 flex-[0_0_100%]">
              <div
                className={`relative flex min-h-[320px] w-full items-center overflow-hidden bg-gradient-to-br ${gradient} px-8 py-14 sm:min-h-[420px] sm:px-16`}
              >
                {/* Decorative floating shapes */}
                <div className="pointer-events-none absolute -right-10 -top-10 h-64 w-64 rounded-full bg-white/10 blur-2xl" />
                <div className="pointer-events-none absolute bottom-0 right-24 h-40 w-40 rounded-full bg-white/10 blur-xl" />
                <div className="pointer-events-none absolute inset-0 opacity-10 [background-image:radial-gradient(circle,white_1px,transparent_1px)] [background-size:24px_24px]" />

                {/* Large decorative icon */}
                <Icon
                  className="pointer-events-none absolute -right-6 top-1/2 h-56 w-56 -translate-y-1/2 text-white/10 sm:h-72 sm:w-72"
                  strokeWidth={1}
                />

                {/* Text content */}
                <div className="relative z-10 max-w-xl">
                  <span className="inline-block rounded-full bg-white/15 px-4 py-1 text-sm font-medium text-white backdrop-blur-sm">
                    {eyebrow}
                  </span>
                  <h1 className="mt-4 text-3xl font-bold leading-tight text-white sm:text-5xl">
                    {title}
                  </h1>
                  <p className="mt-4 text-base text-white/85 sm:text-lg">
                    {subtitle}
                  </p>
                  <Link
                    href={ctaHref}
                    className="mt-6 inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 font-semibold text-gray-900 shadow-lg transition-transform hover:scale-105"
                  >
                    {ctaLabel}
                    <ChevronRight className="h-4 w-4" />
                  </Link>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Navigation */}
      <button
        onClick={() => emblaApi?.scrollPrev()}
        aria-label="Previous slide"
        className="absolute left-4 top-1/2 -translate-y-1/2 rounded-full bg-white/90 p-3 shadow-lg transition hover:bg-white"
      >
        <ChevronLeft />
      </button>

      <button
        onClick={() => emblaApi?.scrollNext()}
        aria-label="Next slide"
        className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full bg-white/90 p-3 shadow-lg transition hover:bg-white"
      >
        <ChevronRight />
      </button>

      {/* Dots */}
      <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 gap-2">
        {slides.map((slide, index) => (
          <button
            key={slide.id}
            onClick={() => emblaApi?.scrollTo(index)}
            aria-label={`Go to slide ${index + 1}`}
            className={`h-2.5 rounded-full transition-all ${
              selectedIndex === index ? "w-8 bg-white" : "w-2.5 bg-white/50"
            }`}
          />
        ))}
      </div>
    </div>
  );
}