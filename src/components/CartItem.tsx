import { Box, Grid, CardMedia, Typography, Button } from "@mui/material";
import { QuantityInput } from "@/components";
const CartItem = () => {
  return (
    <Box>
      <Grid container sx={{ borderBottom: "1px solid #000" }}>
        <Grid item xs={2} sx={{ padding: "16px" }}>
          <CardMedia
            sx={{ height: "225px", width: "168px", objectFit: "contain" }}
            image="https://i.pinimg.com/564x/3d/cc/18/3dcc18d509fcced7d9b77c57f76480b3.jpg"
            title="green iguana"
          />
        </Grid>
        <Grid item xs={7} sx={{ padding: "16px" }}>
          <Typography variant="h5">Title</Typography>
        </Grid>
        <Grid
          item
          xs={2}
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            alignItems: "end",
            padding: "16px",
          }}
        >
          <Grid item>
            <Button sx={{ background: "#000" }}>Delete</Button>
          </Grid>
          <Grid item>
            <Typography variant="h5">200000 $</Typography>
          </Grid>
        </Grid>
        <Grid item xs={1} sx={{ display: "flex", justifyContent: "end" }}>
          <QuantityInput />
        </Grid>
      </Grid>
    </Box>
  );
};

export default CartItem;
