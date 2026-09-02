"use client";
import Link from "next/link";
import {
  BookOpen,
  Search,
  Heart,
  Rocket,
  WandSparkles,
  Ghost,
  Compass,
  Lightbulb,
} from "lucide-react";

const genres = [
  {
    name: "Fiction",
    description: "Stories that spark imagination",
    icon: BookOpen,
    color: "bg-[#7A2E2E]",
  },
  {
    name: "Mystery",
    description: "Secrets waiting to be solved",
    icon: Search,
    color: "bg-[#264A73]",
  },
  {
    name: "Romance",
    description: "Stories of love and connection",
    icon: Heart,
    color: "bg-[#8A5A2B]",
  },
  {
    name: "Sci-Fi",
    description: "Explore worlds beyond reality",
    icon: Rocket,
    color: "bg-[#2B4C3F]",
  },
  {
    name: "Fantasy",
    description: "Magic, myths, and adventures",
    icon: WandSparkles,
    color: "bg-[#4B3B63]",
  },
  {
    name: "Horror",
    description: "Stories that haunt your thoughts",
    icon: Ghost,
    color: "bg-[#3C3A36]",
  },
  {
    name: "Adventure",
    description: "Journeys worth remembering",
    icon: Compass,
    color: "bg-[#6B4F3A]",
  },
  {
    name: "Non-Fiction",
    description: "Real stories and real knowledge",
    icon: Lightbulb,
    color: "bg-[#5A5A3B]",
  },
];

export default function EbookGenres() {
  return (
    <section className="px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
      <div className="mx-auto max-w-6xl">
        {/* Section Header */}
        <div className="mb-10 text-center sm:mb-12">
          <p className="mb-2 text-sm font-medium uppercase tracking-[0.2em] text-[#BD9455]">
            Explore
          </p>

          <h2 className="font-serif text-3xl font-semibold text-[#15130F] sm:text-4xl md:text-5xl">
            Ebook Genres
          </h2>

          <p className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-[#15130F]/60 sm:text-base">
            Find your next favorite read by exploring stories across different
            genres and discover independent writers from around the world.
          </p>
        </div>

        {/* Genre Grid */}
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-2 sm:gap-4 md:grid-cols-3 lg:grid-cols-4">
          {genres.map((genre) => {
            const Icon = genre.icon;

            return (
              <Link
                key={genre.name}
                href={"#"}
                // href={`/ebooks?genre=${encodeURIComponent(genre.name)}`}
                className="group"
              >
                <div className="h-full overflow-hidden rounded-2xl border border-[#15130F]/10 bg-[#F8F4EA] transition-all duration-300 hover:-translate-y-1 hover:border-[#BD9455]/40 hover:shadow-lg">
                  {/* Icon */}
                  <div
                    className={`flex h-20 items-center justify-center ${genre.color} sm:h-24`}
                  >
                    <Icon className="h-8 w-8 text-[#F3EAD8] transition-transform duration-300 group-hover:scale-110 sm:h-9 sm:w-9" />
                  </div>

                  {/* Content */}
                  <div className="p-4 sm:p-5">
                    <h3 className="font-serif text-lg font-semibold text-[#15130F] sm:text-xl">
                      {genre.name}
                    </h3>

                    <p className="mt-1.5 line-clamp-2 text-xs leading-relaxed text-[#15130F]/55 sm:text-sm">
                      {genre.description}
                    </p>

                    {/* Browse link */}
                    <div className="mt-4 text-xs font-medium text-[#BD9455] transition-colors group-hover:text-[#8A5A2B] sm:text-sm">
                      Browse {genre.name} →
                    </div>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}

