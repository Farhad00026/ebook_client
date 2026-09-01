"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Mail, Phone, MapPin, Send, CheckCircle2 } from "lucide-react";
import { FaFacebook } from "react-icons/fa";
import { BsInstagram, BsTwitter } from "react-icons/bs";
import { LiaLinkedin } from "react-icons/lia";

export default function Footer() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleNewsletterSubmit = (e) => {
    e.preventDefault();
    if (!email) return;

    // Frontend-only placeholder — wire this to your Express API
    // e.g. POST /api/newsletter/subscribe { email }
    console.log("Newsletter signup:", email);

    setSubscribed(true);
    setEmail("");
    setTimeout(() => setSubscribed(false), 4000);
  };

  return (
    <footer className="mt-16 border-t bg-background">
      <div className="container mx-auto px-4">
        <div className="grid gap-10 py-12 md:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div>
            <Link href="/" className="inline-block">
              <Image
                src="/logo-xl.png"
                alt="Fable logo"
                width={180}
                height={50}
                className="h-12 w-auto"
              />
            </Link>

            <p className="mt-4 text-sm text-muted-foreground">
              Fable connects readers and collectors with talented writers.
              Discover, read, and collect original ebooks — all in one
              place.
            </p>

            <div className="mt-5 flex items-center gap-3">
              <Link
                href="#"
                aria-label="Facebook"
                className="rounded-full border p-2 transition hover:bg-muted"
              >
                <FaFacebook className="h-4 w-4" />
              </Link>
              <Link
                href="#"
                aria-label="Instagram"
                className="rounded-full border p-2 transition hover:bg-muted"
              >
                <BsInstagram className="h-4 w-4" />
              </Link>
              <Link
                href="#"
                aria-label="Twitter"
                className="rounded-full border p-2 transition hover:bg-muted"
              >
                <BsTwitter className="h-4 w-4" />
              </Link>
              <Link
                href="#"
                aria-label="LinkedIn"
                className="rounded-full border p-2 transition hover:bg-muted"
              >
                <LiaLinkedin className="h-4 w-4" />
              </Link>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider">
              Quick Links
            </h3>

            <ul className="space-y-3 text-sm text-muted-foreground">
              <li>
                <Link href="/about" className="hover:text-foreground">
                  About
                </Link>
              </li>
              <li>
                <Link href="/ebooks" className="hover:text-foreground">
                  Browse Ebooks
                </Link>
              </li>
              <li>
                <Link href="/writer/verify" className="hover:text-foreground">
                  Become a Writer
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-foreground">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Support / Legal */}
          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider">
              Support
            </h3>

            <ul className="space-y-3 text-sm text-muted-foreground">
              <li>
                <Link href="/faq" className="hover:text-foreground">
                  FAQ
                </Link>
              </li>
              <li>
                <Link href="/privacy-policy" className="hover:text-foreground">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="hover:text-foreground">
                  Terms & Conditions
                </Link>
              </li>
              <li>
                <Link href="/writer/guidelines" className="hover:text-foreground">
                  Writer Guidelines
                </Link>
              </li>
            </ul>
          </div>

          {/* Newsletter + Contact */}
          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider">
              Stay Updated
            </h3>

            <p className="mb-3 text-sm text-muted-foreground">
              Get new releases and writer spotlights in your inbox.
            </p>

            <form onSubmit={handleNewsletterSubmit} className="flex gap-2">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Your email"
                required
                className="w-full min-w-0 rounded-md border bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-accent"
              />
              <button
                type="submit"
                aria-label="Subscribe"
                className="flex shrink-0 items-center justify-center rounded-md bg-accent px-3 py-2 text-white transition hover:opacity-90"
              >
                <Send className="h-4 w-4" />
              </button>
            </form>

            {subscribed && (
              <p className="mt-2 flex items-center gap-1 text-xs text-green-600">
                <CheckCircle2 className="h-3.5 w-3.5" />
                Subscribed! Check your inbox.
              </p>
            )}

            <div className="mt-5 space-y-3 text-sm text-muted-foreground">
              <div className="flex gap-3">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0" />
                <span>Dhaka, Bangladesh</span>
              </div>

              <div className="flex gap-3">
                <Phone className="h-4 w-4 shrink-0" />
                <span>+880 1234-567890</span>
              </div>

              <div className="flex gap-3">
                <Mail className="h-4 w-4 shrink-0" />
                <span>support@fable.com</span>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col items-center justify-between gap-3 border-t py-6 text-center text-sm text-muted-foreground md:flex-row">
          <p>© {new Date().getFullYear()} Fable. All rights reserved.</p>

          <div className="flex items-center gap-4">
            <Link href="/privacy-policy" className="hover:text-foreground">
              Privacy
            </Link>
            <Link href="/terms" className="hover:text-foreground">
              Terms
            </Link>
            <Link href="/cookies" className="hover:text-foreground">
              Cookies
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}