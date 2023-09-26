import * as React from "react";
import {
  Button,
  Drawer,
  Typography,
  ListItemIcon,
  ListItemButton,
  ListItemText,
  Box,
  List,
  ListItem,
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
  ImageList,
  ImageListItem,
  ImageListItemBar,
} from "@mui/material";
import HighlightOffOutlinedIcon from "@mui/icons-material/HighlightOffOutlined";
import { styled } from "@mui/material/styles";
import { Controller, useForm } from "react-hook-form";
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

const AddProduct = () => {
  const [open, setOpen] = React.useState(false);
  const categories = useCategories();
  const [picture, setPicture] = useState("");
  const [listPicture, setListPicture] = useState([]);
  // interface FormValues {
  //   nameProduct: string;
  //   price: string;
  //   category: string;
  //   picture: string;  // }

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
  } = useForm();

  //   hanlde submit form
  const onSubmitForm = (data: any) => {
    console.log("data", data);
    reset();
    setPicture("");
    setListPicture([]);
  };

  // function srcset(
  //   image: string,
  //   width: number,
  //   height: number,
  //   rows = 1,
  //   cols = 1
  // ) {
  //   return {
  //     src: `${image}?w=${width * cols}&h=${height * rows}`,
  //     srcSet: `${image}?w=${width * cols}&h=${height * rows}2x`,
  //   };
  // }
  // Handle Onclick delete list picture
  const handleDeleteListPicture = (index: number) => {
    if (listPicture.length > 0) {
      const updateListPicture = listPicture.filter(
        (item, indexItem) => indexItem !== index
      );
      setListPicture(updateListPicture);
    }
  };
  return (
    <div>
      <Button variant="outlined" onClick={handleClickOpen}>
        Add Product
      </Button>
      <Drawer anchor="right" open={true} onClose={() => setOpen(false)}>
        <Card className="w-[50vw] overflow-y-scroll">
          <CardHeader
            action={
              <IconButton aria-label="settings">
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
                <CardContent className="p-0">
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
                    <FormUploadPicture
                      name="picture"
                      control={control}
                      label="piceture"
                      setPicture={setPicture}
                    />
                  </Button>
                </CardActions>
              </Card>

              <Divider textAlign="left">Details Product Image </Divider>
              <Card className=" w-full">
                <ImageList
                  sx={{
                    width: "100%",
                    // Promote the list into its own layer in Chrome. This costs memory, but helps keeping high FPS.
                    transform: "translateZ(0)",
                  }}
                  cols={3}
                  gap={1}
                >
                  {listPicture.map((item, index) => {
                    return (
                      <ImageListItem key={index}>
                        <img src={item} loading="lazy" />
                        <ImageListItemBar
                          sx={{
                            background:
                              "linear-gradient(to bottom, rgba(0,0,0,0.7) 0%, " +
                              "rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)",
                          }}
                          position="top"
                          actionIcon={
                            <IconButton
                              sx={{ color: "white" }}
                              onClick={() => handleDeleteListPicture(index)}
                            >
                              <HighlightOffOutlinedIcon />
                            </IconButton>
                          }
                          actionPosition="left"
                        />
                      </ImageListItem>
                    );
                  })}
                </ImageList>
                <CardContent className="p-0">
                  {errors?.detailsPicture ? (
                    <span className="text-[0.75rem] mx-[14px] mt-1 text-[#d32f2f]">{`${errors.detailsPicture.message}`}</span>
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
                    <FormUploadDetailsPicture
                      control={control}
                      label="Details Picture"
                      name="detailsPicture"
                      setListPicture={setListPicture}
                    />
                  </Button>
                </CardActions>
              </Card>
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
    </div>
  );
};

export default AddProduct;
