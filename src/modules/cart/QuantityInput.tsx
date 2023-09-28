import { IInputQuantity } from "@/common/types";
import { StyledButton, StyledInput } from "@/constant";
import { StyledInputRoot } from "@/constant/styleQuantityInput";
import { useCart } from "@/context";
import {
  Unstable_NumberInput as NumberInput,
  NumberInputProps,
} from "@mui/base/Unstable_NumberInput";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import * as React from "react";
const CustomNumberInput = React.forwardRef(function CustomNumberInput(
  props: NumberInputProps & IInputQuantity,
  ref: React.ForwardedRef<HTMLDivElement>
) {
  const { updateQuantityCart, setQuantity } = useCart();
  return (
    <NumberInput
      slots={{
        root: StyledInputRoot,
        input: StyledInput,
        incrementButton: StyledButton,
        decrementButton: StyledButton,
      }}
      slotProps={{
        incrementButton: {
          children: <AddIcon />,
          className: "increment",
        },
        decrementButton: {
          children: <RemoveIcon />,
        },
      }}
      {...props}
      ref={ref}
      onChange={(events, value) => {
        updateQuantityCart(value, props.id);
        setQuantity(value);
      }}
    />
  );
});

export default function QuantityInput(props: IInputQuantity) {
  return (
    <CustomNumberInput
      aria-label="Quantity Input"
      min={1}
      max={99}
      value={props.value}
      id={props.id}
    />
  );
}
