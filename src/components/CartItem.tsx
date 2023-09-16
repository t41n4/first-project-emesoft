"use client";

import { Box, Grid, Button, TextField } from "@mui/material";
import { useState } from "react";
import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";

const CartItem = () => {
  const [quantity, setQuantity] = useState(1);

  const handleDecQuantity = () => {
    if (quantity > 1) {
      setQuantity((prevState: number) => prevState - 1);
    }
  };
  const handleIncreQuantity = () => {
    setQuantity((prevState: number) => prevState + 1);
  };

  return (
    <Box sx={{ flexGrow: 1, borderBottom: "1px solid #000" }}>
      <Grid container>
        <Grid xs={3} sx={{ textAlign: "center", padding: "16px" }}>
          <img
            src="https://salt.tikicdn.com/cache/368x368/ts/product/09/3b/73/873b5e1f6e55c774b90062ad94e07940.png.webp"
            alt=""
            style={{ width: "215px", height: "168px" }}
          />
        </Grid>
        <Grid
          xs={6}
          style={{ padding: "16px", fontSize: "20px", fontWeight: "600" }}
        >
          Product Name
        </Grid>
        <Grid xs={2} container>
          <Grid xs={12} sx={{ textAlign: "end" }}>
            <Button
              variant="text"
              sx={{
                fontSize: "18px",
                fontWeight: "300",
                padding: "16px",
                color: "#000",
              }}
            >
              Xóa
            </Button>
          </Grid>
          <Grid
            xs={12}
            sx={{
              display: "flex",
              flexDirection: "column-reverse",
              textAlign: "end",
              padding: "16px",
            }}
          >
            <span style={{ fontSize: "27px" }}>20000 VND</span>
          </Grid>
        </Grid>
        <Grid
          xs={1}
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "end",
            width: "50px",
          }}
        >
          <Button
            variant="outlined"
            sx={{
              borderRadius: "0",
              width: "50px",
              border: "1px solid #000",
              color: "#000",
            }}
            onClick={() => handleDecQuantity()}
          >
            <RemoveIcon />
          </Button>
          <TextField
            id="outlined-number"
            type="number"
            sx={{
              borderRadius: "0",
              width: "64px",
              border: "1px solid #000",
              flex: "1",
              margin: "auto 0px   ",
            }}
            InputLabelProps={{
              shrink: true,
              sx: {},
            }}
            inputProps={{
              min: 1,
            }}
            value={quantity}
            defaultValue={1}
            onChange={(e: any) => {
              setQuantity(e.target.value);
            }}
          />
          <Button
            variant="outlined"
            sx={{
              borderRadius: "0",
              width: "50px",
              border: "1px solid #000",
              color: "#000",
            }}
            onClick={() => handleIncreQuantity()}
          >
            <AddIcon />
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
};

export default CartItem;
