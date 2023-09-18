import { Grid, CardMedia, Typography, Button, Skeleton } from "@mui/material";
const SkeletonCart = () => {
  return (
    <Grid container sx={{ borderBottom: "1px solid #000" }}>
      <Grid item xs={2} sx={{ padding: "16px" }}>
        <Skeleton variant="rectangular" width="100%">
          <div style={{ paddingTop: "57%" }} />
        </Skeleton>
      </Grid>
      <Grid item xs={7} sx={{ padding: "16px" }}>
        <Skeleton width="100%">
          <Typography>.</Typography>
        </Skeleton>
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
          <Skeleton>
            <Button sx={{ background: "#000" }}>Delete</Button>
          </Skeleton>
        </Grid>
        <Grid item>
          <Skeleton>
            <Typography variant="h5">Price</Typography>
          </Skeleton>
        </Grid>
      </Grid>
      <Grid item xs={1} sx={{ display: "flex", justifyContent: "end" }}>
        <Skeleton></Skeleton>
      </Grid>
    </Grid>
  );
};
export default SkeletonCart;
