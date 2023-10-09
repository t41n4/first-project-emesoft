import {
  Badge,
  IconButton,
  Input,
  Navbar,
  Typography,
} from "@material-tailwind/react";
import React from "react";

import GiftCardMarketIcon from "@/assets/GiftCardMarketIcon";
import Link from "next/link";
import CartIcon from "@/assets/CartIcon";
import SmallConfetti from "@/assets/SmallConfetti";
import SearchIcon from "@/assets/SearchIcon";

type Props = {};

const authenNav = [
  {
    id: "signUp",
    title: "Sign Up",
    route: "/sign-up",
  },
  {
    id: "signIn",
    title: "Login",
    route: "/sign-in",
  },
];

const centerStyle = `Header_component absolute flex flex-row w-full h-full items-center justify-center `;

const ComponentShop = () => {
  return (
    <div className="_Shop h-full flex justify-center items-center">
      <GiftCardMarketIcon size={"5em"} />
    </div>
  );
};

const ComponentCart = () => {
  return (
    <div className="_Cart relative  h-full  flex justify-center items-end text whitespace-nowrap pb-5 invisible lg:visible pr-2">
      <Badge content="5" className="min-h-[12px] min-w-[12px] p-1 leading-[6.5px] ">
        <CartIcon size={"2em"} />
      </Badge>
      <Action />
    </div>
  );
};

const ComponentSearchBar = () => {
  return (
    <div className="relative h-full gap-2 flex justify-center items-center w-[80%] lg:w-[65%]">
      <Input
        type="search"
        label="SEARCH BUSINESS NAME, CITY OR ZIP"
        className="pr-20 rounded-none bg-white"
        labelProps={{
          className: "before:rounded-tl-none after:rounded-tr-none",
        }}
        containerProps={{
          className: "min-w-[288px] ",
        }}
        crossOrigin={undefined}
      />
      <span className="absolute top-[-0.5em] right-[-2em] invisible lg:visible">
        <SmallConfetti size={"3.5em"} />
      </span>
      <span className="absolute right-[-4em] visible lg:invisible cursor-pointer bg-[#D93365] hover:bg-[#d93365c2]">
        <SearchIcon size={"40px"} fill={"#ffffff"} />
      </span>
    </div>
  );
};

const Action = () => {
  return (
    <div className="absolute text-black font-sans-variable  top-[-10px] right-0 uppercase">
      <Link
        key={authenNav[0].id}
        href={authenNav[0].route}
        className="hover:text-white "
      >
        {authenNav[0].title}
      </Link>
      <span className="text-black"> / </span>
      <Link
        key={authenNav[1].id}
        href={authenNav[1].route}
        className=" hover:text-white "
      >
        {authenNav[1].title}
      </Link>
    </div>
  );
};

const HeaderMT = (props: Props) => {
  const [openNav, setOpenNav] = React.useState(false);

  React.useEffect(() => {
    window.addEventListener(
      "resize",
      () => window.innerWidth >= 960 && setOpenNav(false)
    );
  }, []);

  return (
    <div className={centerStyle}>
      <Navbar
        className={`NavBar bg-[#FBE74E] rounded-none border-none flex flex-row justify-between h-[7em] `}
      >
        <ComponentShop />
        <ComponentSearchBar />
        <ComponentCart />
      </Navbar>
    </div>
  );
};

export default HeaderMT;
