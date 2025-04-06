import Link from "next/link";
import React from "react";

export const Navbar = () => {
  return (
    <nav className="sticky z-50 bg-white shadow mx-auto">
      <div className="container mx-auto flex items-center justify-between px-4 py-20 ng-red-500">
        <Link href="/" className="text-white hover:text-blue-600">
          Hello
        </Link>

        <div className="hidden md:flex space-x-6">
          <Link href="/">Home</Link>
          <Link href="/products" className="hover:text-blue-600">
            Products
          </Link>
          <Link href="/checkout" className="hover:text-blue-600">
            CheckOut
          </Link>
        </div>
        <div className="flex items-center space-x-4"></div>
      </div>
    </nav>
  );
};

export default Navbar;
