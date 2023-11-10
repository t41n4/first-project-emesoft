import { TableProduct } from "@/modules";
import { Grid, Stack, Typography } from "@mui/material";

const ProductPage = () => {
  return (
    <Grid container className="p-4" spacing={2}>
      <Grid item className="header " xs={12}>
        <Typography variant="h5">List Product</Typography>
      </Grid>
      <Grid item className="content" xs={12}>
        <TableProduct />
      </Grid>
    </Grid>
  );
};

export default ProductPage;
