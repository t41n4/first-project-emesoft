import { Controller, useForm } from "react-hook-form";
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
  Stack,
} from "@mui/material";
import HighlightOffOutlinedIcon from "@mui/icons-material/HighlightOffOutlined";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";

import { useCategories } from "@/hooks";

import styled from "styled-components";
interface FormInputProps {
  name: string;
  control: any;
  label: string;
}

export const FormInputId = ({ name, control, label }: FormInputProps) => {
  return (
    <Controller
      name={name}
      control={control}
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
}: FormInputProps) => {
  return (
    <Controller
      name={name}
      control={control}
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
      rules={{ required: "Product image be not empty!" }}
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
            {error ? (
              <Typography
                color="error"
                sx={{ fontSize: "12px", margin: "3px 14px 0" }}
              >
                {error.message}
              </Typography>
            ) : (
              <></>
            )}

            <CardActions className="">
              <Button
                variant="contained"
                component="label"
                className="mx-auto"
                startIcon={<CloudUploadIcon />}
              >
                Upload
                <input
                  hidden
                  accept="image/*"
                  type="file"
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
      rules={{ required: "Product image be not empty!" }}
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
            {error ? (
              <Typography
                color="error"
                sx={{ fontSize: "12px", margin: "3px 14px 0" }}
              >
                {error.message}
              </Typography>
            ) : (
              <></>
            )}

            <CardActions>
              <Button
                variant="contained"
                component="label"
                className="mx-auto"
                startIcon={<CloudUploadIcon />}
              >
                Upload
                <input
                  hidden
                  accept="image/*"
                  multiple
                  type="file"
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
};
