import {
  FormInputCategory,
  FormInputPrice,
  FormInputProductName,
  FormUploadDetailsPicture,
  FormUploadPicture,
} from "@/constant/formAddProduct";
import { useProductContext2 } from "@/context";
import { useCategories } from "@/hooks";
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
  Backdrop,
  Collapse,
  Zoom,
  Fade,
} from "@mui/material";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { v4 as uuidv4 } from "uuid";
import { DialogMessage } from "@/modules";
import { addNewProduct } from "@/redux/reducer/ProductSlice_2";

const AddProduct = () => {
  const dispatch = useDispatch();

  // Use Form
  const defaultValues = {
    productName: "",
    price: "",
    categories: [],
    picture: "",
    detailPictures: [],
  };
  const {
    handleSubmit,
    formState: { errors },
    control,
    setValue,
    clearErrors,
    reset,
    getValues,
    register,
  } = useForm({ defaultValues });
  //
  const [open, setOpen] = useState(false);
  const [openToast, setOpenToast] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  // cart context
  // const { addNewProduct } = useProductContext2();

  // Handle open modal
  const handleClickOpen = () => {
    setOpen(true);
  };

  // handle check value and erros forms
  const handleCheck = () => {
    const getValueForm = Object.values(getValues());
    // console.log("🚀 ~ getValueForm:", getValueForm);

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
    // clearErrors();
  };
  const handleOnKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "Escape") {
      if (handleCheck()) {
        setOpenDialog(true);
      } else {
        setOpen(false);
        clearErrors();
      }
    }
  };

  //   hanlde submit form
  const onSubmitForm = (data: any) => {
    console.log("🚀 ~ data:", data);
    if (data) {
      const newData = { ...data, id: uuidv4() };
      // addNewProduct(newData);
      dispatch(addNewProduct(newData));
      reset();

      setOpenToast(true);
    }
  };

  // Handle Onclick delete list picture
  return (
    <div className="add-product inline">
      <Button
        variant="outlined"
        onClick={handleClickOpen}
        className="min-w-max text-black border border-neutral-950"
      >
        Add Product
      </Button>

      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={open}
      >
        <Fade in={open} timeout={500}>
          <Card
            className="  overflow-y-scroll absolute top-0 right-0"
            sx={{
              height: "100vh",
              width: {
                xs: "100vw",
                sm: "70vw",
                md: "50vw",
              },
            }}
          >
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
              title="Create A New Product"
            />
            <CardContent>
              <form
                noValidate
                onSubmit={handleSubmit(onSubmitForm)}
                id="my-formAdd"
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
                />
              </form>
            </CardContent>
            <CardActions>
              <Button
                type="submit"
                variant="contained"
                form="my-formAdd"
                className="bg-blue-500 mx-auto px-7"
              >
                ADD
              </Button>
            </CardActions>
          </Card>
        </Fade>
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
      {/* Popup Message */}
      <DialogMessage
        openDialog={openDialog}
        setOpenDialog={setOpenDialog}
        content="You are adding a product do you want to continue?"
        setOpenDrawer={setOpen}
        reset={reset}
        clearErrors={clearErrors}
      />
    </div>
  );
};

export default AddProduct;
