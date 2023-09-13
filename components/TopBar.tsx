"use client";

import { navLinks } from "@/constant";
import Link from "next/link";
import { usePathname } from "next/navigation";

function TopBar() {
  const pathname = usePathname();
  return (
    <header className="fixed top-0 left-0 w-[100vw] flex flex-row justify-between items-center h-[3.2rem] border-b border-black px-4">
      <div className="logo">
        <img
          className="w-72 w-50"
          src="https://www.emesoft.net/wp-content/uploads/2023/06/EMESOFT-Logo-Full-Horizontal-.png"
          title="EMESOFT-Logo-Full-Horizontal"
          alt="EMESOFT-Logo-Full-Horizontal"
          loading="lazy"
        />
      </div>

      <div className="TopBar Site_Title uppercase">home page</div>

      <div className="TopBar Site_Navigation flex flex-row gap-2 h-full">
        {navLinks.map((link) => {
          const isActive = pathname === link.route;
          return (
            <Link
              href={link.route}
              key={link.id}
              className={`uppercase h-full flex items-center p-3 ${isActive && "bg-black text-white"}`}
            >
              {link.title}
            </Link>
          );
        })}
      </div>
    </header>
  );
}

export default TopBar;
