import { Controller } from "react-hook-form";
import {
  TextField,
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
import { useEffect, useRef, useState } from "react";
import { useCategories } from "@/hooks";

import styled from "styled-components";
interface FormInputProps {
  name: string;
  control: any;
  label: string;
  setPicture?: any;
  listPicture?: any;
  setListPicture?: any;
  value?: any;
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
export const FormInputId = ({
  name,
  control,
  label,
  value,
}: FormInputProps) => {
  const dataName = value;

  return (
    <Controller
      name={name}
      control={control}
      defaultValue={dataName ? dataName : ""}
      render={({
        field: { onChange, onBlur, value },
        fieldState: { error },
        formState,
      }) => (
        <TextField
          disabled
          size="small"
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
export const FormInputProductName = ({
  name,
  control,
  label,
  value,
}: FormInputProps) => {
  const dataName = value;

  return (
    <Controller
      name={name}
      control={control}
      defaultValue={dataName ? dataName : ""}
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
      defaultValue={props.value ? props.value : ""}
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
  const dataCate = props.value;
  return (
    <Controller
      name={props.name}
      control={props.control}
      rules={{ required: "Category not be empty!" }}
      defaultValue={dataCate ? dataCate : []}
      render={({
        field: { value = [], onChange },
        fieldState: { error },
        formState,
      }) => {
        return (
          <Autocomplete
            freeSolo
            multiple
            id="tags-outlined"
            options={categories}
            // defaultValue={props.value ? props.value : []}
            value={
              typeof value === "string"
                ? categories.find((cat) => cat === value)
                : value || null
            }
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
  );
};

export const FormUploadPicture = (props: FormInputProps) => {
  return (
    <Controller
      name={props.name}
      control={props.control}
      defaultValue={props.value ? props.value : ""}
      rules={{ required: "Product image be not empty" }}
      render={({
        field: { value, onChange },
        fieldState: { error },
        formState,
      }) => {
        return (
          <Card className=" w-full">
            <ImageList
              sx={{
                // width: "100%",
                // Promote the list into its own layer in Chrome. This costs memory, but helps keeping high FPS.
                transform: "translateZ(0)",
              }}
              cols={4}
              gap={10}
            >
              <ImageListItem>
                <img src={value ? URL.createObjectURL(value) : ""} />
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
                      onClick={() => onChange("")}
                    >
                      <HighlightOffOutlinedIcon />
                    </IconButton>
                  }
                  actionPosition="left"
                />
              </ImageListItem>
            </ImageList>
            <CardContent className="p-0">
              {error ? (
                <span className="text-red-500">{`${error.message}`}</span>
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

                  onChange={(event) => {
                    if (event.target.files && event.target.files.length > 0) {
                      onChange(event.target.files[0]);
                    } else {
                      onChange(null);
                    }
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

export const FormUploadDetailsPicture = (props: FormInputProps) => {
  return (
    <Controller
      name={props.name}
      control={props.control}
      defaultValue={props.value ? props.value : []}
      rules={{ required: "Product image be not empty" }}
      render={({
        field: { value = [], onChange },
        fieldState: { error },
        formState,
      }) => {
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
              {value ? (
                value.map((item: any, index: number) => {
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
                              if (value.length > 0) {
                                const updateListPicture = [...value];
                                updateListPicture.splice(index, 1);
                                onChange(updateListPicture);
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
                })
              ) : (
                <></>
              )}
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
                    if (listFiles && listFiles.length > 0) {
                      const newListPicture = [...value];
                      for (let i = 0; i < listFiles.length; i++) {
                        newListPicture.push(listFiles[i]);
                      }
                      onChange(newListPicture);
                    }
                  }}
                />
              </Button>
            </CardActions>
          </Card>
        );
      }}
    />
  );
  // const { listPicture, setListPicture } = props;

  // return (
  //   <Controller
  //     name={props.name}
  //     control={props.control}
  //     defaultValue=""
  //     rules={{ required: "Product image be not empty" }}
  //     render={({ field, fieldState: { error }, formState }) => {
  //       console.log("check value", field.value);
  //       return (
  //         <Card className=" w-full">
  //           <ImageList
  //             sx={{
  //               width: "100%",
  //               // Promote the list into its own layer in Chrome. This costs memory, but helps keeping high FPS.
  //               transform: "translateZ(0)",
  //             }}
  //             cols={3}
  //             gap={1}
  //           >
  //             {listPicture.map((item: any, index: number) => {
  //               return (
  //                 <ImageListItem key={index}>
  //                   <img src={URL.createObjectURL(item)} loading="lazy" />
  //                   <ImageListItemBar
  //                     sx={{
  //                       background:
  //                         "linear-gradient(to bottom, rgba(0,0,0,0.7) 0%, " +
  //                         "rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)",
  //                     }}
  //                     position="top"
  //                     actionIcon={
  //                       <IconButton
  //                         sx={{ color: "white" }}
  //                         onClick={() => {
  //                           if (listPicture.length > 0) {
  //                             const updateListPicture = [...listPicture];
  //                             updateListPicture.splice(index, 1);

  //                             setListPicture(updateListPicture);
  //                             field.onChange(updateListPicture);
  //                           }
  //                         }}
  //                       >
  //                         <HighlightOffOutlinedIcon />
  //                       </IconButton>
  //                     }
  //                     actionPosition="left"
  //                   />
  //                 </ImageListItem>
  //               );
  //             })}
  //           </ImageList>
  //           <CardContent className="p-0">
  //             {error ? (
  //               <span className="text-[0.75rem] mx-[14px] mt-1 text-[#d32f2f]">{`${error.message}`}</span>
  //             ) : (
  //               <></>
  //             )}
  //           </CardContent>

  //           <CardActions>
  //             <Button
  //               component="label"
  //               variant="contained"
  //               startIcon={<CloudUploadIcon />}
  //               className="mx-auto"
  //             >
  //               Upload file
  //               <VisuallyHiddenInput
  //                 type="file"
  //                 accept="image/*"
  //                 // value={value}
  //                 multiple
  //                 onChange={(event) => {
  //                   const listFiles = event.target.files;
  //                   const newListPicture = [...listPicture];

  //                   for (let i = 0; i < listFiles.length; i++) {
  //                     newListPicture.push(listFiles[i]);
  //                   }
  //                   setListPicture(newListPicture);

  //                   return field.onChange(newListPicture);
  //                 }}
  //               />
  //             </Button>
  //           </CardActions>
  //         </Card>
  //       );
  //     }}
  //   />
  // );
};
