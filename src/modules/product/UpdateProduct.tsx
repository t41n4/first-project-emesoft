import {
  FormInputCategory,
  FormInputId,
  FormInputPrice,
  FormInputProductName,
  FormUploadDetailsPicture,
  FormUploadPicture,
} from "@/constant/formAddProduct";
import { useCartContext } from "@/context";
import { useCategories } from "@/hooks";
import EditIcon from "@mui/icons-material/Edit";
import HighlightOffOutlinedIcon from "@mui/icons-material/HighlightOffOutlined";
import {
  Alert,
  AlertTitle,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Divider,
  Drawer,
  IconButton,
  Snackbar,
  Tooltip,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { useForm } from "react-hook-form";
const UpdateProduct = ({ id }: any) => {
  // Use Form
  const {
    handleSubmit,
    formState: { errors },
    control,
    setValue,
    clearErrors,
    reset,
  } = useForm();
  //
  const [open, setOpen] = useState(false);
  const [openToast, setOpenToast] = useState(false);
  const categories = useCategories();
  const [picture, setPicture] = useState("");
  const [listPicture, setListPicture] = useState([]);
  // cart context
  const { handleDataUpdate, dataUpdate, handleUpdateData } = useCartContext();

  // Handle open modal
  const handleClickOpen = () => {
    handleDataUpdate(id);
    setOpen(true);
  };
  //   Handle close modal
  const handleClose = () => {
    reset();
    setOpen(false);

    clearErrors();
  };

  //   hanlde submit form
  const onSubmitForm = (data: any) => {
    if (data) {
      handleUpdateData(id, data);
      setOpen(false);
    }
  };

  // Handle Onclick delete list picture

  return (
    <div className="add-product inline ">
      <Tooltip title="edit product">
        <IconButton
          aria-label="edit"
          className="text-yellow-600 "
          onClick={() => handleClickOpen()}
        >
          <EditIcon />
        </IconButton>
      </Tooltip>
      <Drawer anchor="right" open={open} onClose={() => setOpen(true)}>
        <Card className="w-[50vw] overflow-y-scroll">
          <CardHeader
            action={
              <IconButton aria-label="settings" onClick={() => handleClose()}>
                <HighlightOffOutlinedIcon className="text-4xl" />
              </IconButton>
            }
            className="p-0 flex-row-reverse"
          />
          <CardContent>
            <Typography className="font-semibold text-xl">
              Update Product
            </Typography>
            <form
              onSubmit={handleSubmit(onSubmitForm)}
              id="my-form"
              className="grid grid-flow-row gap-5 mt-5 w-full"
            >
              <FormInputId
                name="id"
                control={control}
                label="ID"
                value={dataUpdate?.id}
              />

              <FormInputProductName
                name="productName"
                control={control}
                label="Product Name"
                value={dataUpdate?.productName}
              />
              <FormInputPrice
                name="price"
                control={control}
                label="Price"
                value={dataUpdate?.price}
              />

              <FormInputCategory
                name="categories"
                label="Category"
                control={control}
                value={dataUpdate?.categories}
              />
              <Divider textAlign="left">Product Image</Divider>
              <FormUploadPicture
                name="picture"
                control={control}
                label=" Picture"
                value={dataUpdate?.picture}
              />
              <Divider textAlign="left">Details Product Image </Divider>
              <FormUploadDetailsPicture
                name="detailPictures"
                control={control}
                label="Detail Picture"
                listPicture={listPicture}
                setListPicture={setListPicture}
                value={dataUpdate?.detailPictures}
              />
            </form>
          </CardContent>
          <CardActions>
            <Button
              type="submit"
              variant="contained"
              form="my-form"
              className="bg-blue-500 mx-auto px-7"
            >
              UPDATE DATA
            </Button>
          </CardActions>
        </Card>
      </Drawer>

      {/* Toast message */}
      <Snackbar
        open={openToast}
        autoHideDuration={6000}
        onClose={() => setOpenToast(false)}
        anchorOrigin={{ vertical: "top", horizontal: "left" }}
      >
        <Alert
          onClose={() => setOpenToast(false)}
          severity="success"
          sx={{ width: "100%" }}
        >
          <AlertTitle>Success</AlertTitle>
          Add a new product success
        </Alert>
      </Snackbar>
    </div>
  );
};

export default UpdateProduct;
