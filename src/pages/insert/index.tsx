import { useCategories } from "@/hooks";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import {
  Button,
  Checkbox,
  FormControl,
  InputLabel,
  ListItemText,
  MenuItem,
  OutlinedInput,
  Select,
  SelectChangeEvent,
  Skeleton,
  TextField,
  styled,
} from "@mui/material";
import { File } from "buffer";
import Image from "next/image";
import { useState } from "react";
import { useForm } from "react-hook-form";

interface IFormInput {
  productName: string;
  category: string;
  description: number;
  price: number;
  file: File;
}
const patternAlphabetical = /^[A-Za-z]+$/i;
const patternAlphanumeric = /^[A-Za-z0-9]+$/i;
const patternAlphanumericWithSpace = /^[A-Za-z0-9 ]+$/i;

const NameErrorMessage =
  "Product name must start with a letter and be 5-20 characters long, including letters, numbers";
const MaxLengthErrorMessage = "Max length exceeded";
const MinLengthErrorMessage = "Min length exceeded";
const RequireErrorMessage = "This field is required";
const src =
  "https://down-vn.img.susercontent.com/file/vn-11134201-23030-gnmgaam6jfov77";

const InsertPage = () => {
  const [MyImage, setImage] = useState<any>();
  const [File, setFile] = useState<any>();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInput>();

  const cartegories = useCategories();

  const onSubmit = (data: IFormInput) => {
    handleValidateFile(File);
    data.file = File?.name;
    alert(JSON.stringify(data));
  };

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
  const ITEM_HEIGHT = 48;
  const ITEM_PADDING_TOP = 8;
  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        width: 250,
      },
    },
  };

  const validateFileType = (value: any) => {
    if (!value) return false;
    const validTypes = ["image/png", "image/jpeg", "image/jpg"];
    if (validTypes.indexOf(value.type) === -1) {
      return false;
    }
    return true;
  };

  const validateFileSize = (value: any) => {
    if (!value) return false;
    const maxSize = 1000000;
    if (value.size > maxSize) {
      return false;
    }
    return true;
  };

  const [selectedCategory, setSelectedCategory] = useState<string[]>([]);

  const handleCategoryChange = (
    event: SelectChangeEvent<typeof selectedCategory>
  ) => {
    const {
      target: { value },
    } = event;
    setSelectedCategory(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );
  };

  const handleValidateFile = (file: any) => {
    const isVaildType = validateFileType(file);
    const isVaildSize = validateFileSize(file);

    if (!isVaildType) {
      alert("Please select a png file");
      return;
    }

    if (!isVaildSize) {
      alert("Please select a file that is less than 1MB");
      return;
    }
  };

  const handleFileChange = (event: any) => {
    const file = event.target.files[0];
    handleValidateFile(file);
    const src = URL.createObjectURL(file);
    setFile(file);
    setImage(src);
  };

  return (
    <div className="flex h-[100vh] w-full justify-center items-center">
      <form
        className="flex flex-row justify-center items-center gap-4"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="flex flex-col gap-3">
          <TextField
            id="outlined-required"
            label="productName"
            defaultValue=""
            {...register("productName", {
              required: true,
              maxLength: 20,
              minLength: 5,
              pattern: patternAlphanumericWithSpace,
            })}
            helperText={
              (errors?.productName &&
                errors?.productName?.type === "pattern" &&
                NameErrorMessage) ||
              (errors?.productName?.type === "maxLength" &&
                MaxLengthErrorMessage) ||
              (errors?.productName?.type === "minLength" &&
                MinLengthErrorMessage) ||
              (errors?.productName?.type === "required" && RequireErrorMessage)
            }
          />
          <TextField
            id="outlined-required"
            label="price"
            defaultValue=""
            {...register("price", {
              required: true,
              pattern: patternAlphanumeric,
              validate: (value) => {
                return value > 0 || "Price must be greater than 0";
              },
            })}
            helperText={
              errors?.price &&
              errors?.price?.type === "validate" &&
              "Price must be number"
            }
          />

          {/* <TextField
            id="outlined-required"
            label="category"
            defaultValue=""
            placeholder="Category"
            {...register("category", {
              required: true,
              maxLength: 20,
              minLength: 5,
              pattern: patternAlphanumericWithSpace,
            })}
            helperText={
              (errors?.category &&
                errors?.category &&
                errors?.category?.type === "required" &&
                RequireErrorMessage) ||
              (errors?.category?.type === "pattern" && NameErrorMessage) ||
              (errors?.category?.type === "maxLength" &&
                MaxLengthErrorMessage) ||
              (errors?.category?.type === "minLength" && MinLengthErrorMessage)
            }
          /> */}

          <FormControl sx={{ m: 1, width: 300 }}>
            <InputLabel id="demo-multiple-checkbox-label">
              Categories
            </InputLabel>
            <Select
              labelId="demo-multiple-checkbox-label"
              id="demo-multiple-checkbox"
              multiple
              value={selectedCategory}
              input={<OutlinedInput label="Categories" />}
              renderValue={(selected) => selected.join(", ")}
              MenuProps={MenuProps}
              {...register("category", { required: true })}
              onChange={handleCategoryChange}
            >
              {cartegories.map((item) => (
                <MenuItem key={item} value={item}>
                  <Checkbox checked={selectedCategory.indexOf(item) > -1} />
                  <ListItemText primary={item} />
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <TextField
            id="outlined-required"
            label="description"
            defaultValue=""
            {...register("description", {
              required: true,
              maxLength: 1000,
              minLength: 0,
              pattern: patternAlphanumericWithSpace,
            })}
            helperText={
              (errors?.description &&
                errors?.description?.type === "required" &&
                RequireErrorMessage) ||
              (errors?.description?.type === "pattern" && NameErrorMessage) ||
              (errors?.description?.type === "maxLength" &&
                MaxLengthErrorMessage) ||
              (errors?.description?.type === "minLength" &&
                MinLengthErrorMessage)
            }
          />
          <Button
            component="label"
            variant="contained"
            startIcon={<CloudUploadIcon />}
          >
            Upload file
            <VisuallyHiddenInput
              accept="image/*"
              type="file"
              {...register("file")}
              onChange={(e: any) => handleFileChange(e)}
            />
          </Button>
          <Button type="submit">Submit</Button>
        </div>
        <div className="flex justify-center items-center border border-black bg-white rounded-lg h-auto w-[30vw]">
          <div className="Image p-5">
            {MyImage ? (
              <Image
                className="object-cover h-full w-full rounded-lg"
                src={MyImage}
                alt="EMESOFT-Logo-Full-Horizontal"
                priority={true}
                width={500}
                height={500}
              />
            ) : (
              <div className="w-[20vw] h-[50vh]">
                <Skeleton
                  variant="rectangular"
                  className="flex w-full h-full rounded-lg"
                />
              </div>
            )}
          </div>
        </div>
      </form>
    </div>
  );
};

export default InsertPage;
