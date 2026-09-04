import { AdminProducts } from "@/components/Dashbord/admin/AdminProducts";

const bookmarkpage = async() => {
    const SERVER_URL = process.env.NEXT_PUBLIC_SERVER_URL;

  const res = await fetch(`${SERVER_URL}/admin/ebook`, {
    method: "GET",
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch ebooks");
  }

  const products = await res.json();
  return (
    <div>
      <h1 className="font-bold text-3xl text-center m-5">Book Mark Ebook</h1>
      <AdminProducts products={products}/>
    </div>
  );
};

export default bookmarkpage;
