import { Products } from "@/components/Dashbord/Products/Products";
import { AddProductModal } from "@/components/Dashbord/seller/AddProductModal";

const productspage = async ({ searchParams }) => {
  const SERVER_URL = process.env.NEXT_PUBLIC_SERVER_URL;
  const { page = "1", limit = "10" } = await searchParams;

  const res = await fetch(
    `${SERVER_URL}/pagination/products?page=${page}&limit=${limit}`,
    {
      method: "GET",
      cache: "no-store",
    },
  );
  const products = await res.json();

  return (
    <div>
      <div className="flex justify-end font-bold text-4xl text-blue-300 m-5">
        <AddProductModal />
      </div>
      <main >
        <Products products={products} />
      </main>
    </div>
  );
};

export default productspage;
