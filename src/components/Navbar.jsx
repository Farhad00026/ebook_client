"use client";

import { authClient } from "@/lib/auth-client";
import { Avatar, Button, Dropdown, Label } from "@heroui/react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useState } from "react";
import { BiLogOut } from "react-icons/bi";
import { CgProfile } from "react-icons/cg";
import { MdDashboard } from "react-icons/md";

const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "Browse Ebooks", href: "/ebooks" },
  { label: "Dashboard", href: "/dashbord" },
];

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();

  const { data: session } = authClient.useSession();
  const user = session?.user;
 if (pathname.includes("dashbord")) {
    return null;
  }
  const handleSignOut = async () => {
    await authClient.signOut();
    setIsMenuOpen(false);
  };

  // Exact match for "/", startsWith for nested routes (e.g. /ebooks/123)
  const isActive = (href) =>
    href === "/" ? pathname === "/" : pathname?.startsWith(href);

  return (
    <div>
      <nav className="sticky top-0 z-40 w-full border-b border-separator bg-background/70 backdrop-blur-lg">
        <header className="mx-auto flex h-16 max-w-7xl items-center justify-between px-2">
          <div className="flex items-center gap-4">
            <button
              className="md:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Toggle menu"
              aria-expanded={isMenuOpen}
            >
              <span className="sr-only">Menu</span>
              <svg
                className="h-6 w-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                {isMenuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>

            <Link href="/">
              <div className="flex items-center gap-3">
                <Image
                  height={40}
                  width={40}
                  className="h-10 w-auto"
                  src="https://static6.depositphotos.com/1148595/647/v/450/depositphotos_6474982-stock-illustration-stylized-ebook-icon.jpg"
                  alt="Fable logo"
                />
                <p className="font-bold">Ebook Sharing Platform</p>
              </div>
            </Link>
          </div>

          {/* Desktop nav links */}
          <ul className="hidden items-center gap-6 md:flex">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={
                    isActive(link.href)
                      ? "font-medium text-accent"
                      : "text-foreground/80 hover:text-accent"
                  }
                  aria-current={isActive(link.href) ? "page" : undefined}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>

          {/* Desktop auth area */}
          {!user && (
            <div className="hidden items-center gap-4 md:flex">
              <Link
                href="/signin"
                className={isActive("/signin") ? "font-medium text-accent" : ""}
              >
                Login
              </Link>
              <Link href="/signup">
                <Button>Sign Up</Button>
              </Link>
            </div>
          )}

          {user && (
            <div className="hidden items-center gap-4 md:flex">
              <Dropdown>
                <Dropdown.Trigger className="rounded-full">
                  <Avatar size="sm" aria-label="Menu">
                    <Avatar.Image
                      referrerPolicy="no-referrer"
                      alt={user?.name}
                      src={user?.image}
                    />
                    <Avatar.Fallback>
                      {user.name?.charAt(0)}
                    </Avatar.Fallback>
                  </Avatar>
                </Dropdown.Trigger>
                <Dropdown.Popover>
                  <div className="px-3 pt-3 pb-1">
                    <div className="flex items-center gap-2">
                      <Avatar size="sm">
                        <Avatar.Image alt={user?.name} src={user?.image} />
                        <Avatar.Fallback delayMs={600}>
                          {user.name?.charAt(0)}
                        </Avatar.Fallback>
                      </Avatar>
                      <div className="flex flex-col gap-0">
                        <p className="text-sm leading-5 font-medium">
                          {user?.name}
                        </p>
                        <p className="text-xs leading-none text-muted">
                          {user?.email}
                        </p>
                      </div>
                    </div>
                  </div>
                  <Dropdown.Menu>
                    <Dropdown.Item id="dashboard" textValue="Dashboard">
                      <Link href="/dashboard" className="flex items-center gap-2">
                        <MdDashboard />
                        <Label>Dashboard</Label>
                      </Link>
                    </Dropdown.Item>

                    <Dropdown.Item id="profile" textValue="Profile">
                      <Link href="/profile" className="flex items-center gap-2">
                        <CgProfile />
                        <Label>Profile</Label>
                      </Link>
                    </Dropdown.Item>

                    <Dropdown.Item
                      id="logout"
                      textValue="Logout"
                      variant="danger"
                      onClick={handleSignOut}
                    >
                      <BiLogOut />
                      <Label>Logout</Label>
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown.Popover>
              </Dropdown>
            </div>
          )}
        </header>

        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="border-t border-separator md:hidden">
            <ul className="flex flex-col gap-2 p-4">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    onClick={() => setIsMenuOpen(false)}
                    className={
                      isActive(link.href)
                        ? "block py-2 font-medium text-accent"
                        : "block py-2"
                    }
                    aria-current={isActive(link.href) ? "page" : undefined}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}

              {!user ? (
                <li className="mt-4 flex flex-col gap-2 border-t border-separator pt-4">
                  <Link
                    href="/signin"
                    onClick={() => setIsMenuOpen(false)}
                    className="block py-2"
                  >
                    Login
                  </Link>
                  <Link href="/signup" onClick={() => setIsMenuOpen(false)}>
                    <Button className="w-full">Sign Up</Button>
                  </Link>
                </li>
              ) : (
                <li className="mt-4 flex flex-col gap-2 border-t border-separator pt-4">
                  <Link
                    href="/profile"
                    onClick={() => setIsMenuOpen(false)}
                    className="flex items-center gap-2 py-2"
                  >
                    <CgProfile />
                    Profile
                  </Link>
                  <button
                    onClick={handleSignOut}
                    className="flex items-center gap-2 py-2 text-left text-danger"
                  >
                    <BiLogOut />
                    Logout
                  </button>
                </li>
              )}
            </ul>
          </div>
        )}
      </nav>
    </div>
  );
};

export default Navbar;