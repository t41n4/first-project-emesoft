"use client";

import { navLinks } from "@/constant";
import { useProductContext } from "@/context/ProductContext";
import SearchIcon from "@mui/icons-material/Search";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

function Header() {
  const pathname = usePathname();
  // console.log("pathname: ", pathname);
  const { handleSearchTermChange } = useProductContext();

  return (
    <header className="fixed top-0 left-0 w-[100vw] flex flex-row justify-between items-center h-[3.5rem] border-b border-black px-4 bg-[#e4e6e7] z-50">
      <div className="logo">
        <Image
          src="https://www.emesoft.net/wp-content/uploads/2023/06/EMESOFT-Logo-Full-Horizontal-.png"
          className="w-72 w-50"
          title="EMESOFT-Logo-Full-Horizontal"
          alt="EMESOFT-Logo-Full-Horizontal"
          loading="lazy"
          width={200}
          height={50}
        />
      </div>
      <div className="page_title uppercase font-sans-semibold">
        {pathname?.slice(1) === "" ? "Home" : pathname?.slice(1)}
      </div>

      {(pathname?.slice(1) === "shop" || pathname?.slice(1) === "cart") && (
        <div className="search_bar">
          <div className="relative rounded bg-opacity-15 hover:bg-opacity-25 mr-2 ml-0 w-full sm:ml-3  ">
            <div className="p-2 h-full absolute flex items-center justify-center">
              <SearchIcon />
            </div>
            <input
              className="text-current py-1 px-10 md:w-[20vw] w-full transition-all "
              placeholder="Search…"
              aria-label="search"
              onChange={(e) => {
                // setSearchTerm(e.target.value);
                handleSearchTermChange(e);
              }}
            />
          </div>
        </div>
      )}

      <div className="navigate_bar flex flex-row h-full border-x-black border">
        {navLinks.map((link) => {
          const isActive = pathname === link.route;
          // console.log("pathname: ", pathname);

          return (
            <Link
              href={link.route}
              key={link.id}
              className={`uppercase h-full flex items-center p-3 hover:bg-gray-800 hover:text-white ${
                isActive && "bg-black text-white "
              }`}
            >
              {link.title}
            </Link>
          );
        })}
      </div>
    </header>
  );
}

export default Header;