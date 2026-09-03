
import { EbookDetailsCard } from "@/components/EbookDetailsCard";
const SingleCardDetailPage = async ({ params }) => {
  const { id } = await params;
  const SERVER_URL = process.env.NEXT_PUBLIC_SERVER_URL;
  const res = await fetch(`${SERVER_URL}/ebook/${id}`, {
    cache: "no-store",
  });
  if (!res.ok) {
    throw new Error("Failed to fetch ebook");
  }
  const product = await res.json();
  return <EbookDetailsCard product={product} />;
};
export default SingleCardDetailPage;

