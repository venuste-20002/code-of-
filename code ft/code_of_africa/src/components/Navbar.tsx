"use client";

import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="flex flex-1 justify-around p-4 bg-gray-800 text-white">
      <Link href="/account" className="hover:underline">Account</Link>
      <Link href="/budget" className="hover:underline">Budget</Link>
      <Link href="/category" className="hover:underline">Category</Link>
      <Link href="/transaction" className="hover:underline">Transaction</Link>
    </nav>
  );
}
