"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { FaBars, FaTimes, FaSearch, FaShoppingCart, FaUser } from "react-icons/fa";
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";
import { assets } from "@/Assets/assets";
import { useRouter } from "next/navigation";
import CategoryPopover from "../pop/CategoryPopover";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState("");
  const router = useRouter();

  const handleSearch = (e) => {
    e.preventDefault();
    if (search.trim()) {
      router.push(`/search?query=${encodeURIComponent(search.trim())}`);
    }
  };

  return (
    <header
    className="bg-white shadow-md fixed w-full top-0 left-0 z-50"
    >
      {/* Top bar */}
      <div className="hidden md:flex justify-end bg-gray-900 text-white px-4 py-2 text-sm space-x-6 pr-8">
        <Link href="/wishlist" className="hover:text-amber-400">Wishlist ❤️</Link>
        <Link href="/profile" className="hover:text-amber-400 flex items-center gap-1">
          <FaUser size={14} />
          My Account
        </Link>
        <Link href="/contact" className="hover:text-amber-400">Contact Us 📞</Link>
        <Link href="/cart" className="hover:text-amber-400 flex items-center gap-1">
          <FaShoppingCart size={14} />
          Cart
        </Link>
      </div>
      <div className="container mx-auto flex justify-between items-center py-4 px-6">
        <Link href="/">
          <Image
            src={assets.logo}
            alt="EduTome Logo"
            width={120}
            height={40}
            className="cursor-pointer w-[50px] rounded-full"
          />
        </Link>
        <nav className="hidden md:flex space-x-6 text-gray-700">
          <Link href="/" className="hover:text-amber-500">Home</Link>
          <Link href="/all-books" className="hover:text-amber-500">Books</Link>
    <CategoryPopover />
          <Link href="/about" className="hover:text-amber-500">About</Link>
        <Link href="/e-book" className="hover:text-amber-500">e-book</Link>
        </nav>
        <div className="hidden md:flex items-center space-x-4">
          {/* Search Bar */}
          <form onSubmit={handleSearch} className="flex items-center border border-green-200 rounded-md overflow-hidden">
            <input
              type="text"
              placeholder="Search Here"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="px-3 py-1.5 text-sm outline-none"
            />
            <button type="submit" className="bg-green-200 px-2">
              <FaSearch />
            </button>
          </form>

          {/* Auth Buttons */}
          <SignedOut>
            <SignInButton>
              <span className="cursor-pointer text-black hover:text-amber-500">
             Login
              </span>
            </SignInButton>
          </SignedOut>

          <SignedIn>
            <UserButton />
          </SignedIn>
        </div>

    
        <button className="md:hidden text-gray-700" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
        </button>
      </div>

      {isOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-white text-black shadow-md py-4">
          <nav className="flex flex-col space-y-4 px-6">
            <Link href="/" onClick={() => setIsOpen(false)}>Home</Link>
            <Link href="/all-books" onClick={() => setIsOpen(false)}>Books</Link>
            <Link href="/categories" onClick={() => setIsOpen(false)}>Categories</Link>
            <Link href="/about" onClick={() => setIsOpen(false)}>About</Link>
            <Link href="/e-book" onClick={() => setIsOpen(false)}>e-book</Link>

            <form onSubmit={handleSearch} className="flex items-center border border-green-200 rounded-md overflow-hidden mt-2">
              <input
                type="text"
                placeholder="Search Here"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="px-3 py-1.5 text-sm w-full outline-none"
              />
              <button type="submit" className="bg-green-200 px-2">
                <FaSearch />
              </button>
            </form>


            <SignedOut>
              <SignInButton>
                <span className="cursor-pointer text-black hover:text-amber-500">
               Login
                </span>
              </SignInButton>
            </SignedOut>

            <SignedIn>
              <div className="mt-2">
                <UserButton />
              </div>
            </SignedIn>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
