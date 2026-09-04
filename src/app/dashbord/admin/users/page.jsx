import { UserTabledata } from "@/components/Dashbord/admin/UserTabledata";

const userspage = async() => {
      const SERVER_URL = process.env.NEXT_PUBLIC_SERVER_URL;

  const res = await fetch(`${SERVER_URL}/admin/user`, {
    method: "GET",
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch ebooks");
  }

  const products = await res.json();
  console.log(products)
    return (
        <div>
            <h1 className="font-bold text-3xl text-center"> Manage Users By Admin</h1>
            <UserTabledata  products={products}/>
        </div>
    );
};

export default userspage;