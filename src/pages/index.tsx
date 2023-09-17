import Image from "next/image";
import { Inter } from "next/font/google";
import { welcomeData } from "@/constant";
import { Typography } from "@mui/material";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <div className="w-full flex justify-center items-center flex-col p-5">
      <div className="flex flex-row ">
        <Typography variant="h3" className="text-center w-[20vw] p-5 justify-center items-center">
          Lorem ipsum dolor sit amet consectetur adipisicing elit.
        </Typography>

        <picture className="border border-black">
          <img className="w-full h-full" src={welcomeData[0].image} alt="" />
        </picture>

        <Typography variant="h3" className="text-center w-[20vw] p-5 justify-center items-center">
          Lorem ipsum dolor sit amet consectetur adipisicing elit.
        </Typography>
      </div>

      <div className="grid grid-cols-3 grid-rows-1 gap-4 text-center p-4">
        {welcomeData.slice(1).map((item) => (
          <div key={item.id}>
            <img className="w-full h-full border" src={item.image} alt="" />
          </div>
        ))}
      </div>
    </div>
  );
}
