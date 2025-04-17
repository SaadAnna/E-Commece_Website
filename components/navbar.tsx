"use client";
import Link from "next/link";
import {
  ShoppingCartIcon,
  Bars3Icon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { useCardStore } from "@/store/card-store";
export const Navbar = () => {
  const { items } = useCardStore();
  const cartCount = items.reduce((acc, item) => acc + item.quantity, 0);
  return (
    <header className="py-4 border-b border-black md:border-none sticky top-0 z-10 ">
      <div className="absolute inset-0 backdrop-blur -z-10 md:hidden"></div>
      <div className="container">
        <div className="flex justify-between items-center md:border  border-black md:p-2.5 rounded-xl max-w-2xl lg:max-w-3xl mx-auto relative">
          <div className="absolute inset-0 backdrop-blur -z-10 hidden md:block"></div>
          <div>
            <div className="border h-10 w-10 text-bold text-3xl rounded-lg inline-flex justify-center items-center border-black">
              T
            </div>
          </div>
          <div className="hidden md:block mx-auto" id="navabar">
            <nav className="flex gap-5 text-sm">
              <Link href="/" className="text-black text-base transition">
                Home
              </Link>
              <Link
                href="/products"
                className="text-black text-base transition"
              >
                Products
              </Link>
              <Link
                href="/chekcout"
                className="text-black text-base transition"
              >
                Checkout
              </Link>
            
            </nav>
           
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
