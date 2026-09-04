import { AdminProducts } from "@/components/Dashbord/admin/AdminProducts";

const manageebookpage = async () => {
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
      <h1 className="font-bold text-3xl text-center">Managee Ebook</h1>
      <AdminProducts products={products}/>
    </div>
  );
};

export default manageebookpage;
