import {
  Box,
  Typography,
  TextField,
  FormControl,
  InputLabel,
  OutlinedInput,
  InputAdornment,
  IconButton,
  Divider,
  Stack,
  Button,
  Link,
} from "@mui/material";
import { Login, Visibility, VisibilityOff } from "@mui/icons-material";

import FacebookIcon from "@mui/icons-material/Facebook";
import GoogleIcon from "@mui/icons-material/Google";
import React from "react";
import { useRouter } from "next/router";
const LoginForm = () => {
  const [showPassword, setShowPassword] = React.useState(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const [valueName, setValueName] = React.useState("");
  const [password, setPassword] = React.useState("");

  const handleOnchange = (event: React.ChangeEvent, type: string) => {
    if (type === "userName") {
      setValueName(event.target.value);
    } else {
      setPassword(event.target.value);
    }
  };
  const handleSubmit = (e) => {
    e.preventDefault();

    alert("true");

    console.log("check use name", valueName);
    console.log("check password", password);
  };
  return (
    <Box
      className="bg-[#FAFAFA]  flex flex-col text-center p-5 mx-auto rounded my-20"
      component="form"
      onSubmit={(e) => handleSubmit(e)}
    >
      <Typography variant="h3" className="mb-6">
        Login
      </Typography>

      <TextField
        id="outlined-basic"
        label="User Name"
        variant="outlined"
        required
        name="userName"
        type="text"
        className="my-3"
        onChange={(e) => handleOnchange(e, "userName")}
      />
      <FormControl variant="outlined" className="my-2" required>
        <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
        <OutlinedInput
          name="password"
          id="outlined-adornment-password"
          type={showPassword ? "text" : "password"}
          onChange={(e) => handleOnchange(e, "password")}
          endAdornment={
            <InputAdornment position="end">
              <IconButton
                aria-label="toggle password visibility"
                onClick={handleClickShowPassword}
                //   onMouseDown={handleMouseDownPassword}
                edge="end"
              >
                {showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          }
          label="Password"
        />
      </FormControl>

      <Button variant="contained" className="bg-[#1976D2]" type="submit">
        Submit
      </Button>
      <Divider>or</Divider>
      <Stack direction="row" spacing={2} className="my-3">
        <Button
          variant="outlined"
          startIcon={<FacebookIcon fontSize="small" />}
        >
          Facebook
        </Button>
        <Button variant="outlined" startIcon={<GoogleIcon fontSize="small" />}>
          Google
        </Button>
      </Stack>
      <Divider />
      <Stack direction="row" className="mt-3 mx-auto">
        <Typography>Create a new account ?</Typography>
        <Link href="#" underline="always">
          Register
        </Link>
      </Stack>
    </Box>
  );
};

export default LoginForm;
