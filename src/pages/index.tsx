import Image from "next/image";
import { Inter } from "next/font/google";
import { welcomeData } from "@/constant";
import { Typography } from "@mui/material";
import { scaleAnimation } from "@/components/shop/ProductItem";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <div className="w-full flex justify-center items-center flex-col p-5">
      <div className="flex flex-row ">
        <Typography
          variant="h3"
          className="text-center w-[20vw] p-5 justify-center items-center"
        >
          Lorem ipsum dolor sit amet consectetur adipisicing elit.
        </Typography>

        <picture className={`border border-black ${scaleAnimation}`}>
          <img className="w-full h-full" src={welcomeData[0].image} alt="" />
        </picture>

        <Typography
          variant="h3"
          className="text-center w-[20vw] p-5 justify-center items-center"
        >
          Lorem ipsum dolor sit amet consectetur adipisicing elit.
        </Typography>
      </div>

      <div className="grid grid-cols-3 grid-rows-1 gap-3 pt-5 ">
        {welcomeData.slice(1).map((item) => (
          <div className={`relative h-[70vh] w-[30vw] ${scaleAnimation}`}>
            <span className="absolute h-full w-full flex flex-col justify-center items-center z-[100]">
              <Typography variant="h4"> {item.title}</Typography>
            </span>
            <img
              key={item.id}
              className="object-contain h-full w-full border border-black bg-white opacity-60"
              src={item.image}
              alt=""
            />
          </div>
        ))}
      </div>
    </div>
  );
}
