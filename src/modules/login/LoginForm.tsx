import { Visibility, VisibilityOff } from "@mui/icons-material";
import {
  Box,
  Button,
  Divider,
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  Link,
  OutlinedInput,
  Stack,
  TextField,
  Typography,
} from "@mui/material";

import FacebookIcon from "@mui/icons-material/Facebook";
import GoogleIcon from "@mui/icons-material/Google";
import React from "react";

const LoginForm = () => {
  const [showPassword, setShowPassword] = React.useState(false);
  const [valueName, setValueName] = React.useState("");
  const [password, setPassword] = React.useState("");
  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleOnchange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    type: string
  ) => {
    if (type === "userName") {
      setValueName(event.target.value);
    } else {
      setPassword(event.target.value);
    }
  };
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
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
        onChange={(event) => setValueName(event.target.value)}
      />
      <FormControl variant="outlined" className="my-2" required>
        <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
        <OutlinedInput
          name="password"
          id="outlined-adornment-password"
          type={showPassword ? "text" : "password"}
          onChange={(event) => setPassword(event.target.value)}
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
          data-testid="password"
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
