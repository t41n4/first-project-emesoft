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
} from "@mui/material";
import { useState } from "react";
import { useForm, useFormContext } from "react-hook-form";
const UpdateProduct = ({ id }: any) => {
  // Use Form
  const {
    handleSubmit,
    formState: { errors },
    control,
    clearErrors,
    reset,
    getValues,
  } = useForm();
  //
  const [openDrawer, setOpenDrawer] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const [openToast, setOpenToast] = useState(false);
  const [listPicture, setListPicture] = useState([]);
  // cart context
  const { handleDataUpdate, dataUpdate, handleUpdateData } =
    useProductContext2();

  // Handle open modal
  const handleClickOpen = () => {
    handleDataUpdate(id);
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
  };
  const handleOnKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "Escape") {
      setOpenDrawer(false);
    }
  };
  //   hanlde submit form
  const onSubmitForm = (data: any) => {
    if (data) {
      handleUpdateData(id, data);
      setOpenDrawer(false);
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
      <DialogMessage
        openDialog={openDialog}
        setOpenDrawer={setOpenDrawer}
        content="You are updating the data, do you want to continue?"
        setOpenDialog={setOpenDialog}
      />
    </div>
  );
};

export default UpdateProduct;
