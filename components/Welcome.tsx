"use client";

import { welcomeData } from "@/constant";

const Welcome = () => {
  return (
    <div className="w-full flex justify-center items-center flex-col">
      <picture>
        <img src={welcomeData[0].image} alt="" />
      </picture>

      <div className="grid grid-cols-3 grid-rows-1 gap-4 text-center pb-1">
        {welcomeData.map((item) =>
          item.role === "small-image" ? <img src={item.image} alt="" /> : <></>
        )}
      </div>
    </div>
  );
};

export default Welcome;