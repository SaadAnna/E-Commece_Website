import Link from "next/link"; 
import React from "react";

export const Navbar = () => {
  return (
    <nav>
      <div>
        <Link href="/">My ecommerce website</Link>
      </div>
    </nav>
  );
};

export default Navbar;
