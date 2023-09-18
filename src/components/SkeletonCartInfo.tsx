import { Grid, Typography, Button, Checkbox, Skeleton } from "@mui/material";

const SkeletonCartInfo = () => {
  return (
    <Grid
      item
      sx={{
        padding: "16px",
        width: "100%",
      }}
      xs={3}
    >
      <Grid item xs={12} sx={{ display: "flex", alignItems: "center" }}>
        <Skeleton>
          <Typography sx={{ fontSize: "18px", fontWeight: "bold" }}>
            Total:
          </Typography>
          <Typography variant="h5" sx={{ marginLeft: "10px" }}></Typography>
        </Skeleton>
      </Grid>
      <Grid item xs={12} sx={{ display: "flex", alignItems: "center" }}>
        <Skeleton>
          <Typography sx={{ fontSize: "18px" }}>
            Shipping fees will be calculated at checkout.
          </Typography>
        </Skeleton>
      </Grid>
      <Grid item xs={12}>
        <Skeleton>
          <Typography sx={{ fontSize: "18px" }}>
            <Checkbox />I agree with the above information
          </Typography>
        </Skeleton>
      </Grid>
      <Grid
        item
        xs={12}
        sx={{
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Skeleton>
          <Button
            className="bg-blue-500 mt-6 hover:bg-blue-700 mb-3 ]"
            variant="contained"
          >
            Pay
          </Button>
        </Skeleton>
      </Grid>
    </Grid>
  );
};
export default SkeletonCartInfo;
