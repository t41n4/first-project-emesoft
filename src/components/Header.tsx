"use client";

import { navLinks } from "@/constant";
import { useProductContext } from "@/context/ProductContext";
import SearchIcon from "@mui/icons-material/Search";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AddProduct } from "@/modules";
function Header() {
  const pathname = usePathname();

  const { handleSearchTermChange } = useProductContext();

  return (
    <header className="flex flex-row fixed top-0 left-[2.5%] self-center w-[95vw] justify-between items-center h-[12vh] border border-black rounded-lg px-4 bg-[#f58439] z-50">
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

      {(pathname?.slice(1) === "shop" ||
        pathname?.slice(1) === "cart" ||
        pathname?.slice(1) === "product") && (
        <div className="search_bar flex items-center">
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

      <div className="navigate_bar flex flex-row h-full ">
        {pathname.slice(1) === "product" && (
          <div className="my-auto">
            <AddProduct />
          </div>
        )}
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
