import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import {
  Box,
  CardMedia,
  Grid,
  Typography,
  Button,
  CardActionArea,
  CardActions,
  CardHeader,
  IconButton,
  Skeleton,
} from "@mui/material";
const SkeletonCart = () => {
  return (
    <Grid item>
      <Card>
        <Skeleton>
          <CardHeader
            action={
              <IconButton className="mx-1">
                <HighlightOffIcon />
              </IconButton>
            }
            className="p-0"
          />
        </Skeleton>
        <Skeleton>
          <CardActionArea>
            <CardMedia
              component="img"
              alt="green iguana"
              className="h-72 object-contain"
            />
            <CardContent className="text-center py-2">
              <Typography
                gutterBottom
                variant="h5"
                className="whitespace-nowrap overflow-hidden text-ellipsis"
              >
                113213
              </Typography>
              <Typography>250000</Typography>
            </CardContent>
          </CardActionArea>
        </Skeleton>
        <Skeleton>
          <CardActions className="flex justify-center mb-1"></CardActions>
        </Skeleton>
      </Card>
    </Grid>
  );
};
export default SkeletonCart;
