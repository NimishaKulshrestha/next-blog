'use client';

import Link from "next/link";
import { AiOutlineSearch } from "react-icons/ai";
import { FaMoon, FaSun } from "react-icons/fa";
import { usePathname } from "next/navigation";
import { useTheme } from "next-themes";
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import { dark, light } from "@clerk/themes";
import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

export default function Header() {
  const path = usePathname();
  const { theme, setTheme } = useTheme();
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState("");
  const searchParams = useSearchParams();

  const handleSubmit = (e) => {
    e.preventDefault();
    const urlParams = new URLSearchParams(searchParams);
    urlParams.set("searchTerm", searchTerm);
    const searchQuery = urlParams.toString();
    router.push(`/search?${searchQuery}`);
  };

  useEffect(() => {
    const urlParams = new URLSearchParams(searchParams);
    const searchTermFromUrl = urlParams.get("searchTerm");
    if (searchTermFromUrl) {
      setSearchTerm(searchTermFromUrl);
    }
  }, [searchParams]);

  return (
    <header className="border-b bg-background sticky top-0 z-50">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-4 py-3">
        
        {/* Logo */}
        <Link href="/" className="text-xl font-semibold">
          <span className="px-2 py-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-lg text-white">
            Nimisha&apos;s
          </span>{" "}
          Blog
        </Link>

        {/* Nav Links */}
        <nav className="hidden md:flex gap-6">
          <Link href="/" className={path === "/" ? "text-indigo-500 font-medium" : ""}>
            Home
          </Link>
          <Link href="/about" className={path === "/about" ? "text-indigo-500 font-medium" : ""}>
            About
          </Link>
          <Link href="/projects" className={path === "/projects" ? "text-indigo-500 font-medium" : ""}>
            Projects
          </Link>
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-3">
          {/* Search */}
          <form onSubmit={handleSubmit} className="hidden lg:block">
            <div className="relative">
              <input
                type="text"
                placeholder="Search..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-3 pr-10 py-1 rounded-md border border-gray-300 dark:border-gray-700 bg-background"
              />
              <AiOutlineSearch className="absolute right-2 top-1.5 text-gray-500" />
            </div>
          </form>

          {/* Theme Switch */}
          <button
            onClick={() => setTheme(theme === "light" ? "dark" : "light")}
            className="p-2 rounded-full border border-gray-300 dark:border-gray-700"
          >
            {theme === "light" ? <FaSun /> : <FaMoon />}
          </button>

          {/* Clerk Auth */}
          <SignedIn>
            <UserButton
              appearance={{
                baseTheme: theme === "light" ? light : dark,
              }}
              userProfileUrl="/dashboard?tab=profile"
            />
          </SignedIn>
          <SignedOut>
            <Link href="/sign-in">
              <button className="px-4 py-1 rounded-md border border-indigo-500 text-indigo-500 hover:bg-indigo-50">
                Sign In
              </button>
            </Link>
          </SignedOut>
        </div>
      </div>
    </header>
  );
}
