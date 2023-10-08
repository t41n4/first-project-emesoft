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
} from "@mui/material";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { v4 as uuidv4 } from "uuid";
import { DialogMessage } from "@/modules";
const AddProduct = () => {
  // Use Form
  const {
    handleSubmit,
    formState: { errors },
    control,
    setValue,
    clearErrors,
    reset,
    getValues,
  } = useForm();
  //
  const [openDrawer, setOpenDrawer] = useState(false);
  const [openToast, setOpenToast] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  // cart context
  const { addNewProduct } = useProductContext2();

  // Handle open modal
  const handleClickOpen = () => {
    setOpenDrawer(true);
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
      setOpenDrawer(false);
    }
    // clearErrors();
  };
  const handleOnKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "Escape") {
      if (handleCheck()) {
        setOpenDialog(true);
      } else {
        setOpenDrawer(false);
        clearErrors();
      }
    }
  };

  //   hanlde submit form
  const onSubmitForm = (data: any) => {
    console.log("🚀 ~ data:", data);
    if (data) {
      const newData = { ...data, id: uuidv4() };
      addNewProduct(newData);
      reset();
      setValue("detailPictures", []);

      setOpenToast(true);
    }
  };

  // Handle Onclick delete list picture
  return (
    <div className="add-product ">
      <Button
        variant="outlined"
        onClick={handleClickOpen}
        className="min-w-max text-black border border-neutral-950"
      >
        Add Product
      </Button>
      <Drawer
        anchor="right"
        open={openDrawer}
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
            title="Add A New Product"
          />
          <CardContent>
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
      {/* Popup Message */}
      <DialogMessage
        openDialog={openDialog}
        setOpenDialog={setOpenDialog}
        content="You are adding a product do you want to continue?"
        setOpenDrawer={setOpenDrawer}
        reset={reset}
        clearErrors={clearErrors}
      />
    </div>
  );
};

export default AddProduct;
