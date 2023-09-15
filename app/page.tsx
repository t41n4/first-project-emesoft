import { welcomeData } from "@/constant";

export default function Home() {
  return (
    <div className="w-full flex justify-center items-center flex-col">
      <picture className="border border-black">
        <img src={welcomeData[0].image} alt="" />
      </picture>

      <div className="grid grid-cols-3 grid-rows-1 gap-4 text-center p-4">
        {welcomeData.map((item) =>
          item.role === "small-image" ? (
            <div>
              <img className="w-full h-full border" src={item.image} alt="" />
            </div>
          ) : (
            <></>
          )
        )}
      </div>
    </div>
  );
}
