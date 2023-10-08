"use client";

import { navLinks } from "@/constant";
import { useCartContext } from "@/context";
import { useProductContext } from "@/context/ProductContext";
import { AddProduct, SearchProduct } from "@/modules";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import SearchBar from "./SearchBar";
import { useUserContext } from "@/context/UserContext";
function Header() {
  const pathname = usePathname();
  const { handleSearchTermChange: handleProductSearchTermChange } =
    useProductContext();
  const { handleSearchTermChange: handleCartSearchTermChange } =
    useCartContext();
  const { handleSearchTermChange: handleUsersSearchTermChange } =
    useUserContext();

  const currentContext = () => {
    const currentPath = pathname.slice(1).toLowerCase();
    // console.log("currentPath: ", currentPath);
    switch (currentPath) {
      case "shop":
        return handleProductSearchTermChange;
      case "cart":
        return handleCartSearchTermChange;
      case "users":
        return handleUsersSearchTermChange;
      default:
        return undefined;
    }
  };

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

      <div className="search_bar flex items-center">
        <SearchBar handleSearchTermChange={currentContext()} />
      </div>
      {pathname.slice(1) === "product" && <SearchProduct />}

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
