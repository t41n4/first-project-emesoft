import {
  FormInputCategory,
  FormInputId,
  FormInputPrice,
  FormInputProductName,
  FormUploadDetailsPicture,
  FormUploadPicture,
} from "@/constant/formAddProduct";
import { useProductContext2 } from "@/context";
import EditIcon from "@mui/icons-material/Edit";
import HighlightOffOutlinedIcon from "@mui/icons-material/HighlightOffOutlined";
import { DialogMessage } from "@/modules";

import {
  Alert,
  AlertTitle,
  Backdrop,
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
  Zoom,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import {
  handleViewDetailProduct,
  handleUpdateData,
} from "@/redux/reducer/ProductSlice_2";
import { useDispatch } from "react-redux";
import { useAppSelector } from "@/redux/hooks";
import { IProduct2 } from "@/common/types";
const UpdateProduct = (props: IProduct2) => {
  // Use Form
  const defaultValues = {
    productName: props.productName,
    id: props.id,
    price: props.price,
    categories: props.categories,
    picture: props.picture,
    detailPictures: props.detailPictures,
  };
  const {
    handleSubmit,
    formState: { errors },
    control,
    getValues,
    reset,
    clearErrors,
  } = useForm({ defaultValues });
  // dispatch
  const dispatch = useDispatch();
  // state open
  const [open, setOpen] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const [openToast, setOpenToast] = useState(false);
  // cart context
  // const { handleUpdateData } = useProductContext2();

  const dataUpdate = useAppSelector((state) => state.products2.detailProduct);
  // Handle open modal
  const handleClickOpen = (id: any) => {
    setOpen(true);
    dispatch(handleViewDetailProduct(id));
  };
  // handle check value and erros forms
  const handleCheck = () => {
    const getValueForm = Object.values(getValues());

    const checkValueForm = getValueForm.some((item) => item.length !== 0); //user khong nhap gia tri = false
    const checkErrors = Object.keys(errors).length !== 0; //neu khong co error false
    const check = checkValueForm || checkErrors;
    return check;
  };
  //   Handle close modal
  const handleClose = () => {
    if (handleCheck()) {
      setOpenDialog(true);
    } else {
      setOpen(false);
    }
  };
  const handleOnKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "Escape") {
      setOpen(false);
    }
  };
  //   hanlde submit form
  const onSubmitForm = (data: any) => {
    // console.log("🚀 ~ data:", data);
    if (data) {
      dispatch(handleUpdateData(data));

      setOpen(false);
    }
  };

  // Handle Onclick delete list picture

  return (
    <div className="update-product inline  ">
      <Tooltip title="edit product">
        <IconButton
          aria-label="edit"
          className="text-yellow-600 "
          onClick={() => handleClickOpen(props.id)}
        >
          <EditIcon />
        </IconButton>
      </Tooltip>

      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={open}
      >
        <Zoom in={open} timeout={500}>
          <Card className="w-[50vw] h-[100vh] overflow-y-scroll absolute top-0 right-0">
            <CardHeader
              action={
                <IconButton
                  aria-label="settings"
                  onClick={() => handleClose()}
                  className="h-9 w-9 my-2 mr-4"
                >
                  <HighlightOffOutlinedIcon className="text-4xl mx-auto" />
                </IconButton>
              }
              className="p-0 flex-row-reverse"
              title="Update Product"
            />
            <CardContent>
              <form
                noValidate
                onSubmit={handleSubmit(onSubmitForm)}
                // id="my-formUpdate"
                className="grid grid-flow-row gap-5 mt-5 w-full"
              >
                <FormInputId
                  name="id"
                  control={control}
                  label="ID"
                  // value={props.id}
                />

                <FormInputProductName
                  name="productName"
                  control={control}
                  label="Product Name"
                  // value={props.productName}
                />
                <FormInputPrice
                  name="price"
                  control={control}
                  label="Price"
                  // value={props.price}
                />

                <FormInputCategory
                  name="categories"
                  label="Category"
                  control={control}
                  // value={props.categories}
                />
                <Divider textAlign="left">Product Image</Divider>
                <FormUploadPicture
                  name="picture"
                  control={control}
                  label=" Picture"
                  // value={props.picture}
                />
                <Divider textAlign="left">Details Product Image </Divider>
                <FormUploadDetailsPicture
                  name="detailPictures"
                  control={control}
                  label="Detail Picture"
                  // value={props.detailPictures}
                />
                <Button
                  type="submit"
                  variant="contained"
                  // form="my-formUpdate"
                  className="bg-blue-500 mx-auto px-7"
                >
                  UPDATE DATA
                </Button>
              </form>
            </CardContent>
          </Card>
        </Zoom>
      </Backdrop>

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
      <DialogMessage
        openDialog={openDialog}
        setOpenDrawer={setOpen}
        content="You are updating the data, do you want to continue?"
        setOpenDialog={setOpenDialog}
      />
    </div>
  );
};

export default UpdateProduct;

{
  /* <Drawer
        anchor="right"
        open={open}
        onKeyDown={(event) => handleOnKeyDown(event)}
      >
        <Card className="w-[50vw] overflow-y-scroll">
          <CardHeader
            action={
              <IconButton aria-label="settings" onClick={() => handleClose()}>
                <HighlightOffOutlinedIcon className="text-4xl mr-4" />
              </IconButton>
            }
            className="p-0 flex-row-reverse"
            title="Update Product"
          />
          <CardContent>
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
      </Drawer> */
}
