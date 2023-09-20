import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import {
  Grid,
  CardMedia,
  Typography,
  Skeleton,
  IconButton,
  Box,
  Button,
} from "@mui/material";
const SkeletonCart = () => {
  return (
    <>
      <Box className="max-w-lg">
        <Box
          component="div"
          className="sticky top-[4.5rem] left-[3.5rem] pl-4 border border-black ml-4"
        >
          <Skeleton>
            <Typography className="text-3xl font-normal mt-2">
              200000
            </Typography>
          </Skeleton>
          <Skeleton>
            <Typography className="text-2xl my-4">
              Shipping fees are calculated at checkout
            </Typography>
          </Skeleton>
          <Box className="text-2xl"></Box>

          <Box className="flex justify-center">
            <Skeleton>
              <Button
                variant="contained"
                className="my-3 px-16  bg-black hover:bg-[#E4E6E7] hover:text-black "
              >
                Pay
              </Button>
            </Skeleton>
          </Box>
        </Box>
      </Box>
      <Grid
        container
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5"
      >
        {[...Array(4)].map((item) => {
          return (
            <Grid item className="border border-black">
              <Box className="  flex flex-col text-center">
                <Box className="flex flex-row-reverse">
                  <Skeleton className="mr-1">
                    <IconButton aria-label="delete" size="small">
                      <HighlightOffIcon />
                    </IconButton>
                  </Skeleton>
                </Box>
                <Skeleton className=" mx-auto">
                  <CardMedia
                    component="img"
                    className="h-60 w-40 object-contain px-3 rounded"
                    image=""
                  />
                </Skeleton>
                <Skeleton className="mx-auto">
                  <Typography className="my-2">Name</Typography>
                </Skeleton>

                <Skeleton className="mx-auto ">
                  <Typography className="my-2">20000</Typography>
                </Skeleton>
              </Box>
            </Grid>
          );
        })}
      </Grid>
    </>
  );
};
export default SkeletonCart;
