import { EbookCard } from "@/components/ebbokCard";
import { Button, Input } from "@heroui/react";
import { Search } from "lucide-react";
const EbookPage = async ({ searchParams }) => {
  const SERVER_URL = process.env.NEXT_PUBLIC_SERVER_URL;
  const searchQuery = await searchParams;
  const searchText = searchQuery.search || "";

  const res = await fetch(`${SERVER_URL}/search/ebook?search=${searchText}`, {
    method: "GET",
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch ebooks");
  }

  const products = await res.json();

  return (
    <main className="mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      {/* Page Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl dark:text-white">
          Explore Ebooks
        </h1>
        {/* search section */}
        <div className="mb-5 flex justify-center">
          <form className="flex gap-2 items-center" action={`/ebooks`}>
            <Input placeholder="Search Ebook" name="search" />
            <Button type="submit">Search</Button>
          </form>
        </div>
      </div>

      {/* Responsive Ebook Grid */}
      <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-3 lg:gap-6">
        {products.map((product) => (
          <EbookCard key={product._id} product={product} />
        ))}
      </div>
    </main>
  );
};

export default EbookPage;
