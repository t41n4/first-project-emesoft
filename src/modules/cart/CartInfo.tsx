import { useCart } from "@/context";
import { sumPrice, formatNumber } from "@/utils";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import { useState } from "react";

const CartInfo = () => {
  const { carts } = useCart();
  const [disableBtn, setDisableBtn] = useState(true);

  const totalPriceCart = sumPrice(carts);
  return (
    <Box className="w-80 ml-4">
      <Card sx={{ minWidth: 275 }}>
        <CardContent className="pb-2">
          <Typography variant="h5">
            Total: {formatNumber(totalPriceCart)}
          </Typography>

          <Typography variant="h6">Free shipping</Typography>
        </CardContent>
        <CardActions className="flex flex-col">
          <FormGroup className="items-start">
            <FormControlLabel
              control={
                <Checkbox onChange={(event) => setDisableBtn(!disableBtn)} />
              }
              label="Agree with the above information"
            />
          </FormGroup>
          <Button
            size="small"
            className="bg-blue-500"
            disabled={disableBtn ? true : false}
            variant="contained"
          >
            Pay
          </Button>
        </CardActions>
      </Card>
    </Box>
  );
};
export default CartInfo;
