import { useProductContext } from "@/context/ProductContext";
import { Typography, Slider } from "@mui/material";
import * as React from "react";

export interface IAppProps {}

function calculateValue(value: number) {
  return value;
}

export default function PriceFilter(props: IAppProps) {
  const [value, setValue] = React.useState<number>(0);
  const { minMaxPrice, handleCurrentFilterPriceChange } = useProductContext();

  const handleChange = (event: Event, newValue: number | number[]) => {
    // console.log("handleChange");
    if (typeof newValue === "number") {
      setValue(newValue);
      handleCurrentFilterPriceChange(newValue);
    }
  };

  function valueLabelFormat(value: number) {
    return `${minMaxPrice[0]}$ - ${value}$ - ${minMaxPrice[1]}$`;
  }
  return (
    <div className="flex justify-center flex-col-reverse items-center">
      <Typography
        id="non-linear-slider"
        gutterBottom
        className="whitespace-nowrap flex flex-row justify-center items-center gap-2 pt-3"
      >
        <input
          type="number"
          className="w-1/3 h-1/2 p-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-200 focus:border-transparent"
          placeholder="Price"
          value={value}
          onChange={(e) => {
            handleChange(e, Number(e.target.value));
          }}
        />
        - {minMaxPrice[1]}$
      </Typography>
      <Slider
        value={value}
        min={minMaxPrice[0]}
        step={10}
        max={minMaxPrice[1]}
        scale={calculateValue}
        getAriaValueText={valueLabelFormat}
        valueLabelFormat={valueLabelFormat}
        onChange={handleChange}
        valueLabelDisplay="auto"
        aria-labelledby="non-linear-slider"
        className="w-3/4 "
      />
    </div>
  );
}
