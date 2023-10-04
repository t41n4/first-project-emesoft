import {
  Button,
  Drawer,
  Typography,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  Divider,
  IconButton,
  Snackbar,
  Alert,
  AlertTitle,
} from "@mui/material";
import HighlightOffOutlinedIcon from "@mui/icons-material/HighlightOffOutlined";
import { styled } from "@mui/material/styles";
import { useForm } from "react-hook-form";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { useCategories } from "@/hooks";
import { useState, useEffect } from "react";
import {
  FormInputProductName,
  FormInputPrice,
  FormInputCategory,
  FormUploadPicture,
  FormUploadDetailsPicture,
} from "@/constant/formAddProduct";
import { useCart } from "@/context";
const AddProduct = () => {
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
  const { addNewProduct } = useCart();

  // Handle open modal
  const handleClickOpen = () => {
    setOpen(true);
  };
  //   Handle close modal
  const handleClose = () => {
    setOpen(false);

    clearErrors();
  };

  //   hanlde submit form
  const onSubmitForm = (data: any) => {
    if (data) {
      const newData = { ...data, id: uuidv4() };
      addNewProduct(newData);
      reset();
      setValue("detailPictures", []);
      setPicture("");
      setListPicture([]);
      setOpenToast(true);
    }
  };

  // Handle Onclick delete list picture

  return (
    <div className="add-product ">
      <Button
        variant="outlined"
        onClick={handleClickOpen}
        className="min-w-max"
      >
        Add Product
      </Button>
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
              Add a new product
            </Typography>
            <form
              onSubmit={handleSubmit(onSubmitForm)}
              id="my-form"
              className="grid grid-flow-row gap-5 mt-5 w-full"
            >
              <FormInputProductName
                name="productName"
                control={control}
                label="Product Name"
              />
              <FormInputPrice name="price" control={control} label="Price" />

              <FormInputCategory
                name="categories"
                label="Category"
                control={control}
              />
              <Divider textAlign="left">Product Image</Divider>

              <FormUploadPicture
                name="picture"
                control={control}
                label=" Picture"
              />

              <Divider textAlign="left">Details Product Image </Divider>
              <FormUploadDetailsPicture
                name="detailPictures"
                control={control}
                label="Detail Picture"
                listPicture={listPicture}
                setListPicture={setListPicture}
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
              ADD
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

export default AddProduct;
