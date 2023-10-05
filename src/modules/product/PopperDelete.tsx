import {
  Button,
  Card,
  CardActions,
  CardContent,
  Fade,
  Popper,
  Typography,
} from "@mui/material";
import { useProductContext2 } from "@/context";
interface IDataDeleteProduct {
  id: number;
  productName: string;
}
interface IPopperProps {
  openPopper: boolean;
  anchorEl: HTMLElement | null;
  dataDeleteProduct: IDataDeleteProduct | undefined;
  setOpenPopper: any;
}
const PopperDelete = (props: IPopperProps) => {
  const { handleDeleteProduct } = useProductContext2();

  return (
    <Popper
      id="message-delete-popper"
      open={props.openPopper}
      anchorEl={props.anchorEl}
      transition
      placement="left"
    >
      {({ TransitionProps }) => {
        return (
          <Fade {...TransitionProps}>
            <Card sx={{ maxWidth: 345 }}>
              <CardContent className="px-4 py-1">
                <Typography component="div" className="text-base font-semibold">
                  Message
                </Typography>
                <Typography color="text.secondary">
                  do you want to delete {props.dataDeleteProduct?.productName}
                </Typography>
              </CardContent>
              <CardActions>
                <Button
                  size="small"
                  onClick={() => {
                    props.setOpenPopper(false);
                    handleDeleteProduct(props.dataDeleteProduct?.id);
                  }}
                >
                  Yes
                </Button>
                <Button size="small" onClick={() => props.setOpenPopper(false)}>
                  Cancel
                </Button>
              </CardActions>
            </Card>
          </Fade>
        );
      }}
    </Popper>
  );
};

export default PopperDelete;
