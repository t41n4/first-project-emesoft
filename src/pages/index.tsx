import Image from "next/image";
import { Inter } from "next/font/google";
import { welcomeData } from "@/constant";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <div className="w-full flex justify-center items-center flex-col">
      <picture className="border border-black">
        <img src={welcomeData[0].image} alt="" />
      </picture>

      <div className="grid grid-cols-3 grid-rows-1 gap-4 text-center p-4">
        {welcomeData.slice(1).map((item) =>
          (
            <div key={item.id}>
              <img className="w-full h-full border" src={item.image} alt="" />
            </div>
          )
        )}
      </div>
    </div>
  );
}
