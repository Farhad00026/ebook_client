"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Layoutdashbord,
  Package,
  ShoppingCart,
  Users,
  X,
  Menu,
  LayoutDashboard,
} from "lucide-react";

import DSNavbar from "@/components/Dashbord/DSNavbar";
import { authClient } from "@/lib/auth-client";

const navit = {
  user: [
    {
      title: "Purchase History",
      href: "/dashbord/seller/overview",
      icon: LayoutDashboard,
    },
    { title: "Purchased Ebooks", href: "/dashbord/seller/products", icon: Package },
    { title: "Profile Management", href: "/dashbord/seller/orders", icon: Users },
    { title: "Bookmark Page", href: "/dashbord/seller/customers", icon: ShoppingCart },
  ],
  writer: [
    { title: "Manage Ebooks", href: "/dashbord/buyer", icon: LayoutDashboard },
    { title: "Add Ebook", href: "/dashbord/buyer/products", icon: Package },
    { title: "Edit Ebook", href: "/dashbord/buyer/orders", icon:Users },
    { title: "Sales History", href: "/dashbord/buyer/customers", icon:ShoppingCart},
  ],
  admin: [
    { title: "Manage Users", href: "/dashbord/admin", icon: LayoutDashboard },
    { title: "Manage All Ebooks", href: "/dashbord/admin/products", icon: Package },
    { title: "View All Transactions", href: "/dashbord/admin/orders", icon: ShoppingCart },
    { title: "Dashboard", href: "/dashbord/admin/customers", icon: Users },
  ],
};

function SidebarMenu({ onNavigate }) {
  const pathname = usePathname();
  const { data: session, isPending } = authClient.useSession();
  const role = session?.user?.role;

  const items = navit[role] ?? [];

  if (isPending) {
    return (
      <div className="flex flex-col gap-2 p-3">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="h-9 animate-pulse rounded-lg bg-gray-100" />
        ))}
      </div>
    );
  }

  if (!role) {
    return <div className="p-3 text-sm text-gray-500">No menu available.</div>;
  }

  return (
    <nav className="flex flex-col gap-1 p-3">
      {items.map(({ title, href, icon: Icon }) => {
        const isActive = pathname === href;
        return (
          <Link
            key={href}
            href={href}
            onClick={onNavigate}
            className={`flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
              isActive
                ? "bg-gray-900 text-white"
                : "text-gray-700 hover:bg-gray-100"
            }`}
          >
            <Icon size={18} />
            {title}
          </Link>
        );
      })}
    </nav>
  );
}

export default function RootLayout({ children }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen w-full overflow-hidden">
      {/* Sidebar - Desktop */}
      <aside className="hidden w-[260px] shrink-0 flex-col border-r-2 border-gray-300 md:flex">
        <div className="p-5">
          <h2 className="text-xl font-bold">
            <Link href="/">Ebook</Link>
          </h2>
        </div>
        <div className="flex-1 overflow-y-auto">
          <SidebarMenu />
        </div>
      </aside>

      {/* Sidebar - Mobile Drawer */}
      <div
        className={`fixed inset-0 z-40 md:hidden ${
          isSidebarOpen ? "pointer-events-auto" : "pointer-events-none"
        }`}
      >
        {/* Overlay */}
        <div
          onClick={() => setIsSidebarOpen(false)}
          className={`absolute inset-0 bg-black transition-opacity duration-300 ${
            isSidebarOpen ? "opacity-50" : "opacity-0"
          }`}
        />

        {/* Drawer panel */}
        <aside
          className={`absolute left-0 top-0 flex h-full w-[260px] flex-col border-r-2 border-gray-300 bg-white transition-transform duration-300 ${
            isSidebarOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <div className="flex items-center justify-between p-5">
            <h2 className="text-xl font-bold">Ebook</h2>
            <button
              onClick={() => setIsSidebarOpen(false)}
              aria-label="Close sidebar"
            >
              <X size={22} />
            </button>
          </div>
          <div className="flex-1 overflow-y-auto">
            <SidebarMenu onNavigate={() => setIsSidebarOpen(false)} />
          </div>
        </aside>
      </div>

      {/* Main Content */}
      <main className="flex min-w-0 flex-1 flex-col">
        <nav className="flex h-14 shrink-0 items-center gap-3 border-b-2 border-gray-300 px-5">
          <button
            onClick={() => setIsSidebarOpen(true)}
            aria-label="Open sidebar"
            className="md:hidden"
          >
            <Menu size={22} />
          </button>
          <h1 className="text-lg font-semibold">Navbar</h1>
        </nav>
        <section className="flex-1 overflow-y-auto p-5">{children}</section>
      </main>
    </div>
  );
}

