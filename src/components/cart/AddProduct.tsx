import * as React from "react";
import {
  Button,
  TextField,
  Dialog,
  DialogTitle,
  DialogContentText,
  DialogActions,
  DialogContent,
  Divider,
  FormControl,
  OutlinedInput,
  InputLabel,
  InputAdornment,
  Select,
  MenuItem,
  Card,
  CardMedia,
  CardActions,
  CardContent,
  CardHeader,
  IconButton,
} from "@mui/material";
import HighlightOffOutlinedIcon from "@mui/icons-material/HighlightOffOutlined";

import { styled } from "@mui/material/styles";
import { Controller, useForm } from "react-hook-form";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { useState, useEffect } from "react";
import { useCategories } from "@/hooks";
const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});
const AddProduct = () => {
  const [open, setOpen] = React.useState(false);
  const [categories, setCategories] = useState([]);
  const [picture, setPicture] = useState("");
  interface FormValues {
    nameProduct: string;
    price: string;
    category: string;
    picture: string;
  }

  const rawData = useCategories();
  console.log("rawData: ", rawData);
  // UseEffects
  useEffect(() => {
    setCategories(rawData);

    // useCategories().then((response) => {
    //   if (response) {
    // setCategories(rawData);
    //   }
    // });
  }, []);

  // Handle open modal
  const handleClickOpen = () => {
    setOpen(true);
  };
  //   Handle close modal
  const handleClose = () => {
    setOpen(true);
  };
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
    setValue,
    reset,
  } = useForm<FormValues>();

  //   hanlde submit form
  const onSubmitForm = (data: any) => {
    console.log("data", data);
    reset();
    setPicture("");
  };

  return (
    <div>
      <Button variant="outlined" onClick={handleClickOpen}>
        Add Product
      </Button>
      <Dialog open={open} onClose={handleClose} disableEscapeKeyDown={true}>
        <DialogTitle>Add new product</DialogTitle>
        <IconButton
          aria-label="close"
          onClick={() => setOpen(false)}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <HighlightOffOutlinedIcon />
        </IconButton>
        <DialogContent>
          <form
            onSubmit={handleSubmit(onSubmitForm)}
            id="my-form"
            className="grid grid-flow-row gap-5 mt-5 w-96"
          >
            <Controller
              name="nameProduct"
              control={control}
              defaultValue=""
              rules={{
                required: "product name not be empty!",
                minLength: { value: 8, message: "Minimum of 8 characters!" },
              }}
              render={({
                field: { onChange, onBlur, value },
                fieldState: { error },
                formState,
              }) => (
                <TextField
                  helperText={error ? error.message : null}
                  size="small"
                  error={!!error}
                  onChange={onChange}
                  onBlur={onBlur}
                  value={value}
                  fullWidth
                  label="Product name"
                  variant="outlined"
                />
              )}
            />

            <Controller
              name="price"
              control={control}
              defaultValue=""
              rules={{
                required: "price not be empty!",
                pattern: {
                  value: /^[0-9]+$/,
                  message: "Please enter a number",
                },
              }}
              render={({
                field: { onChange, onBlur, value },
                fieldState: { error },
                formState,
              }) => (
                <TextField
                  helperText={error ? error.message : null}
                  size="small"
                  error={!!error}
                  onChange={onChange}
                  onBlur={onBlur}
                  value={value}
                  fullWidth
                  label="Price"
                  variant="outlined"
                />
              )}
            />
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Category</InputLabel>
              <Controller
                name="category"
                control={control}
                rules={{ required: "Category be not empty!" }}
                defaultValue=""
                render={({
                  field: { onChange, onBlur, value },
                  fieldState: { error },
                  formState,
                }) => {
                  return (
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={value}
                      label="Category"
                      onChange={onChange}
                      error={!!error}
                    >
                      {categories.map((category, index) => {
                        return <MenuItem value={category}>{category}</MenuItem>;
                      })}
                    </Select>
                  );
                }}
              />
              {errors?.category ? (
                <span className="text-[0.75rem] mx-[14px] mt-1 text-[#d32f2f]">{`${errors.category.message}`}</span>
              ) : (
                <></>
              )}
            </FormControl>

            <Divider textAlign="left">Product Image</Divider>
            <Card className=" w-full">
              {picture ? (
                <CardHeader
                  action={
                    <IconButton
                      aria-label="settings"
                      className="p-0"
                      onClick={() => {
                        setPicture("");
                        setValue("picture", "");
                      }}
                    >
                      <HighlightOffOutlinedIcon />
                    </IconButton>
                  }
                />
              ) : (
                <></>
              )}
              <CardMedia
                component="img"
                image={picture}
                className="mx-auto h-28 object-contain"
              />
              <CardContent>
                {errors?.picture ? (
                  <span className="text-[0.75rem] mx-[14px] mt-1 text-[#d32f2f]">{`${errors.picture.message}`}</span>
                ) : (
                  <></>
                )}
              </CardContent>

              <CardActions>
                <Button
                  component="label"
                  variant="contained"
                  startIcon={<CloudUploadIcon />}
                  className="mx-auto"
                >
                  Upload file
                  <Controller
                    name="picture"
                    control={control}
                    rules={{ required: "Product image be not empty" }}
                    defaultValue=""
                    render={({ field, fieldState, formState }) => {
                      return (
                        <VisuallyHiddenInput
                          type="file"
                          accept="image/*"
                          // value={value}
                          onChange={(e) => {
                            setPicture(URL.createObjectURL(e.target.files[0]));
                            return field.onChange(e.target.value);
                          }}
                        />
                      );
                    }}
                  />
                </Button>
              </CardActions>
            </Card>
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>Cancel</Button>
          <Button type="submit" form="my-form">
            ADD
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default AddProduct;
