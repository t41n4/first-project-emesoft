import { Controller, useForm } from "react-hook-form";
import {
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Card,
  CardContent,
  CardHeader,
  IconButton,
  Typography,
  Divider,
  CardMedia,
  CardActions,
  Button,
  Autocomplete,
  ImageListItemBar,
  ImageList,
  ImageListItem,
} from "@mui/material";
import HighlightOffOutlinedIcon from "@mui/icons-material/HighlightOffOutlined";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { useRef, useState } from "react";
import { useCategories } from "@/hooks";

import styled from "styled-components";
interface FormInputProps {
  name: string;
  control: any;
  label: string;
  setPicture?: any;
  listPicture?: any;
  setListPicture?: any;
}

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

export const FormInputProductName = ({
  name,
  control,
  label,
}: FormInputProps) => {
  return (
    <Controller
      name={name}
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
          label={label}
          variant="outlined"
        />
      )}
    />
  );
};

export const FormInputPrice = (props: FormInputProps) => {
  return (
    <Controller
      name={props.name}
      control={props.control}
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
          label={props.label}
          variant="outlined"
        />
      )}
    />
  );
};

export const FormInputCategory = (props: FormInputProps) => {
  const categories = useCategories();
  return (
    <Controller
      name={props.name}
      control={props.control}
      rules={{ required: "Category not be empty!" }}
      render={({
        field: { value = [], onChange },
        fieldState: { error },
        formState,
      }) => {
        return (
          <Autocomplete
            multiple
            id="tags-outlined"
            options={categories}
            value={
              typeof value === "string"
                ? categories.find((cat) => cat === value)
                : value || null
            }
            // defaultValue={[]}
            // getOptionLabel={(option) => option}
            filterSelectedOptions
            onChange={(event, value) => onChange(value)}
            renderInput={(params) => {
              return (
                <TextField
                  {...params}
                  label={props.label}
                  helperText={error ? error.message : null}
                  error={!!error}
                />
              );
            }}
          />
        );
      }}
    />

    // <FormControl fullWidth>
    //   <InputLabel id="demo-simple-select-label">Category</InputLabel>
    //   <Controller
    //     name={props.name}
    //     control={props.control}
    //     rules={{ required: "Category be not empty!" }}
    //     defaultValue=""
    //     render={({
    //       field: { onChange, onBlur, value },
    //       fieldState: { error },
    //       formState,
    //     }) => {
    //       return (
    //         <>
    //           <Select
    //             labelId="demo-simple-select-label"
    //             id="demo-simple-select"
    //             value={value}
    //             label={props.label}
    //             onChange={onChange}
    //             error={!!error}
    //           >
    //             {categories.map((category, index) => {
    //               return <MenuItem value={category}>{category}</MenuItem>;
    //             })}
    //           </Select>
    //           {error ? (
    //             <span className="text-[0.75rem] mx-[14px] mt-1 text-[#d32f2f]">{`${error.message}`}</span>
    //           ) : (
    //             <></>
    //           )}
    //         </>
    //       );
    //     }}
    //   />
    // </FormControl>
  );
};

export const FormUploadPicture = (props: FormInputProps) => {
  return (
    <Controller
      name={props.name}
      control={props.control}
      rules={{ required: "Product image be not empty" }}
      defaultValue=""
      render={({ field, fieldState, formState }) => {
        return (
          <VisuallyHiddenInput
            type="file"
            accept="image/*"
            // value={value}
            onChange={(e) => {
              const pictureURL = URL.createObjectURL(e.target.files[0]);
              props.setPicture(pictureURL);
              return field.onChange(e.target.files[0]);
            }}
          />
        );
      }}
    />
  );
};

export const FormUploadDetailsPicture = (props: FormInputProps) => {
  const { listPicture, setListPicture } = props;
  return (
    <Controller
      name={props.name}
      control={props.control}
      defaultValue=""
      rules={{ required: "Product image be not empty" }}
      render={({ field, fieldState: { error }, formState }) => {
        return (
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
              {listPicture.map((item: any, index: number) => {
                return (
                  <ImageListItem key={index}>
                    <img src={URL.createObjectURL(item)} loading="lazy" />
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
                          onClick={() => {
                            if (listPicture.length > 0) {
                              const updateListPicture = [...listPicture];
                              updateListPicture.splice(index, 1);

                              setListPicture(updateListPicture);
                              field.onChange(updateListPicture);
                            }
                          }}
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
              {error ? (
                <span className="text-[0.75rem] mx-[14px] mt-1 text-[#d32f2f]">{`${error.message}`}</span>
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
                <VisuallyHiddenInput
                  type="file"
                  accept="image/*"
                  // value={value}
                  multiple
                  onChange={(event) => {
                    const listFiles = event.target.files;
                    const newListPicture = [...listPicture];

                    for (let i = 0; i < listFiles.length; i++) {
                      newListPicture.push(listFiles[i]);
                    }
                    setListPicture(newListPicture);

                    return field.onChange(newListPicture);
                  }}
                />
              </Button>
            </CardActions>
          </Card>
        );
      }}
    />
  );
};
